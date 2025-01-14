import { useState } from 'react';
import { SignUp } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Helmet } from 'react-helmet-async';

// Hardcoded troops for now - this would come from your backend
const troops = [
  { id: "org_2rT8CEMs2yJdg1oW0QOX7oNAhrc", name: "Troop 125", location: "San Francisco, CA" },
];

const SignUpPage = () => {
  const [selectedTroop, setSelectedTroop] = useState("");

  return (
    <>
      <Helmet>
        <title>Sign Up | Troop Talk</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md p-6 bg-white">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#99784D] mb-1">
              Select Your Troop
            </label>
            <select
              className="w-full border rounded-md border-[#99784D] focus:ring-[#ec8e13] focus:border-[#ec8e13] p-2"
              value={selectedTroop}
              onChange={(e) => setSelectedTroop(e.target.value)}
            >
              <option value="">Select a troop to join</option>
              {troops.map(troop => (
                <option key={troop.id} value={troop.id}>
                  {troop.name} - {troop.location}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-[#99784D]">
              You'll need approval from the Troop's Scoutmaster to join
            </p>
          </div>
          
          {selectedTroop && (
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              afterSignUpUrl="/pending-approval"
              unsafeMetadata={{
                requestedTroopId: selectedTroop,
                requestStatus: "pending"
              }}
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-[#ec8e13] hover:bg-[#99784D] text-sm normal-case",
                  card: "bg-white shadow-none",
                  headerTitle: "text-[#ec8e13] font-bold",
                  headerSubtitle: "text-[#99784D]",
                  socialButtonsBlockButton: 
                    "border-[#99784D] text-[#99784D] hover:bg-[#ec8e13] hover:text-white hover:border-[#ec8e13]",
                  formFieldInput: 
                    "border-[#99784D] focus:ring-[#ec8e13] focus:border-[#ec8e13]",
                  footer: "hidden"
                }
              }}
            />
          )}
          
          {!selectedTroop && (
            <p className="text-sm text-[#99784D]">Please select a troop to continue with signup</p>
          )}
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;