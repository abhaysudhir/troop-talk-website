import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const Landing = () => {
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
            <div className="min-h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="bg-white border-b p-4 shadow-sm sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <img
                                src="https://i.imgur.com/XDgqhzt.png"
                                alt="Troop Talk Logo"
                                className="h-16 w-auto"
                            />
                            <span className="text-3xl font-bold text-[#ec8e13]">Troop Talk</span>
                        </div>
                        <div className="flex space-x-6 text-[#99784D]">
                            {["features", "information-sources", "benefits"].map((section) => (
                                <a
                                    key={section}
                                    href={`#${section}`}
                                    className="hover:text-[#ec8e13] transition-colors duration-300"
                                >
                                    {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-bold text-[#ec8e13] mb-6 animate-fade-in">
                                Troop Talk - Your AI Scouting Assistant
                            </h1>
                            <p className="text-xl text-[#99784D] mb-8 max-w-3xl mx-auto animate-fade-in-delay">
                                Gain Insights, Ask Questions, and Bridge the Information Gap in your Troop
                                <br />
                                Get notified when we launch by <b>joining the waitlist</b>
                            </p>
                            <a href="#waitlist">
                                <Button className="bg-[#ec8e13] text-white hover:bg-[#99784D] text-lg px-8 py-6 rounded-lg transform hover:scale-105 transition-all duration-300 animate-bounce-subtle">
                                    Join the Waitlist
                                </Button>
                            </a>
                        </div>
                        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                            <iframe
                                className="w-full aspect-video rounded-lg shadow-md"
                                src="https://www.youtube.com/embed/4uWh950IFT4?autoplay=1&mute=1"
                                title="Troop Talk Demo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 bg-gray-50 scroll-mt-20">
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
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-semibold text-[#99784D] mb-4">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="information-sources" className="py-16 bg-white scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-[#ec8e13] mb-12">Information Sources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
                                    <div className="w-12 h-12 bg-[#ec8e13] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#99784D] mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="py-16 bg-gray-50 scroll-mt-20">
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
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-semibold text-[#99784D] mb-4">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Waitlist Form Section */}
                <section id="waitlist" className="py-16 bg-white scroll-mt-20">
                    <div className="max-w-4xl mx-auto px-4">
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
                </section>

                {/* Footer */}
                <footer className="bg-gray-50 py-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between items-center">
                            <img
                                src="https://i.imgur.com/XDgqhzt.png"
                                alt="Troop Talk Logo"
                                className="h-8 w-auto hover:opacity-80 transition-opacity"
                            />
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