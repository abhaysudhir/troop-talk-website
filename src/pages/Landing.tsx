import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, Mail, Plus, UserRound } from "lucide-react";
import "./Landing.css";

const examples = [
    {
        label: "Packing list",
        question: "What should I bring to the campout?",
        intro: "For this campout, the packing list is:",
        items: ["Sleeping bag & sleeping pad", "Rain jacket and a warm layer", "Water bottle", "Mess kit & utensils", "Headlamp or flashlight"],
        note: "Check the trip details for anything extra your patrol needs.",
    },
    {
        label: "Departure time",
        question: "When are we leaving on Saturday?",
        intro: "Meet at the troop's usual meeting place at 8:00 a.m. on Saturday.",
        items: ["Bring your signed permission form", "Have your gear packed and ready to load"],
        note: "The plan is to head out together after a quick gear check.",
    },
    {
        label: "Next meeting",
        question: "What are we doing at the next meeting?",
        intro: "This meeting is about getting ready for the campout.",
        items: ["Plan meals with your patrol", "Sort out who is bringing shared gear", "Review the packing list"],
        note: "Bring a notebook, a pencil, and your meal ideas.",
    },
];

function TentMark({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="48" height="45" viewBox="0 0 48 45" fill="none" aria-hidden="true">
            <path d="M4 38 22 7l18 31H4Z" fill="currentColor" />
            <path d="m22 7 4 31H12L22 7Z" fill="var(--tt-cream, #f5f0e5)" />
            <path d="m22 7 4 31h-6l2-31Z" fill="var(--tt-night, #252a22)" />
            <path d="m19 3 5 8m1-8-5 8M2 39h43" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="m40 15-5 10h3l-5 9h14l-5-9h3l-5-10Z" fill="var(--tt-moss, #a8ad87)" />
        </svg>
    );
}

export default function Landing() {
    const { isSignedIn } = useAuth();
    const destination = isSignedIn ? "/chat" : "/sign-in";
    const [exampleIndex, setExampleIndex] = useState(0);
    const example = examples[exampleIndex];

    return (
        <>
            <Helmet>
                <title>Troop Talk | For the questions before the adventure</title>
                <meta name="description" content="Ask about campouts, packing lists, and troop plans. Troop Talk searches imported troop emails and Scouting reference material to help you find an answer." />
                <meta name="theme-color" content="#252a22" />
            </Helmet>

            <div className="tt-site" id="top">
                <a href="#main" className="tt-skip">Skip to content</a>
                <header className="tt-header">
                    <div className="tt-container tt-nav">
                        <a href="#top" className="tt-brand" aria-label="Troop Talk home">
                            <TentMark className="tt-brand-mark" />
                            <span>Troop Talk<span className="tt-brand-period">.</span></span>
                        </a>
                        <nav className="tt-nav-links" aria-label="Main navigation">
                            <a href="#how-it-works">How it works</a>
                            <a href="#try-a-question">Try a question</a>
                        </nav>
                        <Link className="tt-signin" to={destination}>
                            {isSignedIn ? "Open chat" : "Sign in"}<ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </header>

                <main id="main">
                    <section className="tt-hero" aria-labelledby="tt-hero-title">
                        <picture className="tt-hero-photo">
                            <source media="(max-width: 640px)" srcSet="/images/campfire-900.webp" />
                            <img src="/images/campfire-1800.webp" width="1800" height="1200" alt="A campfire burning beneath tall pine trees at dusk." />
                        </picture>
                        <div className="tt-container tt-hero-inner">
                            <div className="tt-hero-copy">
                                <p className="tt-eyebrow"><span className="tt-short-rule" />For scouts, families & troop leaders</p>
                                <h1 id="tt-hero-title">For the questions<br />before the<br /><span>adventure.</span></h1>
                                <p className="tt-hero-description">The next campout. The packing list. That email you can't find. Ask Troop Talk about your troop's plans and Scouting requirements.</p>
                                <Link to={destination} className="tt-button tt-button-orange">Open Troop Talk<ArrowUpRight size={20} aria-hidden="true" /></Link>
                                <a href="#try-a-question" className="tt-hero-preview">Take a look first<ArrowDown size={15} aria-hidden="true" /></a>
                            </div>
                            <div className="tt-photo-caption"><span />A little less searching. A little more Scouting.</div>
                        </div>
                    </section>

                    <section className="tt-example-section" id="try-a-question" aria-labelledby="tt-example-title">
                        <div className="tt-container tt-example-grid">
                            <div className="tt-section-intro">
                                <p className="tt-eyebrow tt-eyebrow-dark">The everyday questions</p>
                                <h2 id="tt-example-title">What do we need<br /> for Saturday?</h2>
                                <p>It's a simple question. The answer might be three weeks deep in your inbox.</p>
                                <p>Troop Talk searches imported troop emails and Scouting references, then helps you make sense of what it finds.</p>
                                <div className="tt-example-picker" role="group" aria-label="Choose an example question">
                                    <p>Try an example</p>
                                    {examples.map((item, index) => (
                                        <button key={item.label} type="button" aria-pressed={exampleIndex === index} aria-controls="tt-example-answer" onClick={() => setExampleIndex(index)}>
                                            {item.label}<ArrowRight size={18} aria-hidden="true" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="tt-conversation">
                                <div className="tt-conversation-header"><span>Example conversation</span><span>Try a question</span></div>
                                <div className="tt-conversation-body" id="tt-example-answer" aria-live="polite" aria-atomic="true">
                                    <div className="tt-message tt-message-question">
                                        <span className="tt-avatar tt-avatar-user"><UserRound size={19} strokeWidth={1.8} aria-hidden="true" /><span className="tt-sr-only">You ask</span></span>
                                        <p>{example.question}</p>
                                    </div>
                                    <div className="tt-message tt-message-answer">
                                        <span className="tt-avatar tt-avatar-bot"><TentMark /><span className="tt-sr-only">Troop Talk answers</span></span>
                                        <div>
                                            <p>{example.intro}</p>
                                            <ul>{example.items.map(item => <li key={item}><Check size={16} strokeWidth={1.8} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                                            <p className="tt-answer-note">{example.note}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tt-conversation-footer"><span>Illustrative example, not live troop information.</span><Link to={destination} aria-label="Open Troop Talk to ask your own question"><ArrowUpRight size={18} aria-hidden="true" /></Link></div>
                            </div>
                        </div>
                    </section>

                    <section className="tt-sources" id="how-it-works" aria-labelledby="tt-sources-title">
                        <div className="tt-container">
                            <div className="tt-sources-heading"><p className="tt-eyebrow">How it works</p><h2 id="tt-sources-title">Your troop has the information.<br /> Here's a way to find it.</h2></div>
                            <div className="tt-source-rows">
                                <article className="tt-source-row">
                                    <div className="tt-source-name"><Mail size={30} strokeWidth={1.35} aria-hidden="true" /><h3>Troop emails</h3></div>
                                    <p>Campout plans, meeting reminders, permission slips. Troop Talk looks through the emails added to its knowledge base for the details you're after.</p>
                                    <span className="tt-source-number" aria-hidden="true">01</span>
                                </article>
                                <article className="tt-source-row">
                                    <div className="tt-source-name"><BookOpen size={30} strokeWidth={1.35} aria-hidden="true" /><h3>Scouting references</h3></div>
                                    <p>For questions beyond the next meeting, it also searches Scouting reference material on ranks, merit badges, and troop life.</p>
                                    <span className="tt-source-number" aria-hidden="true">02</span>
                                </article>
                            </div>
                            <p className="tt-source-footnote">Answers depend on the material that's been imported. For the latest changes, check with your troop leader.</p>
                        </div>
                    </section>

                    <section className="tt-faq-section" aria-labelledby="tt-faq-title">
                        <div className="tt-container tt-faq-grid">
                            <div><p className="tt-eyebrow tt-eyebrow-dark">Before you head out</p><h2 id="tt-faq-title">A couple of<br /> good questions.</h2></div>
                            <div className="tt-faq-list">
                                <details><summary>Who is Troop Talk for?<Plus size={19} aria-hidden="true" /></summary><p>Scouts, parents, and troop leaders who need help finding information in troop emails or understanding Scouting requirements.</p></details>
                                <details><summary>Can I use it with my troop?<Plus size={19} aria-hidden="true" /></summary><p>Troop Talk started with Troop 125. If you'd like to bring it to your troop, <a href="mailto:abhay.sudhir08@gmail.com?subject=Troop%20Talk%20for%20my%20troop">get in touch with Abhay</a> to talk through setup.</p></details>
                                <details><summary>Does it have the latest troop updates?<Plus size={19} aria-hidden="true" /></summary><p>It can only search the material that's been added to its knowledge base. It doesn't automatically follow your inbox, so confirm recent changes with your troop's communications or a leader.</p></details>
                            </div>
                        </div>
                    </section>

                    <section className="tt-closing" aria-labelledby="tt-closing-title">
                        <div className="tt-container tt-closing-inner"><div><p className="tt-eyebrow">Got a question?</p><h2 id="tt-closing-title">Start with Troop Talk.</h2></div><Link to={destination} className="tt-button tt-button-orange">{isSignedIn ? "Back to your chat" : "Open Troop Talk"}<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
                    </section>
                </main>

                <footer className="tt-footer">
                    <div className="tt-container">
                        <div className="tt-footer-top"><a href="#top" className="tt-brand"><TentMark className="tt-brand-mark" /><span>Troop Talk<span className="tt-brand-period">.</span></span></a><p>For the questions before the adventure.</p><a href="mailto:abhay.sudhir08@gmail.com" className="tt-contact">Say hello to Abhay<ArrowUpRight size={16} aria-hidden="true" /></a></div>
                        <div className="tt-footer-bottom"><span>© {new Date().getFullYear()} Troop Talk</span><a href="/terms-and-conditions.html">Terms & conditions</a><a className="tt-photo-credit" href="https://unsplash.com/photos/bonfire-in-the-middle-of-forest-during-night-time-kSj_xTPMrx4" target="_blank" rel="noreferrer">Photo by Patrick Hendry / Unsplash<ArrowUpRight size={12} aria-hidden="true" /></a></div>
                    </div>
                </footer>
            </div>
        </>
    );
}
