import { SignIn } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login | Troop Talk</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center">
                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/chat"
                    appearance={{
                        layout: {
                            socialButtonsPlacement: "top",
                            socialButtonsVariant: "iconButton",
                            termsPageUrl:
                                "https://trooptalk.ai/public/terms-and-conditions.html",
                        },
                    }}
                />
            </div>
        </>
    );
};

export default Login;
