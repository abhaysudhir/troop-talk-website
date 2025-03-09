import { Card } from "@/components/ui/card";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 rounded-full bg-[#2a2e3f] flex items-center justify-center">
          <img
            src="https://i.imgur.com/XDgqhzt.png"
            alt="Troop Talk"
            className="h-6 w-6"
          />
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#2a2e3f] text-white">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#ec8e13] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-[#ec8e13] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-[#ec8e13] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;