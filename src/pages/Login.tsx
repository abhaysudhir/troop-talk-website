import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn 
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/chat"
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

export default Login;