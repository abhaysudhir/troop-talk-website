import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock, User } from "lucide-react";

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
    // Add authentication logic here
    toast({
      title: "Welcome back!",
      description: "Successfully logged in.",
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-scout-background p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <img
            src="/scout-logo.png"
            alt="Boy Scouts Logo"
            className="mx-auto h-24 w-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-scout-primary mb-2">
            Welcome Back
          </h2>
          <p className="text-scout-muted">Sign in to continue</p>
        </div>

        <Card className="p-6 shadow-lg border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-scout-muted" />
                <Input
                  type="text"
                  placeholder="Username"
                  className="pl-10"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-scout-muted" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10"
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
                value={formData.troopNumber}
                onChange={(e) =>
                  setFormData({ ...formData, troopNumber: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full bg-scout-primary hover:bg-scout-accent">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-scout-muted">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-scout-primary hover:text-scout-accent transition-colors"
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