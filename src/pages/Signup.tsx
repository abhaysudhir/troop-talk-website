import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock, User, MapPin } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    troopNumber: "",
    state: "",
    city: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to Scout Chat!",
      description: "Your account has been created successfully.",
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
            Create Account
          </h2>
          <p className="text-[#99784D]">Join your troop's chat</p>
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

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#99784D]" />
                <Input
                  type="text"
                  placeholder="State"
                  className="pl-10 border-[#99784D] focus-visible:ring-[#ec8e13]"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                />
              </div>

              <Input
                type="text"
                placeholder="City"
                className="border-[#99784D] focus-visible:ring-[#ec8e13]"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#ec8e13] hover:bg-[#99784D] transition-colors"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#99784D]">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#ec8e13] hover:text-[#99784D] transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;