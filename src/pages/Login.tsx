import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock, User } from "lucide-react";
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignIn 
        path="/login"
        routing="path"
        redirectUrl="/chat" // Replace with the path to your app's dashboard or homepage
        signUpUrl="/signup" // Redirect to the Signup page
      />
    </div>
  );
};


export default Login;
/*
const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    troopNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome back!",
      description: "Successfully logged in.",
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <img
            src="https://i.imgur.com/XDgqhzt.png"
            alt="Boy Scouts Logo"
            className="mx-auto h-24 w-auto mb-6"
          />
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#ec8e13" }}>
            Welcome Back
          </h2>
          <p className="text-[#99784D]">Sign in to continue</p>
        </div>

        <Card className="p-6 shadow-lg border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-[#99784D]" />
                <Input
                  type="text"
                  placeholder="Username"
                  className="pl-10 border-[#99784D] focus-visible:ring-[#ec8e13]"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-[#99784D]" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 border-[#99784D] focus-visible:ring-[#ec8e13]"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <Input
                type="text"
                placeholder="Troop Number (e.g., 125)"
                className="border-[#99784D] focus-visible:ring-[#ec8e13]"
                value={formData.troopNumber}
                onChange={(e) =>
                  setFormData({ ...formData, troopNumber: e.target.value })
                }
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#ec8e13] hover:bg-[#99784D] transition-colors"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#99784D]">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#ec8e13] hover:text-[#99784D] transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
*/