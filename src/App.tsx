import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import PendingApproval from './pages/PendingApproval';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    {/* Root route - Landing page */}
                    <Route path="/" element={<Landing />} />

                    {/* Commented out original routes with conditional logic
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
                    <Route path="/sign-in/*" element={<Login />} />
                    <Route path="/sign-up/*" element={<Signup />} />
                    <Route path="/pending-approval" element={<PendingApproval />} />

                    <Route
                        path="/admin"
                        element={
                            <>
                                <SignedIn>
                                    <AdminDashboard />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

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
                    */}

                    {/* Catch all route - redirect everything to root */}
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}
