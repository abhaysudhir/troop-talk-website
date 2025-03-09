import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // @ts-ignore
            window.jotformEmbedHandler("iframe[id='JotFormIFrame-250161040091137']", "https://form.jotform.com/");
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Troop Talk - AI-Powered Scouting Assistant</title>
                <style>
                    {`
                        html {
                            scroll-behavior: smooth;
                        }
                    `}
                </style>
            </Helmet>
            <div className="min-h-screen bg-[#f8f9fa]">
                {/* Navbar */}
                <nav className="bg-white border-b p-4 shadow-sm sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <img
                                src="https://i.imgur.com/XDgqhzt.png"
                                alt="Troop Talk Logo"
                                className="h-16 w-auto"
                            />
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-[#99784D] space-x-6 hidden md:flex">
                                {["features", "information-sources", "benefits", "waitlist"].map((section) => (
                                    <a
                                        key={section}
                                        href={`#${section}`}
                                        className="hover:text-[#ec8e13] transition-colors duration-300"
                                    >
                                        {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </a>
                                ))}
                            </div>
                            <Button
                                onClick={() => navigate('/sign-in')}
                                className="bg-[#ec8e13] text-white hover:bg-[#99784D] transition-colors ml-6"
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section - Redesigned */}
                <section className="py-16 bg-[#f8f9fa]">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="md:w-1/2 space-y-6">
                                <div className="flex items-center">
                                    <div className="bg-[#ec8e13]/10 px-4 py-1 rounded-full">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-[#ec8e13] rounded-full mr-2"></div>
                                            <span className="text-sm font-medium text-[#ec8e13]">REVIEWED ON</span>
                                        </div>
                                    </div>
                                    <div className="ml-3 flex items-center">
                                        <span className="font-bold text-gray-700 mr-2">Scout Leaders</span>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg key={star} className="w-4 h-4 text-[#ec8e13]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">500+ REVIEWS</span>
                                    </div>
                                </div>
                                
                                <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                                    Unleash <span className="relative inline-block">
                                        <span className="relative z-10 text-[#ec8e13]">Standout</span>
                                        <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#ec8e13]/20 -rotate-1"></div>
                                    </span> 
                                    <br />Scouting <span className="relative inline-block">
                                        <span className="relative z-10 text-[#ec8e13]">Solutions</span>
                                        <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#ec8e13]/20 rotate-1"></div>
                                    </span>
                                </h1>
                                
                                <p className="text-xl text-[#99784D]">
                                    We're Troop Talk, an AI-powered assistant specializing in scouting information to help troops stand out and thrive in their scouting journey.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <a href="#waitlist">
                                        <Button className="bg-[#ec8e13] text-white hover:bg-[#99784D] text-lg px-8 py-6 rounded-lg transition-all duration-300">
                                            Join the Waitlist
                                        </Button>
                                    </a>
                                    <a href="#features">
                                        <Button variant="outline" className="border-[#99784D] text-[#99784D] hover:bg-[#99784D] hover:text-white text-lg px-8 py-6 rounded-lg transition-all duration-300">
                                            Check our features
                                        </Button>
                                    </a>
                                </div>
                            </div>
                            
                            <div className="md:w-1/2 relative">
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#ec8e13]/10 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#99784D]/10 rounded-full blur-xl"></div>
                                
                                <div className="relative bg-white p-4 rounded-xl shadow-lg">
                                    <div className="absolute -top-3 -right-3 bg-[#ec8e13] text-white text-xs px-2 py-1 rounded-full">
                                        v1.0
                                    </div>
                                    <iframe
                                        className="w-full aspect-video rounded-lg shadow-md"
                                        src="https://www.youtube.com/embed/4uWh950IFT4?autoplay=1&mute=1"
                                        title="Troop Talk Demo"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                
                                <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2">
                                    <div className="bg-white p-3 rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-xs font-medium">Scouting Growth</span>
                                        </div>
                                        <div className="mt-1 w-32 h-16">
                                            <div className="h-full flex items-end space-x-1">
                                                {[20, 35, 25, 45, 30, 60, 70].map((height, i) => (
                                                    <div 
                                                        key={i} 
                                                        className="w-3 bg-gradient-to-t from-[#ec8e13] to-[#ec8e13]/70 rounded-t"
                                                        style={{ height: `${height}%` }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 bg-white scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-[#ec8e13] mb-12">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Customized per Troop",
                                    description: "Each member of a troop has access to a chatbot that is custom based on your Troop's needs"
                                },
                                {
                                    title: "Fast Responses",
                                    description: "State of the art AI Models to provide fast responses"
                                },
                                {
                                    title: "Structured Output",
                                    description: "Get information in the form of tables and other structured outputs"
                                }
                            ].map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="bg-[#f8f9fa] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-[#ec8e13]/10 rounded-full flex items-center justify-center text-[#ec8e13] mb-4">
                                        {index === 0 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        ) : index === 1 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#99784D] mb-4">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Information Sources Section */}
                <section id="information-sources" className="py-16 bg-[#f8f9fa] scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-[#ec8e13] mb-12">Information Sources</h2>
                        
                        <div className="relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ec8e13]/20 transform -translate-x-1/2 hidden md:block"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                                {[
                                    {
                                        step: 1,
                                        title: "Emails",
                                        description: "Connects directly to your Troop Emails and Communication"
                                    },
                                    {
                                        step: 2,
                                        title: "BSA Website",
                                        description: "Uses information from the Official BSA Website to suit your needs"
                                    },
                                    {
                                        step: 3,
                                        title: "Custom Troop Info",
                                        description: "Easily add Custom Troop Information to supercharge your Troop Talk experience"
                                    }
                                ].map((item) => (
                                    <div key={item.step} className="transform hover:-translate-y-2 transition-transform duration-300">
                                        <div className="bg-white p-6 rounded-lg shadow-md relative">
                                            <div className="w-12 h-12 bg-[#ec8e13] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 relative z-10">
                                                {item.step}
                                            </div>
                                            <h3 className="text-xl font-semibold text-[#99784D] mb-2 text-center">{item.title}</h3>
                                            <p className="text-gray-600 text-center">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                                    <h3 className="text-2xl font-bold text-[#ec8e13] mb-4">We help scout troops all around the world to grow.</h3>
                                    <p className="text-[#99784D] mb-6">Our AI-powered platform connects scouts with the information they need, when they need it, making troop management easier and more effective.</p>
                                    <div className="flex items-center">
                                        <img src="https://i.imgur.com/XDgqhzt.png" alt="Troop Talk Logo" className="h-10 w-auto mr-4" />
                                        <div>
                                            <p className="font-semibold text-gray-800">Troop Talk</p>
                                            <p className="text-sm text-gray-500">AI-Powered Scouting Assistant</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                                    <div className="bg-[#f8f9fa] p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-500 mb-1">Strategy</h4>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500">Invest</p>
                                                <p className="font-semibold text-gray-800">Troop Knowledge</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Return</p>
                                                <p className="font-semibold text-gray-800">Scout Success</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#f8f9fa] p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-500 mb-1">Delivery</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-[#ec8e13] rounded-full mr-2"></div>
                                                <span className="text-sm">Fast Responses</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-[#99784D] rounded-full mr-2"></div>
                                                <span className="text-sm">Accurate Info</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#f8f9fa] p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-500 mb-1">Research</h4>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ec8e13] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">BSA Guidelines</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#f8f9fa] p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-500 mb-1">Development</h4>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ec8e13] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="text-sm">Continuous Updates</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="py-16 bg-white scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-[#ec8e13] mb-12">Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Enhanced Communication",
                                    description: "Keep scouts and adults in the loop with easy information access."
                                },
                                {
                                    title: "Accurate Information",
                                    description: "Never worry about missing last minute information about events or activities."
                                }
                            ].map((benefit) => (
                                <div
                                    key={benefit.title}
                                    className="bg-[#f8f9fa] p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-[#ec8e13]/10 rounded-full flex items-center justify-center text-[#ec8e13] mb-4">
                                        {benefit.title === "Enhanced Communication" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#99784D] mb-4">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Waitlist Form Section */}
                <section id="waitlist" className="py-16 bg-[#f8f9fa] scroll-mt-20">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-3xl font-bold text-center text-[#ec8e13] mb-8">Join the Waitlist</h2>
                            <p className="text-center text-[#99784D] mb-8">Be among the first to experience Troop Talk when we launch.</p>
                            <div className="max-w-2xl mx-auto transform hover:shadow-2xl transition-shadow duration-300">
                                <iframe
                                    id="JotFormIFrame-250161040091137"
                                    title="Waitlist Form"
                                    onLoad={() => window.scrollTo(0,0)}
                                    allow="geolocation; microphone; camera; fullscreen"
                                    src="https://form.jotform.com/250161040091137"
                                    frameBorder="0"
                                    style={{ minWidth: '100%', maxWidth: '100%', height: '539px', border: 'none' }}
                                    scrolling="no"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-12 bg-[#ec8e13]">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0">
                                <h2 className="text-2xl font-bold text-white">Ready to transform your scouting experience?</h2>
                                <p className="text-white/80 mt-2">Join the waitlist today and be the first to know when we launch.</p>
                            </div>
                            <a href="#waitlist">
                                <Button className="bg-white text-[#ec8e13] hover:bg-[#99784D] hover:text-white transition-colors">
                                    Join the Waitlist
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white py-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                                <img
                                    src="https://i.imgur.com/XDgqhzt.png"
                                    alt="Troop Talk Logo"
                                    className="h-10 w-auto hover:opacity-80 transition-opacity mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">Troop Talk</p>
                                    <p className="text-sm text-gray-500">AI-Powered Scouting Assistant</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                © 2024 Troop Talk. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Landing; 