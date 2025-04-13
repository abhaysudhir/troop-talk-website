import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import PendingApproval from './pages/PendingApproval';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import TokenDebug from './components/TokenDebug';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    {/* Root route - Landing page */}
                    <Route path="/" element={<Landing />} />
                    
                    {/* Auth routes */}
                    <Route 
                        path="/sign-in/*" 
                        element={
                            <>
                                <SignedIn>
                                    <Navigate to="/chat" replace />
                                </SignedIn>
                                <SignedOut>
                                    <Login />
                                </SignedOut>
                            </>
                        } 
                    />
                    <Route path="/sign-up/*" element={<Navigate to="/sign-in" replace />} /> {/* element={<Signup />}} */}
                    <Route path="/pending-approval" element={<Navigate to="/" replace />} /> {/* element={<PendingApproval /> */}

                    {/* Protected routes */}
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

                    {/* Debug route - only for development */}
                    <Route
                        path="/debug/token"
                        element={
                            <>
                                <SignedIn>
                                    <div className="p-8">
                                        <TokenDebug />
                                    </div>
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />

                    {/* Catch all route - redirect to landing page */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}
