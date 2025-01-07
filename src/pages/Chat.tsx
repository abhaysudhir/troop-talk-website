import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import TypingIndicator from "@/components/TypingIndicator";
import { marked } from "marked"; // Import marked for Markdown conversion
import { UserButton } from '@clerk/clerk-react';
import { Helmet } from 'react-helmet-async';

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

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
        `https://tt-backend-scripts-bigvm.ondigitalocean.app/ask?question=${encodeURIComponent(input)}&top_k=5`,
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Helmet>
      <div className="flex flex-col h-[100dvh] bg-gray-50">
        <header className="bg-white border-b p-2 sm:p-4 shadow-sm flex-none">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img
                src="https://i.imgur.com/XDgqhzt.png"
                alt="Troop Talk Logo"
                className="h-8 sm:h-10 w-auto"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold" style={{ color: "#ec8e13" }}>Troop 125</h1>
                <p className="text-xs sm:text-sm" style={{ color: "#99784D" }}>Your Scouting Assistant</p>
              </div>
            </div>
            <UserButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`p-2 sm:p-4 max-w-[90%] sm:max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-[#ec8e13] text-white"
                      : "bg-white border-[#99784D] border"
                  }`}
                >
                  {message.sender === "ai" ? (
                    <div
                      className="text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: String(marked.parse(message.content)).replace(
                          /<table>/g,
                          `<table class="table-auto border-collapse w-full text-xs sm:text-sm text-left text-gray-700 border border-gray-300 my-2 sm:my-4">`
                        ).replace(
                          /<th>/g,
                          `<th class="border border-gray-300 p-1 sm:p-2 bg-[#ec8e13] text-white">`
                        ).replace(
                          /<td>/g,
                          `<td class="border border-gray-300 p-1 sm:p-2">`
                        )
                      }}
                    />
                  ) : (
                    <p className="text-xs sm:text-sm">{message.content}</p>
                  )}
                </Card>
              </div>
            ))}
            {isAiTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="bg-white border-t p-2 sm:p-4 flex-none">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="flex space-x-2 sm:space-x-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-[#99784D] text-sm sm:text-base"
              />
              <Button 
                type="submit" 
                className="bg-[#ec8e13] hover:bg-[#99784D] transition-colors px-2 sm:px-4"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Chat;
