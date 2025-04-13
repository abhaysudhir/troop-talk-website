import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CopyIcon, CheckIcon } from "lucide-react";

const TokenDebug = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchToken = async () => {
    try {
      // Get the token with default session claims
      const jwt = await getToken();
      setToken(jwt);
    } catch (error) {
      console.error("Error getting token:", error);
      setToken("Error fetching token");
    }
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="p-4 max-w-2xl mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-2">JWT Token Debug</h2>
      <p className="text-sm text-gray-500 mb-4">
        Use this to get your Clerk JWT token for testing with the backend API.
      </p>
      
      <div className="flex space-x-2 mb-4">
        <Button onClick={fetchToken}>
          Get JWT Token
        </Button>
        
        {token && (
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
            className="flex items-center"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        )}
      </div>
      
      {token && (
        <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-60">
          <pre className="text-xs break-all whitespace-pre-wrap">{token}</pre>
        </div>
      )}
    </Card>
  );
};

export default TokenDebug; 