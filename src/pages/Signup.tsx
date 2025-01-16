import { SignUp } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";

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
                    afterSignUpUrl="/chat"
                    appearance={{
                        layout: {
                            socialButtonsPlacement: "top",
                            socialButtonsVariant: "blockButton",
                            termsPageUrl:
                                "https://trooptalk.ai/terms-and-conditions.html",
                        },
                    }}
                />
            </div>
        </>
    );
};

export default Signup;
