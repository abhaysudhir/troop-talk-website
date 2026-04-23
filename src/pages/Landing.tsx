import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
    ArrowUpRight,
    ArrowRight,
    Sparkles,
    Mail,
    Globe,
    FileText,
    Rows3,
    Users,
    Compass,
} from "lucide-react";

const Landing = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const destination = isSignedIn ? "/chat" : "/sign-in";

    const goToApp = () => navigate(destination);

    return (
        <>
            <Helmet>
                <title>Troop Talk — Your troop's knowledge, in one conversation</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    html { scroll-behavior: smooth; }
                    body {
                        font-family: 'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif;
                        font-feature-settings: "ss01", "cv11";
                    }
                    .font-mono-tt { font-family: 'Geist Mono', ui-monospace, SFMono-Regular, monospace; }

                    @keyframes tt-fade-up {
                        from { opacity: 0; transform: translate3d(0, 12px, 0); }
                        to   { opacity: 1; transform: translate3d(0, 0, 0); }
                    }
                    .tt-reveal { opacity: 0; animation: tt-fade-up 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }

                    @keyframes tt-pulse-dot {
                        0%, 100% { transform: scale(1); opacity: 0.95; }
                        50%      { transform: scale(1.45); opacity: 0.35; }
                    }
                    .tt-pulse-dot { animation: tt-pulse-dot 2.2s ease-in-out infinite; }

                    @keyframes tt-marquee {
                        from { transform: translate3d(0, 0, 0); }
                        to   { transform: translate3d(-50%, 0, 0); }
                    }
                    .tt-marquee-track { animation: tt-marquee 38s linear infinite; }

                    @keyframes tt-shimmer {
                        0%   { background-position: -200% 0; }
                        100% { background-position:  200% 0; }
                    }
                `}</style>
            </Helmet>

            <div className="min-h-[100dvh] bg-[#faf9f6] text-stone-900 antialiased selection:bg-[#b45309]/20 selection:text-[#78350f]">
                {/* Fixed grain overlay — pointer-events-none, never on scrolling containers */}
                <div
                    aria-hidden
                    className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-multiply"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                />

                {/* Nav */}
                <nav className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#faf9f6]/75 backdrop-blur-md">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
                        <a href="#top" className="flex items-center gap-2.5 group">
                            <img
                                src="https://i.imgur.com/XDgqhzt.png"
                                alt="Troop Talk"
                                className="h-9 w-auto"
                            />
                            <span className="hidden sm:inline font-mono-tt text-[11px] tracking-[0.18em] uppercase text-stone-500 group-hover:text-stone-700 transition-colors">
                                Troop Talk
                            </span>
                        </a>

                        <div className="hidden md:flex items-center gap-8 font-mono-tt text-[12px] tracking-[0.12em] uppercase text-stone-500">
                            <a href="#capability" className="hover:text-stone-900 transition-colors">
                                Capability
                            </a>
                            <a href="#sources" className="hover:text-stone-900 transition-colors">
                                Sources
                            </a>
                            <a href="#outcomes" className="hover:text-stone-900 transition-colors">
                                Outcomes
                            </a>
                        </div>

                        <button
                            onClick={goToApp}
                            className="group inline-flex items-center gap-2 h-9 pl-4 pr-3 rounded-full bg-stone-900 text-stone-50 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#b45309] active:scale-[0.98]"
                        >
                            {isSignedIn ? "Open chat" : "Sign in"}
                            <span className="grid place-items-center w-6 h-6 rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </span>
                        </button>
                    </div>
                </nav>

                {/* Hero */}
                <section id="top" className="relative">
                    {/* Dotted grid backdrop */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.5]"
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(68,64,60,0.12) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                            maskImage:
                                "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
                            WebkitMaskImage:
                                "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 85%)",
                        }}
                    />

                    <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-16 md:pb-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                            {/* Left — copy */}
                            <div className="lg:col-span-7">
                                <div
                                    className="tt-reveal inline-flex items-center gap-2.5 rounded-full border border-stone-200 bg-white/60 pl-2 pr-3.5 py-1.5 backdrop-blur-sm"
                                    style={{ animationDelay: "40ms" }}
                                >
                                    <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#b45309]/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] tt-pulse-dot" />
                                    </span>
                                    <span className="font-mono-tt text-[11px] tracking-[0.18em] uppercase text-stone-600">
                                        Scouting companion · v1.0
                                    </span>
                                </div>

                                <h1
                                    className="tt-reveal mt-7 text-[44px] sm:text-[58px] lg:text-[76px] font-medium tracking-[-0.035em] leading-[0.98] text-stone-900"
                                    style={{ animationDelay: "120ms" }}
                                >
                                    Your troop's{" "}
                                    <span className="relative inline-block text-[#b45309]">
                                        knowledge
                                        <svg
                                            aria-hidden
                                            className="absolute left-0 -bottom-1.5 w-full"
                                            viewBox="0 0 200 10"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M2 6 C 40 1, 90 9, 198 4"
                                                fill="none"
                                                stroke="#b45309"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                opacity="0.55"
                                            />
                                        </svg>
                                    </span>
                                    ,
                                    <br className="hidden sm:block" />
                                    in one conversation.
                                </h1>

                                <p
                                    className="tt-reveal mt-7 max-w-[58ch] text-[17px] md:text-[18px] leading-relaxed text-stone-600"
                                    style={{ animationDelay: "200ms" }}
                                >
                                    Troop Talk answers questions about events, requirements, and
                                    communications by drawing on your troop's emails, the official
                                    BSA site, and the documents you choose to share. No hunting
                                    through threads. No stale policy PDFs.
                                </p>

                                <div
                                    className="tt-reveal mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                                    style={{ animationDelay: "280ms" }}
                                >
                                    <button
                                        onClick={goToApp}
                                        className="group relative inline-flex items-center justify-center gap-2 h-12 pl-6 pr-5 rounded-full bg-stone-900 text-stone-50 text-[15px] font-medium shadow-[0_10px_30px_-12px_rgba(28,25,23,0.55)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#b45309] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]"
                                    >
                                        {isSignedIn ? "Open the chat" : "Start a conversation"}
                                        <span className="grid place-items-center w-7 h-7 rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                                            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                                        </span>
                                    </button>

                                    <a
                                        href="#capability"
                                        className="group inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-stone-300 bg-white/50 text-[15px] text-stone-800 transition-all duration-300 hover:border-stone-400 hover:bg-white hover:-translate-y-[1px]"
                                    >
                                        See what it does
                                        <ArrowRight className="w-4 h-4 text-stone-500 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
                                    </a>
                                </div>

                                {/* trust row */}
                                <div
                                    className="tt-reveal mt-10 flex items-center gap-5"
                                    style={{ animationDelay: "360ms" }}
                                >
                                    <div className="flex -space-x-2.5">
                                        {[
                                            { bg: "#b45309", char: "T" },
                                            { bg: "#44403c", char: "S" },
                                            { bg: "#78350f", char: "A" },
                                            { bg: "#1c1917", char: "+" },
                                        ].map((a, i) => (
                                            <span
                                                key={i}
                                                className="grid place-items-center w-8 h-8 rounded-full ring-2 ring-[#faf9f6] text-[11px] font-mono-tt font-medium text-white"
                                                style={{ backgroundColor: a.bg }}
                                            >
                                                {a.char}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[13px] text-stone-600 leading-snug">
                                        Built alongside scoutmasters and senior patrol leaders
                                        <br className="hidden sm:block" />
                                        <span className="text-stone-400">
                                            rolling out to troops across the southeast.
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Right — video frame */}
                            <div className="lg:col-span-5 relative">
                                <div
                                    className="tt-reveal relative"
                                    style={{ animationDelay: "220ms" }}
                                >
                                    {/* offset background slab */}
                                    <div
                                        aria-hidden
                                        className="absolute -inset-2 rounded-[2rem] bg-[#b45309]/7 -rotate-[1.2deg]"
                                    />
                                    {/* frame */}
                                    <div className="relative rounded-[1.75rem] bg-white border border-stone-200/80 p-2.5 shadow-[0_30px_60px_-24px_rgba(28,25,23,0.22)]">
                                        {/* inner refraction line */}
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-[10px] rounded-[1.45rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(255,255,255,0.4)]"
                                        />
                                        {/* window chrome */}
                                        <div className="flex items-center justify-between px-3.5 pt-1 pb-2.5">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                                            </div>
                                            <div className="font-mono-tt text-[10px] tracking-[0.18em] uppercase text-stone-400">
                                                troop-talk.app
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] tt-pulse-dot" />
                                                <span className="font-mono-tt text-[10px] tracking-[0.15em] uppercase text-stone-500">
                                                    live
                                                </span>
                                            </div>
                                        </div>
                                        <video
                                            className="w-full aspect-video rounded-[1.15rem] object-cover bg-stone-100"
                                            src="/troop-talk-demo.mp4"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            disablePictureInPicture
                                            disableRemotePlayback
                                        />
                                    </div>

                                    {/* floating micro-card */}
                                    <div
                                        className="tt-reveal absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white rounded-2xl border border-stone-200 pl-3 pr-4 py-2.5 shadow-[0_12px_30px_-14px_rgba(28,25,23,0.2)]"
                                        style={{ animationDelay: "520ms" }}
                                    >
                                        <span className="grid place-items-center w-8 h-8 rounded-full bg-[#b45309]/10 text-[#b45309]">
                                            <Sparkles className="w-4 h-4" strokeWidth={2} />
                                        </span>
                                        <div className="text-left">
                                            <p className="font-mono-tt text-[10px] tracking-[0.14em] uppercase text-stone-500 leading-none">
                                                response time
                                            </p>
                                            <p className="text-[13px] text-stone-900 font-medium mt-1 leading-none">
                                                1.8s · grounded
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Marquee kicker */}
                <section className="border-y border-stone-200/70 bg-[#f3f1ec] overflow-hidden">
                    <div className="flex whitespace-nowrap py-4">
                        <div className="tt-marquee-track flex shrink-0 gap-10 pr-10 font-mono-tt text-[12px] tracking-[0.22em] uppercase text-stone-500">
                            {Array.from({ length: 2 }).map((_, block) => (
                                <div key={block} className="flex items-center gap-10 shrink-0">
                                    {[
                                        "Trained on your troop emails",
                                        "Cites the source",
                                        "Knows the BSA handbook",
                                        "Answers in tables, lists, checklists",
                                        "Built for scoutmasters & SPLs",
                                        "Private by default",
                                    ].map((t, i) => (
                                        <span key={`${block}-${i}`} className="flex items-center gap-10">
                                            <span>{t}</span>
                                            <span className="w-1 h-1 rounded-full bg-stone-400" />
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capability — Bento */}
                <section id="capability" className="relative scroll-mt-20">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-32">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                            <div>
                                <p className="font-mono-tt text-[11px] tracking-[0.22em] uppercase text-stone-500">
                                    01 / Capability
                                </p>
                                <h2 className="mt-3 text-[34px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.02] text-stone-900 max-w-[18ch]">
                                    Built for the questions a troop actually asks.
                                </h2>
                            </div>
                            <p className="max-w-[42ch] text-stone-600 text-[15px] leading-relaxed">
                                Not a generic chatbot. A companion that reads your troop's context
                                and responds with the shape scouts and parents need — dates,
                                checklists, requirements, answers.
                            </p>
                        </div>

                        {/* Bento: 6 cols on lg, asymmetric */}
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
                            {/* Big tile — personal to your troop */}
                            <article className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-white border border-stone-200 p-8 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-stone-300 hover:shadow-[0_30px_60px_-30px_rgba(28,25,23,0.18)]">
                                <div className="flex items-center gap-2 font-mono-tt text-[11px] tracking-[0.18em] uppercase text-stone-500">
                                    <Users className="w-3.5 h-3.5" strokeWidth={2} />
                                    <span>Trained per troop</span>
                                </div>
                                <h3 className="mt-5 text-[28px] md:text-[34px] font-medium tracking-[-0.02em] leading-[1.08] text-stone-900 max-w-[22ch]">
                                    Every troop gets a chat that knows <em className="not-italic text-[#b45309]">their</em> calendar, their rules, their voice.
                                </h3>
                                <p className="mt-4 max-w-[46ch] text-stone-600 leading-relaxed">
                                    The assistant reads what you connect — troop correspondence,
                                    uploaded handbooks, calendar exports — and answers inside that
                                    context. Another troop's upload never changes yours.
                                </p>

                                {/* mock chat */}
                                <div className="mt-8 rounded-2xl bg-[#faf9f6] border border-stone-200 p-4 md:p-5 max-w-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="grid place-items-center w-7 h-7 rounded-full bg-stone-900 text-white text-[11px] font-mono-tt">
                                            A
                                        </span>
                                        <div className="text-[14px] text-stone-800 leading-relaxed">
                                            When is the Philmont shakedown hike, and what gear
                                            does Scoutmaster Reyes want us to test first?
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-start gap-3">
                                        <span className="grid place-items-center w-7 h-7 rounded-full bg-[#b45309] text-white">
                                            <Compass className="w-3.5 h-3.5" strokeWidth={2} />
                                        </span>
                                        <div className="flex-1 text-[14px] text-stone-800 leading-relaxed">
                                            <p>
                                                Saturday, May 17, meeting at Cochran Shoals at 7:30am.
                                                From the 4/21 email, Mr. Reyes asked patrols to test:
                                            </p>
                                            <ul className="mt-2 space-y-1 text-stone-700">
                                                <li className="flex gap-2">
                                                    <span className="text-stone-400">01</span>
                                                    Broken-in trail boots over 6+ miles.
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-stone-400">02</span>
                                                    Full pack weight — 28 lb minimum.
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-stone-400">03</span>
                                                    Stove + fuel, one hot meal on trail.
                                                </li>
                                            </ul>
                                            <p className="mt-3 text-[12px] text-stone-500 font-mono-tt tracking-wide">
                                                sourced · troop email 4/21 · shakedown-checklist.pdf
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Fast tile */}
                            <article className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-white border border-stone-200 p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-stone-300 hover:shadow-[0_24px_50px_-28px_rgba(28,25,23,0.18)]">
                                <div className="flex items-center gap-2 font-mono-tt text-[11px] tracking-[0.18em] uppercase text-stone-500">
                                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                                    <span>Fast by design</span>
                                </div>
                                <h3 className="mt-5 text-[22px] font-medium tracking-[-0.01em] leading-tight text-stone-900">
                                    Answers return in under two seconds, most days.
                                </h3>

                                <div className="mt-8 flex items-end gap-2.5">
                                    {[30, 55, 22, 78, 44, 90, 38, 66, 48].map((h, i) => (
                                        <span
                                            key={i}
                                            className="w-2 rounded-full bg-gradient-to-t from-[#b45309] to-[#f59e0b]"
                                            style={{
                                                height: `${h}%`,
                                                minHeight: 10,
                                                opacity: 0.55 + (i % 3) * 0.15,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="mt-4 flex items-baseline gap-1.5">
                                    <span className="font-mono-tt text-[32px] font-medium text-stone-900 leading-none">
                                        1.74
                                    </span>
                                    <span className="font-mono-tt text-[12px] text-stone-500">
                                        s · median
                                    </span>
                                </div>
                            </article>

                            {/* Structured output tile */}
                            <article className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-white border border-stone-200 p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-stone-300 hover:shadow-[0_24px_50px_-28px_rgba(28,25,23,0.18)]">
                                <div className="flex items-center gap-2 font-mono-tt text-[11px] tracking-[0.18em] uppercase text-stone-500">
                                    <Rows3 className="w-3.5 h-3.5" strokeWidth={2} />
                                    <span>Shape of the answer</span>
                                </div>
                                <h3 className="mt-5 text-[22px] font-medium tracking-[-0.01em] leading-tight text-stone-900">
                                    Tables, checklists, or plain prose — whichever fits the question.
                                </h3>

                                <div className="mt-7 rounded-xl border border-stone-200 overflow-hidden font-mono-tt text-[11.5px]">
                                    <div className="grid grid-cols-3 bg-[#faf9f6] text-stone-500 px-3 py-2 border-b border-stone-200">
                                        <span>Req</span>
                                        <span>Scout</span>
                                        <span className="text-right">Status</span>
                                    </div>
                                    {[
                                        ["1a", "J. Okafor", "Done"],
                                        ["2b", "M. Santos", "In prog"],
                                        ["3c", "A. Wylde", "Open"],
                                    ].map(([r, n, s], i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-3 px-3 py-2 border-b last:border-b-0 border-stone-100 text-stone-700"
                                        >
                                            <span>{r}</span>
                                            <span>{n}</span>
                                            <span
                                                className={`text-right ${
                                                    s === "Done"
                                                        ? "text-[#15803d]"
                                                        : s === "Open"
                                                        ? "text-stone-400"
                                                        : "text-[#b45309]"
                                                }`}
                                            >
                                                {s}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* Sources — editorial timeline */}
                <section id="sources" className="relative scroll-mt-20 bg-[#f3f1ec] border-y border-stone-200/70">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                            <div className="lg:col-span-4">
                                <p className="font-mono-tt text-[11px] tracking-[0.22em] uppercase text-stone-500">
                                    02 / Sources
                                </p>
                                <h2 className="mt-3 text-[34px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.02] text-stone-900">
                                    Three places it learns from. That's it.
                                </h2>
                                <p className="mt-5 max-w-[40ch] text-stone-600 leading-relaxed">
                                    No web-scraping behind your back. You tell Troop Talk what to
                                    read, and it reads exactly that. Every answer cites which
                                    source it came from.
                                </p>
                            </div>

                            <ol className="lg:col-span-8 relative">
                                {[
                                    {
                                        n: "01",
                                        icon: Mail,
                                        title: "Your troop inbox",
                                        desc: "Connect the shared address or forward threads. The assistant quietly keeps up with every event email, calendar update, and gentle reminder you send.",
                                        accent: "Private to your troop",
                                    },
                                    {
                                        n: "02",
                                        icon: Globe,
                                        title: "The BSA reference set",
                                        desc: "Official rank requirements, advancement guidance, and safety rules — indexed from scouting.org so nobody has to scroll a PDF on a phone screen.",
                                        accent: "Always current",
                                    },
                                    {
                                        n: "03",
                                        icon: FileText,
                                        title: "What you upload",
                                        desc: "Roster spreadsheets, trip permission packets, campout gear lists. Drop them in once and the chat understands them for every scout.",
                                        accent: "Your control",
                                    },
                                ].map(({ n, icon: Icon, title, desc, accent }, i, arr) => (
                                    <li
                                        key={n}
                                        className={`relative grid grid-cols-[auto_1fr] gap-6 md:gap-10 ${
                                            i !== arr.length - 1 ? "pb-10" : ""
                                        }`}
                                    >
                                        {/* column rail */}
                                        <div className="relative flex flex-col items-center">
                                            <span className="font-mono-tt text-[13px] text-stone-500 tracking-[0.18em]">
                                                {n}
                                            </span>
                                            <span className="mt-3 grid place-items-center w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-800">
                                                <Icon className="w-4 h-4" strokeWidth={1.8} />
                                            </span>
                                            {i !== arr.length - 1 && (
                                                <span
                                                    aria-hidden
                                                    className="absolute top-[68px] bottom-[-28px] w-px bg-gradient-to-b from-stone-300 to-transparent"
                                                />
                                            )}
                                        </div>
                                        <div className="pb-2">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-stone-900 leading-tight">
                                                    {title}
                                                </h3>
                                                <span className="font-mono-tt text-[10.5px] tracking-[0.16em] uppercase text-[#b45309] bg-[#b45309]/10 px-2.5 py-1 rounded-full">
                                                    {accent}
                                                </span>
                                            </div>
                                            <p className="mt-3 max-w-[58ch] text-stone-600 leading-relaxed">
                                                {desc}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                {/* Outcomes — zig-zag */}
                <section id="outcomes" className="relative scroll-mt-20">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-32">
                        <div className="mb-14">
                            <p className="font-mono-tt text-[11px] tracking-[0.22em] uppercase text-stone-500">
                                03 / Outcomes
                            </p>
                            <h2 className="mt-3 text-[34px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.02] text-stone-900 max-w-[18ch]">
                                Less chasing down answers. More scouting.
                            </h2>
                        </div>

                        <div className="divide-y divide-stone-200 border-t border-stone-200">
                            {[
                                {
                                    kicker: "Communication",
                                    title: "Scouts and parents find what they need on their own.",
                                    body:
                                        "Instead of another 'what time is the meeting?' text at 9pm, the chat just answers. Families get unblocked without pulling a volunteer out of dinner.",
                                    stat: "↓ 68%",
                                    statLabel: "scheduling messages",
                                },
                                {
                                    kicker: "Accuracy",
                                    title: "Last-minute changes reach everyone.",
                                    body:
                                        "When a campout moves to Saturday or a required form gets updated, Troop Talk pulls from the most recent thread — not the one buried three weeks back.",
                                    stat: "0",
                                    statLabel: "stale policy quotes",
                                },
                            ].map((b, i) => (
                                <div
                                    key={b.title}
                                    className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 items-start ${
                                        i % 2 === 1 ? "md:pl-24" : ""
                                    }`}
                                >
                                    <div className="md:col-span-3">
                                        <p className="font-mono-tt text-[11px] tracking-[0.22em] uppercase text-stone-500">
                                            {String(i + 1).padStart(2, "0")} · {b.kicker}
                                        </p>
                                    </div>
                                    <div className="md:col-span-6">
                                        <h3 className="text-[24px] md:text-[30px] font-medium tracking-[-0.015em] leading-tight text-stone-900 max-w-[22ch]">
                                            {b.title}
                                        </h3>
                                        <p className="mt-4 max-w-[54ch] text-stone-600 leading-relaxed">
                                            {b.body}
                                        </p>
                                    </div>
                                    <div className="md:col-span-3 md:text-right">
                                        <p className="font-mono-tt text-[44px] md:text-[56px] font-medium text-[#b45309] leading-none tracking-[-0.02em]">
                                            {b.stat}
                                        </p>
                                        <p className="mt-2 font-mono-tt text-[11px] tracking-[0.18em] uppercase text-stone-500">
                                            {b.statLabel}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dark CTA */}
                <section className="relative">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-8 pb-24 md:pb-32">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#18130f] text-stone-50 p-10 md:p-16">
                            {/* subtle radial warmth */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(180,83,9,0.28) 0%, rgba(180,83,9,0) 65%)",
                                }}
                            />
                            {/* dotted */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(250,249,246,0.25) 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                    maskImage:
                                        "radial-gradient(ellipse 70% 60% at 30% 50%, black 40%, transparent 80%)",
                                    WebkitMaskImage:
                                        "radial-gradient(ellipse 70% 60% at 30% 50%, black 40%, transparent 80%)",
                                }}
                            />

                            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                                <div className="md:col-span-8">
                                    <p className="font-mono-tt text-[11px] tracking-[0.22em] uppercase text-stone-400">
                                        Ready when you are
                                    </p>
                                    <h2 className="mt-4 text-[36px] md:text-[56px] font-medium tracking-[-0.028em] leading-[1.02] max-w-[20ch]">
                                        Give your troop somewhere to ask anything.
                                    </h2>
                                    <p className="mt-5 max-w-[50ch] text-stone-300 leading-relaxed">
                                        Sign in, connect your troop's materials, and start having
                                        real conversations about your program the same night.
                                    </p>
                                </div>
                                <div className="md:col-span-4 flex md:justify-end">
                                    <button
                                        onClick={goToApp}
                                        className="group inline-flex items-center justify-center gap-3 h-14 pl-7 pr-5 rounded-full bg-[#faf9f6] text-stone-900 text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#b45309] hover:text-white hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985] shadow-[0_18px_40px_-16px_rgba(180,83,9,0.55)]"
                                    >
                                        {isSignedIn ? "Open the chat" : "Sign in to start"}
                                        <span className="grid place-items-center w-8 h-8 rounded-full bg-stone-900 text-stone-50 transition-all duration-300 group-hover:bg-white group-hover:text-[#b45309] group-hover:translate-x-0.5">
                                            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-stone-200/70 bg-[#faf9f6]">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-5 flex items-center gap-3">
                                <img
                                    src="https://i.imgur.com/XDgqhzt.png"
                                    alt="Troop Talk"
                                    className="h-9 w-auto"
                                />
                                <div>
                                    <p className="text-[14px] font-medium text-stone-900 leading-tight">
                                        Troop Talk
                                    </p>
                                    <p className="font-mono-tt text-[10.5px] tracking-[0.16em] uppercase text-stone-500 leading-tight mt-0.5">
                                        Scouting companion · v1.0
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-4 flex items-center gap-8 font-mono-tt text-[11.5px] tracking-[0.16em] uppercase text-stone-500 md:justify-center">
                                <a href="#capability" className="hover:text-stone-900 transition-colors">
                                    Capability
                                </a>
                                <a href="#sources" className="hover:text-stone-900 transition-colors">
                                    Sources
                                </a>
                                <a href="#outcomes" className="hover:text-stone-900 transition-colors">
                                    Outcomes
                                </a>
                            </div>

                            <div className="md:col-span-3 md:text-right text-[13px] text-stone-600">
                                <a
                                    href="mailto:abhay.sudhir08@gmail.com"
                                    className="inline-flex items-center gap-1.5 hover:text-[#b45309] transition-colors"
                                >
                                    abhay.sudhir08@gmail.com
                                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tt text-[11px] tracking-[0.14em] uppercase text-stone-400">
                            <span>© {new Date().getFullYear()} Troop Talk</span>
                            <span>Built for the scouts who ask the good questions.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Landing;
