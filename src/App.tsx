import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    {/* Root route */}
                    <Route
                        path="/"
                        element={
                            <>
                                <SignedIn>
                                    <Navigate to="/chat" replace />
                                </SignedIn>
                                <SignedOut>
                                    <Navigate to="/sign-in" replace />
                                </SignedOut>
                            </>
                        }
                    />

                    {/* Auth routes - Note the /* for nested routes */}
                    <Route path="/sign-in/*" element={<Login />} />
                    <Route path="/sign-up/*" element={<Signup />} />

                    {/* Protected route */}
                    <Route
                        path="/chat"
                        element={
                            <>
                                <SignedIn>
                                    <Chat />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}
