import { SignIn, useSignIn } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signIn } = useSignIn();

    // Watch for sign-in attempts
    useEffect(() => {
        if (signIn?.status === "complete") {
            setErrorMessage("");
        }
        if (signIn?.status === "needs_identifier") {
            setErrorMessage("No account associated with this email or provider.");
        }
    }, [signIn?.status]);

    return (
        <>
            <Helmet>
                <title>Login | Troop Talk</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center">
                <SignIn
                    afterSignInUrl="/chat"
                    appearance={{
                        layout: {
                            socialButtonsPlacement: "top",
                            socialButtonsVariant: "blockButton",
                            termsPageUrl:
                                "https://trooptalk.ai/terms-and-conditions.html",
                        },
                    }}
                />
                {errorMessage && (
                    <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                )}
            </div>
        </>
    );
};

export default Login;

