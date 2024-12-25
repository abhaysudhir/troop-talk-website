import { Card } from "@/components/ui/card";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <Card className="p-4 bg-white border-[#99784D] border">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#99784D] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-[#99784D] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-[#99784D] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </Card>
    </div>
  );
};

export default TypingIndicator;