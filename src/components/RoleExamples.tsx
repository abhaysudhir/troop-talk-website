import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, UserRound } from "lucide-react";
import TentMark from "./TentMark";
import "./RoleExamples.css";

const audiences = [
    {
        id: "parents", label: "Parents", title: "Know what to bring. And when to be there.",
        description: "Find the trip details, permission forms, and reminders that help your family get ready.",
        examples: [
            { label: "Packing list", question: "What should I bring to the campout?", intro: "For this campout, the packing list is:", items: ["Sleeping bag & sleeping pad", "Rain jacket and a warm layer", "Water bottle", "Mess kit & utensils", "Headlamp or flashlight"], note: "Check the trip details for anything extra your patrol needs." },
            { label: "Departure time", question: "When are we leaving on Saturday?", intro: "Meet at the troop's usual meeting place at 8:00 a.m. on Saturday.", items: ["Bring your signed permission form", "Have your gear packed and ready to load"], note: "The plan is to head out together after a quick gear check." },
            { label: "Permission form", question: "Which permission form do we need?", intro: "The campout announcement asks families to complete the trip permission form.", items: ["Use the form attached to the campout email", "Bring the signed copy to Saturday's departure"], note: "If you can't find the attachment, ask the trip leader for another copy." },
        ],
    },
    {
        id: "scouts", label: "Scouts", title: "Come to the next meeting prepared.",
        description: "Check what's coming up, what to pack, and where to look when a requirement needs explaining.",
        examples: [
            { label: "Next meeting", question: "What are we doing at the next meeting?", intro: "This meeting is about getting ready for the campout.", items: ["Plan meals with your patrol", "Sort out who is bringing shared gear", "Review the packing list"], note: "Bring a notebook, a pencil, and your meal ideas." },
            { label: "Day hike", question: "What did the hike email say to bring?", intro: "The hike reminder lists:", items: ["A filled water bottle and a packed lunch", "Comfortable walking shoes", "A rain layer and a small daypack"], note: "The reminder says to arrive ready for a gear check before leaving." },
            { label: "Rank requirements", question: "Where can I read the requirements for my next rank?", intro: "Start with the requirements for the rank you're working toward in the Scouting reference material.", items: ["Ask about a specific rank or requirement", "Read the full requirement, including any parts", "Talk with a leader about questions or sign-offs"], note: "Troop Talk can help explain the wording. A leader handles the sign-off." },
        ],
    },
    {
        id: "scoutmasters", label: "Scoutmasters", title: "Find the plan you've already shared.",
        description: "Look up an announcement or recap a trip email before answering the next family's question.",
        examples: [
            { label: "Campout details", question: "What details have we already shared about Saturday?", intro: "The campout announcement includes:", items: ["Meet at 8:00 a.m. at the usual meeting place", "Bring a signed permission form", "Each patrol plans its own meals"], note: "This announcement doesn't include a return time. Check with the trip leader." },
            { label: "Trip reminders", question: "What reminders were included in the trip email?", intro: "Families were asked to:", items: ["Check the packing list before departure", "Bring their signed trip form", "Label personal gear"], note: "The same email asks patrols to confirm their shared equipment at the meeting." },
            { label: "Meeting prep", question: "What preparation did we request for the next meeting?", intro: "The meeting reminder asks scouts to come ready to plan the campout.", items: ["Bring meal ideas for the patrol", "Check who has the shared cooking gear", "Write down any questions about the trip"], note: "This is a recap of the sample reminder, so you can check what was communicated." },
        ],
    },
    {
        id: "leadership", label: "Youth leadership", title: "Give your patrol a plan to work with.",
        description: "Pull up meal plans, shared gear reminders, and meeting prep so your patrol can make its own decisions.",
        examples: [
            { label: "Patrol planning", question: "What does our patrol need to plan before the campout?", intro: "The meeting email asks each patrol to work out:", items: ["A menu for the weekend", "Who will shop for the food", "Who is bringing the shared cooking gear"], note: "Bring your plan to the next troop meeting so you can sort out any gaps." },
            { label: "Shared gear", question: "Which shared gear should we discuss at the meeting?", intro: "The gear reminder calls out:", items: ["Tents and sleeping arrangements", "The patrol stove and cooking kit", "Food storage and cleanup supplies"], note: "Confirm who is bringing each item with your patrol before departure." },
            { label: "Meeting agenda", question: "What should we cover with our patrol at the next meeting?", intro: "Use the campout reminder as a starting point:", items: ["Agree on meals and shopping", "Check shared gear assignments", "Collect questions for the trip leader"], note: "Leave time for everyone in the patrol to bring up anything they've missed." },
        ],
    },
    {
        id: "admins", label: "Admins", title: "Keep the details easy to find.",
        description: "Find the dates, forms, and reminders in past announcements without digging through the whole archive.",
        examples: [
            { label: "Find a form", question: "Which announcement mentions the permission form?", intro: "The campout announcement includes the trip permission form and asks families to:", items: ["Complete the attached form", "Bring the signed copy on Saturday"], note: "Look for the campout announcement in the troop email archive for the original attachment." },
            { label: "Event dates", question: "What dates are listed in these troop announcements?", intro: "These sample announcements mention:", items: ["Tuesday: troop meeting and patrol planning", "Saturday: campout departure at 8:00 a.m.", "Sunday: return from the campout"], note: "No return time is listed in these announcements. Check with the trip leader." },
            { label: "New families", question: "What did the welcome email ask new families to do?", intro: "The welcome email asks new families to:", items: ["Read the troop meeting and contact details", "Review the forms linked in the email", "Bring their questions to the next parent meeting"], note: "Use the original welcome email for the form links and contact information." },
        ],
    },
];

export default function RoleExamples({ destination }: { destination: string }) {
    const [audienceIndex, setAudienceIndex] = useState(0);
    const [exampleIndex, setExampleIndex] = useState(0);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);

    function selectAudience(index: number) {
        setAudienceIndex(index);
        setExampleIndex(0);
    }

    function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        let next: number;
        switch (event.key) {
            case "ArrowRight": next = (index + 1) % audiences.length; break;
            case "ArrowLeft": next = (index - 1 + audiences.length) % audiences.length; break;
            case "Home": next = 0; break;
            case "End": next = audiences.length - 1; break;
            default: return;
        }
        event.preventDefault();
        selectAudience(next);
        tabs.current[next]?.focus();
    }

    return (
        <section className="tt-example-section" id="try-a-question" aria-labelledby="tt-example-title">
            <div className="tt-container">
                <div className="tt-demo-heading">
                    <div>
                        <p className="tt-eyebrow tt-eyebrow-dark">Who's asking?</p>
                        <h2 id="tt-example-title">Questions from<br /> across the troop.</h2>
                    </div>
                    <p>A parent checking a departure time. A patrol leader sorting out dinner. See how Troop Talk can help each person find the details they need.</p>
                </div>

                <div className="tt-role-tabs" role="tablist" aria-label="Explore example questions by role">
                    {audiences.map((audience, index) => (
                        <button key={audience.id} ref={el => { tabs.current[index] = el; }} type="button" role="tab" id={`tt-tab-${audience.id}`} aria-selected={audienceIndex === index} aria-controls={`tt-panel-${audience.id}`} tabIndex={audienceIndex === index ? 0 : -1} onClick={() => selectAudience(index)} onKeyDown={event => handleTabKey(event, index)}>
                            {audience.label}
                        </button>
                    ))}
                </div>

                {audiences.map((audience, index) => {
                    const example = audience.examples[exampleIndex];
                    const answerId = `tt-answer-${audience.id}`;
                    return (
                        <div key={audience.id} role="tabpanel" id={`tt-panel-${audience.id}`} aria-labelledby={`tt-tab-${audience.id}`} tabIndex={0} hidden={audienceIndex !== index} className="tt-role-panel tt-example-grid">
                            <div className="tt-role-intro">
                                <h3>{audience.title}</h3>
                                <p>{audience.description}</p>
                                <div className="tt-example-picker" role="group" aria-label={`Example questions for ${audience.label.toLowerCase()}`}>
                                    <p>Try an example</p>
                                    {audience.examples.map((item, itemIndex) => (
                                        <button key={item.label} type="button" aria-pressed={exampleIndex === itemIndex} aria-controls={answerId} onClick={() => setExampleIndex(itemIndex)}>
                                            {item.label}<ArrowRight size={18} aria-hidden="true" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="tt-conversation">
                                <div className="tt-conversation-header"><span>Example conversation</span><span>{audience.label}</span></div>
                                <div className="tt-conversation-body" id={answerId} aria-live={audienceIndex === index ? "polite" : "off"} aria-atomic="true">
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
                    );
                })}
            </div>
        </section>
    );
}
