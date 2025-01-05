import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp 
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/chat"
        appearance={{
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
            termsPageUrl: "https://clerk.com/terms"
          }
        }}
      />
    </div>
  );
};

export default Signup;