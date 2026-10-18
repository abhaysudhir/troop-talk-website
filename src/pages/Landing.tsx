import "./Landing.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowDown, ArrowUpRight, BookOpen, Mail, Plus } from "lucide-react";
import TentMark from "../components/TentMark";
import RoleExamples from "../components/RoleExamples";
import TroopInterest from "../components/TroopInterest";

export default function Landing() {
    const { isSignedIn } = useAuth();
    const destination = isSignedIn ? "/chat" : "/sign-in";

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
                            <a href="#bring-your-troop">For your troop</a>
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
                        </div>
                    </section>

                    <RoleExamples destination={destination} />

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
                            <div><p className="tt-eyebrow tt-eyebrow-dark">Before you head out</p><h2 id="tt-faq-title">A few<br /> good questions.</h2></div>
                            <div className="tt-faq-list">
                                <details><summary>Who is Troop Talk for?<Plus size={19} aria-hidden="true" /></summary><p>Scouts, parents, and troop leaders who need help finding information in troop emails or understanding Scouting requirements.</p></details>
                                <details><summary>Can I use it with my troop?<Plus size={19} aria-hidden="true" /></summary><p>Troop Talk started with Troop 125. If you'd like to bring it to your troop, <a href="#bring-your-troop">tell us about your troop</a> to talk through setup.</p></details>
                                <details><summary>Does it have the latest troop updates?<Plus size={19} aria-hidden="true" /></summary><p>It can only search the material that's been added to its knowledge base. It doesn't automatically follow your inbox, so confirm recent changes with your troop's communications or a leader.</p></details>
                            </div>
                        </div>
                    </section>

                    <TroopInterest />

                    <section className="tt-closing" aria-labelledby="tt-closing-title">
                        <div className="tt-container tt-closing-inner"><div><p className="tt-eyebrow">Got a question?</p><h2 id="tt-closing-title">Start with Troop Talk.</h2></div><Link to={destination} className="tt-button tt-button-orange">{isSignedIn ? "Back to your chat" : "Open Troop Talk"}<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
                    </section>
                </main>

                <footer className="tt-footer">
                    <div className="tt-container">
                        <div className="tt-footer-top"><a href="#top" className="tt-brand"><TentMark className="tt-brand-mark" /><span>Troop Talk<span className="tt-brand-period">.</span></span></a><p>For the questions before the adventure.</p><a href="#bring-your-troop" className="tt-contact">Bring Troop Talk to your troop<ArrowUpRight size={16} aria-hidden="true" /></a></div>
                        <div className="tt-footer-bottom"><span>© {new Date().getFullYear()} Troop Talk</span><a href="/terms-and-conditions.html">Terms & conditions</a></div>
                    </div>
                </footer>
            </div>
        </>
    );
}
