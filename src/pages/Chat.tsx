import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import TypingIndicator from "@/components/TypingIndicator";
import { marked } from "marked"; // Import marked for Markdown conversion
import { UserButton, useUser } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";

interface Message {
    id: number;
    content: string;
    sender: "user" | "ai";
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isAiTyping, setIsAiTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();

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

        try {
            const response = await fetch(
                `https://tt-backend-scripts-bigvm.ondigitalocean.app/ask?question=${encodeURIComponent(
                    input
                )}&top_k=55`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch AI response");
            }

            const responseData = await response.json();
            const aiResponse: Message = {
                id: Date.now() + 1,
                content: responseData.answer || "No answer provided.",
                sender: "ai",
            };

            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error("Error fetching AI response:", error);

            const errorResponse: Message = {
                id: Date.now() + 2,
                content: "Error: Unable to fetch response from the server.",
                sender: "ai",
            };

            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsAiTyping(false);
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
            </Helmet>
            <div className="flex flex-col h-[100dvh] bg-gray-50 text-gray-800">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4 flex-none shadow-sm">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://i.imgur.com/XDgqhzt.png"
                                alt="Troop Talk Logo"
                                className="h-10 w-auto"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-[#ec8e13]">
                                    Troop Talk
                                </h1>
                                <p className="text-sm text-[#99784D]">
                                    AI Scouting Assistant
                                </p>
                            </div>
                        </div>
                        <UserButton />
                    </div>
                </header>

                {/* Main Chat Area */}
                <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
                    {/* Welcome Container - Only shown when no messages */}
                    {messages.length <= 1 && (
                        <div className="flex flex-col items-center justify-center max-w-md mx-auto my-12 text-center">
                            <div className="bg-[#ec8e13]/10 rounded-full p-6 mb-6">
                                <img
                                    src="https://i.imgur.com/XDgqhzt.png"
                                    alt="Troop Talk Logo"
                                    className="h-16 w-auto"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Hi, {user?.firstName || 'Scout'}</h2>
                            <p className="text-xl mb-8">Can I help you with anything?</p>
                            <p className="text-gray-500 text-sm max-w-xs">
                                Ready to assist you with anything you need. From answering questions about scouting to providing recommendations. Let's get started!
                            </p>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="w-full max-w-3xl space-y-6 pb-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                {message.sender === "ai" && (
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="w-8 h-8 rounded-full bg-[#ec8e13]/10 flex items-center justify-center">
                                            <img
                                                src="https://i.imgur.com/XDgqhzt.png"
                                                alt="Troop Talk"
                                                className="h-6 w-6"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`p-4 rounded-2xl max-w-[80%] ${
                                        message.sender === "user"
                                            ? "bg-[#ec8e13] text-white"
                                            : "bg-white border border-gray-200 shadow-sm"
                                    }`}
                                >
                                    {message.sender === "ai" ? (
                                        <div
                                            className="text-sm"
                                            dangerouslySetInnerHTML={{
                                                __html: String(
                                                    marked.parse(
                                                        message.content
                                                    )
                                                )
                                                    .replace(
                                                        /<table>/g,
                                                        `<table class="table-auto border-collapse w-full text-xs sm:text-sm text-left text-gray-700 border border-gray-300 my-2 sm:my-4">`
                                                    )
                                                    .replace(
                                                        /<th>/g,
                                                        `<th class="border border-gray-300 p-1 sm:p-2 bg-[#ec8e13] text-white">`
                                                    )
                                                    .replace(
                                                        /<td>/g,
                                                        `<td class="border border-gray-300 p-1 sm:p-2">`
                                                    ),
                                            }}
                                        />
                                    ) : (
                                        <p className="text-sm">
                                            {message.content}
                                        </p>
                                    )}
                                </div>
                                {message.sender === "user" && (
                                    <div className="flex-shrink-0 ml-3">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
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
                <footer className="bg-white border-t border-gray-200 p-4 flex-none">
                    <div className="max-w-3xl mx-auto">
                        <form
                            onSubmit={handleSend}
                            className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 pl-4"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 border-none bg-transparent text-gray-800 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="bg-[#ec8e13] hover:bg-[#99784D] rounded-full h-9 w-9 flex items-center justify-center"
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
