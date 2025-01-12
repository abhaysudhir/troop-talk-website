import { SignUp } from '@clerk/clerk-react';
import { Helmet } from 'react-helmet-async';

const Signup = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | Troop Talk</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center">
        <SignUp 
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/pending-approval"
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
              termsPageUrl: "https://clerk.com/terms"
            }
          }}
        />
      </div>
    </>
  );
};

export default Signup;