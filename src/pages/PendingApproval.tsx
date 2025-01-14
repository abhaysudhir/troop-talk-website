import { Card } from "@/components/ui/card";
import { Helmet } from 'react-helmet-async';
import { UserButton, useUser } from "@clerk/clerk-react";

const PendingApprovalPage = () => {
  const { user } = useUser();

  return (
    <>
      <Helmet>
        <title>Pending Approval | Troop Talk</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <img
              src="https://i.imgur.com/XDgqhzt.png"
              alt="Troop Talk Logo"
              className="h-10 w-auto"
            />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </header>
        
        <main className="max-w-2xl mx-auto p-4 mt-8">
          <Card className="p-6 text-center">
            <div className="mb-6">
              <svg 
                className="mx-auto h-16 w-16 text-[#ec8e13]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-[#ec8e13] mb-4">
              Pending Approval
            </h1>
            
            <p className="text-[#99784D] mb-4">
              Your account is currently pending approval from your Troop's Scoutmaster.
              You'll receive an email notification once your account has been approved.
            </p>
            
            <div className="bg-[#fff9f0] border border-[#ec8e13] rounded-lg p-4 text-left">
              <h2 className="font-semibold text-[#ec8e13] mb-2">What happens next?</h2>
              <ul className="text-[#99784D] text-sm space-y-2">
                <li>• Your Scoutmaster will review your registration</li>
                <li>• Once approved, you'll receive an email confirmation</li>
                <li>• You can then sign in and access all Troop Talk features</li>
              </ul>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
};

export default PendingApprovalPage; 