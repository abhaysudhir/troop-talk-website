import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import TypingIndicator from "@/components/TypingIndicator";
import { marked } from "marked"; // Import marked for Markdown conversion
import { UserButton, useUser } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

// Configure marked for better markdown rendering
marked.setOptions({
    breaks: true,  // Add line breaks on single line breaks
    gfm: true      // Enable GitHub Flavored Markdown
});

interface Message {
    id: number;
    content: string;
    sender: "user" | "ai";
}

interface CacheInfo {
    cacheId: string;
    createdAt: number;
    expiresAt: number;
    messages: Message[];
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [contextCache, setContextCache] = useState<CacheInfo | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isAiTyping]);

    // Add welcome message when component mounts
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: Date.now(),
                    content: "Hi, I'm Troop Talk. How can I help you with scouting today?",
                    sender: "ai"
                }
            ]);
        }
    }, [messages.length]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            content: input,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsAiTyping(true);

        // Create a placeholder message for the streaming response
        const aiMessageId = Date.now() + 1;
        const aiMessage: Message = {
            id: aiMessageId,
            content: "",
            sender: "ai",
        };
        
        // Only add the AI message once we start getting content
        // This prevents empty bubbles from showing up
        let hasAddedAiMessage = false;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_DO_BACKEND_URL}/ask?question=${encodeURIComponent(
                    input
                )}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch AI response");
            }

            // Process the streaming response
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("Response body is not readable");
            }

            // Keep typing indicator until we receive content
            // setIsAiTyping(false);

            let streamedContent = "";
            const decoder = new TextDecoder();
            
            // Use this to batch updates for better performance
            let lastUpdateTime = Date.now();
            const UPDATE_INTERVAL = 50; // Update at most every 50ms
            
            // Add timeout handling
            let lastReceivedTime = Date.now();
            const MAX_WAIT_TIME = 5000; // 5 seconds max wait time between chunks
            let isStreamingPaused = false;
            
            // Start a timer to check for stalled streaming
            const timeoutChecker = setInterval(() => {
                const now = Date.now();
                // If no data received for MAX_WAIT_TIME, show typing indicator
                if (now - lastReceivedTime > MAX_WAIT_TIME && !isStreamingPaused) {
                    isStreamingPaused = true;
                    setIsAiTyping(true);
                }
            }, 1000); // Check every second
            
            const streamReader = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    
                    if (done) {
                        // Final update to ensure we have the complete message
                        if (streamedContent.trim()) {
                            setMessages((prev) => 
                                prev.map((msg) => 
                                    msg.id === aiMessageId 
                                        ? { ...msg, content: streamedContent } 
                                        : msg
                                )
                            );
                        }
                        break;
                    }
                    
                    // Reset last received time since we got data
                    lastReceivedTime = Date.now();
                    
                    // Decode the chunk and append to streamed content
                    const chunk = decoder.decode(value, { stream: true });
                    
                    if (chunk.trim()) {
                        // If this is the first meaningful content, add the AI message and hide typing indicator
                        if (!hasAddedAiMessage) {
                            hasAddedAiMessage = true;
                            setMessages((prev) => [...prev, aiMessage]);
                            setIsAiTyping(false);
                        }
                        
                        // If we were showing the typing indicator, hide it now that we're receiving data again
                        if (isStreamingPaused) {
                            isStreamingPaused = false;
                            setIsAiTyping(false);
                        }
                        
                        streamedContent += chunk;
                        
                        // Only update the UI periodically to avoid too many re-renders
                        const now = Date.now();
                        if (now - lastUpdateTime > UPDATE_INTERVAL) {
                            setMessages((prev) => 
                                prev.map((msg) => 
                                    msg.id === aiMessageId 
                                        ? { ...msg, content: streamedContent } 
                                        : msg
                                )
                            );
                            lastUpdateTime = now;
                        }
                    }
                }
            };
            
            try {
                await streamReader();
            } finally {
                clearInterval(timeoutChecker);
                // Ensure typing indicator is turned off when streaming ends
                setIsAiTyping(false);
                
                // If we never got any content, at least show an error message
                if (!hasAddedAiMessage) {
                    const errorMessage: Message = {
                        id: aiMessageId,
                        content: "Sorry, I couldn't generate a response. Please try again.",
                        sender: "ai",
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                }
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);

            // Add an error message if we haven't added the AI message yet
            const errorMessage: Message = {
                id: aiMessageId,
                content: "Error: Unable to fetch response from the server.",
                sender: "ai",
            };
            setMessages((prev) => 
                hasAddedAiMessage 
                    ? prev.map((msg) => 
                        msg.id === aiMessageId 
                            ? { ...msg, content: errorMessage.content } 
                            : msg
                      )
                    : [...prev, errorMessage]
            );
        }
    };

    // Handle key press events in the textarea
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Ctrl+Enter or Cmd+Enter (Mac)
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSend(e as unknown as React.FormEvent);
        }
    };

    return (
        <>
            <Helmet>
                <title>Chat | Troop Talk</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
                <style>{`
                    .markdown-content pre code {
                        white-space: pre;
                        overflow-x: auto;
                        display: block;
                        padding: 0.5rem;
                        line-height: 1.5;
                    }
                    
                    .markdown-content ul {
                        list-style-type: disc;
                        padding-left: 1.5rem;
                    }
                    
                    .markdown-content ol {
                        list-style-type: decimal;
                        padding-left: 1.5rem;
                    }
                    
                    .markdown-content p {
                        margin-bottom: 0.75rem;
                    }
                    
                    .markdown-content h1, 
                    .markdown-content h2, 
                    .markdown-content h3 {
                        font-weight: bold;
                        margin-top: 1rem;
                        margin-bottom: 0.5rem;
                    }
                    
                    .markdown-content h1 {
                        font-size: 1.25rem;
                    }
                    
                    .markdown-content h2 {
                        font-size: 1.125rem;
                    }
                    
                    .markdown-content h3 {
                        font-size: 1rem;
                    }
                    
                    .markdown-content blockquote {
                        border-left: 3px solid #ec8e13;
                        padding-left: 0.75rem;
                        margin: 0.75rem 0;
                        font-style: italic;
                    }
                    
                    .markdown-content table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 0.75rem 0;
                    }
                `}</style>
            </Helmet>
            <div className="flex flex-col h-[100dvh] bg-gray-50 text-gray-800">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-3 sm:p-4 flex-none shadow-sm">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <div 
                            className="flex items-center space-x-2 sm:space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => navigate('/')}
                        >
                            <img
                                src="https://i.imgur.com/XDgqhzt.png"
                                alt="Troop Talk Logo"
                                className="h-8 sm:h-10 w-auto"
                            />
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-[#ec8e13]">
                                    Troop Talk
                                </h1>
                                <p className="text-xs sm:text-sm text-[#99784D]">
                                    AI Scouting Assistant
                                </p>
                            </div>
                        </div>
                        <UserButton />
                    </div>
                </header>

                {/* Main Chat Area */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col items-center">
                    {/* Welcome Container - Only shown when no messages */}
                    {messages.length <= 1 && (
                        <div className="flex flex-col items-center justify-center max-w-md mx-auto my-6 sm:my-12 text-center px-4">
                            <div className="bg-[#ec8e13]/10 rounded-full p-4 sm:p-6 mb-4 sm:mb-6">
                                <img
                                    src="https://i.imgur.com/XDgqhzt.png"
                                    alt="Troop Talk Logo"
                                    className="h-12 sm:h-16 w-auto"
                                />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">Hi, {user?.firstName || 'Scout'}</h2>
                            <p className="text-lg sm:text-xl mb-4 sm:mb-8">Can I help you with anything?</p>
                            <p className="text-gray-500 text-xs sm:text-sm max-w-xs">
                                Ready to assist you with anything you need. From answering questions about scouting to providing recommendations. Let's get started!
                            </p>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="w-full max-w-3xl space-y-4 sm:space-y-6 pb-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-end ${
                                    message.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                {message.sender === "ai" && (
                                    <div className="flex-shrink-0 mr-2 sm:mr-3 mb-1">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#ec8e13]/10 flex items-center justify-center">
                                            <img
                                                src="https://i.imgur.com/XDgqhzt.png"
                                                alt="Troop Talk"
                                                className="h-4 w-4 sm:h-6 sm:w-6"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`p-3 sm:p-4 rounded-2xl max-w-[85%] sm:max-w-[80%] ${
                                        message.sender === "user"
                                            ? "bg-[#ec8e13] text-white rounded-tr-none"
                                            : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
                                    }`}
                                >
                                    {message.sender === "ai" ? (
                                        <div
                                            className="text-xs sm:text-sm markdown-content"
                                            dangerouslySetInnerHTML={{
                                                __html: String(
                                                    marked.parse(
                                                        message.content
                                                    )
                                                )
                                                    .replace(
                                                        /<table>/g,
                                                        `<table class="table-auto border-collapse w-full text-xs text-left text-gray-700 border border-gray-300 my-2">`
                                                    )
                                                    .replace(
                                                        /<th>/g,
                                                        `<th class="border border-gray-300 p-1 sm:p-2 bg-[#ec8e13] text-white text-xs">`
                                                    )
                                                    .replace(
                                                        /<td>/g,
                                                        `<td class="border border-gray-300 p-1 sm:p-2 text-xs">`
                                                    )
                                                    .replace(
                                                        /<a /g,
                                                        `<a class="text-[#ec8e13] underline hover:text-[#99784D] transition-colors" `
                                                    )
                                                    .replace(
                                                        /<code>/g,
                                                        `<code class="bg-gray-100 px-1 rounded text-gray-800 font-mono text-xs">`
                                                    )
                                                    .replace(
                                                        /<pre>/g,
                                                        `<pre class="bg-gray-100 p-2 rounded my-2 overflow-auto text-gray-800 font-mono text-xs">`
                                                    )
                                                    .replace(
                                                        /<ul>/g,
                                                        `<ul class="list-disc pl-5 my-2">`
                                                    )
                                                    .replace(
                                                        /<ol>/g,
                                                        `<ol class="list-decimal pl-5 my-2">`
                                                    )
                                                    .replace(
                                                        /<li>/g,
                                                        `<li class="mb-1">`
                                                    )
                                                    .replace(
                                                        /<blockquote>/g,
                                                        `<blockquote class="border-l-2 border-[#ec8e13] pl-3 my-2 italic">`
                                                    )
                                                    .replace(
                                                        /<h1>/g,
                                                        `<h1 class="text-lg font-bold my-2">`
                                                    )
                                                    .replace(
                                                        /<h2>/g,
                                                        `<h2 class="text-base font-bold my-2">`
                                                    )
                                                    .replace(
                                                        /<h3>/g,
                                                        `<h3 class="text-sm font-bold my-2">`
                                                    )
                                                    .replace(
                                                        /<p>/g,
                                                        `<p class="mb-2">`
                                                    )
                                                    .replace(
                                                        /<\/p>/g,
                                                        `</p>`
                                                    )
                                            }}
                                        />
                                    ) : (
                                        <p className="text-xs sm:text-sm">
                                            {message.content}
                                        </p>
                                    )}
                                </div>
                                {message.sender === "user" && (
                                    <div className="flex-shrink-0 ml-2 sm:ml-3 mb-1">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                                            {user?.imageUrl ? (
                                                <img 
                                                    src={user.imageUrl} 
                                                    alt={user.fullName || "User"} 
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#ec8e13] flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">
                                                        {user?.firstName?.charAt(0) || user?.lastName?.charAt(0) || "U"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isAiTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {/* Footer Input Area */}
                <footer className="bg-white border-t border-gray-200 p-3 sm:p-4 flex-none">
                    <div className="max-w-3xl mx-auto">
                        <form
                            onSubmit={handleSend}
                            className="flex items-center space-x-2 bg-gray-100 rounded-full p-1 sm:p-2 pl-3 sm:pl-4"
                        >
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                className="flex-1 border-none bg-transparent text-gray-800 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base resize-none min-h-[40px] max-h-[120px] py-2"
                                style={{ 
                                    overflow: 'auto',
                                    lineHeight: '1.2rem'
                                }}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="bg-[#ec8e13] hover:bg-[#99784D] rounded-full h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center flex-shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        <div className="text-center mt-2 text-xs text-gray-500">
                            Troop Talk may contain errors. We recommend checking important information.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Chat;
