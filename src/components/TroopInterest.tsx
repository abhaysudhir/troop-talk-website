import { useId, useRef, useState, type FormEvent } from "react";
import "./TroopInterest.css";

const CONTACT_EMAIL = "abhay.sudhir08@gmail.com";

export default function TroopInterest() {
    const fieldId = useId();
    const draftRef = useRef<HTMLTextAreaElement>(null);
    const [draft, setDraft] = useState("");
    const [copyStatus, setCopyStatus] = useState("");

    function prepareEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = (name: string) => String(data.get(name) ?? "").trim();
        const troop = value("troop");
        const body = [
            "Hi Abhay,",
            "",
            "I'd like to talk about using Troop Talk with our troop.",
            "",
            `Name: ${value("name")}`,
            `Email: ${value("email")}`,
            `Troop and location: ${troop}`,
            `Role: ${value("role")}`,
            ...(value("message") ? ["", value("message")] : []),
        ].join("\n");

        setDraft(body);
        setCopyStatus("");
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Troop Talk interest: ${troop}`)}&body=${encodeURIComponent(body)}`;
    }

    async function copyDetails() {
        try {
            await navigator.clipboard.writeText(draft);
            setCopyStatus("Details copied. Paste them into an email to Abhay.");
        } catch {
            draftRef.current?.focus();
            draftRef.current?.select();
            setCopyStatus("Select and copy the details below, then paste them into your email.");
        }
    }

    return (
        <section className="tt-interest-section" id="bring-your-troop" aria-labelledby={`${fieldId}-title`}>
            <div className="tt-container tt-interest-grid">
                <div className="tt-interest-intro">
                    <p className="tt-interest-eyebrow">For interested troops</p>
                    <h2 id={`${fieldId}-title`}>Bring Troop Talk<br /> to your troop.</h2>
                    <p>Tell Abhay a little about your troop and what you'd like help finding. We'll talk through whether Troop Talk is a good fit.</p>

                    <ol className="tt-interest-steps">
                        <li>
                            <span className="tt-interest-step-number" aria-hidden="true">01</span>
                            <div><h3>Start with a conversation</h3><p>Share how your troop communicates and the questions that keep coming up.</p></div>
                        </li>
                        <li>
                            <span className="tt-interest-step-number" aria-hidden="true">02</span>
                            <div><h3>Set it up together</h3><p>Agree on which troop materials to include, then work through setup with Abhay.</p></div>
                        </li>
                    </ol>

                    <p className="tt-interest-direct">Prefer to write directly?<br /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                </div>

                <form
                    className="tt-interest-form"
                    onSubmit={prepareEmail}
                    onChange={() => { setDraft(""); setCopyStatus(""); }}
                    aria-label="Contact Abhay about your troop"
                    aria-describedby={`${fieldId}-required ${fieldId}-email-help`}
                >
                    <p className="tt-interest-required" id={`${fieldId}-required`}>All fields are required unless marked optional.</p>
                    <div className="tt-interest-fields">
                        <div className="tt-interest-field">
                            <label htmlFor={`${fieldId}-name`}>Your name</label>
                            <input id={`${fieldId}-name`} name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" />
                        </div>
                        <div className="tt-interest-field">
                            <label htmlFor={`${fieldId}-email`}>Email address</label>
                            <input id={`${fieldId}-email`} name="email" type="email" autoComplete="email" required maxLength={254} />
                        </div>
                        <div className="tt-interest-field">
                            <label htmlFor={`${fieldId}-troop`}>Troop and location</label>
                            <input id={`${fieldId}-troop`} name="troop" placeholder="Troop 125, Fremont, CA" required maxLength={160} pattern=".*\S.*" />
                        </div>
                        <div className="tt-interest-field">
                            <label htmlFor={`${fieldId}-role`}>Your role</label>
                            <select id={`${fieldId}-role`} name="role" required defaultValue="">
                                <option value="" disabled>Select your role</option>
                                <option>Parent or guardian</option>
                                <option>Scout</option>
                                <option>Scoutmaster / adult leader</option>
                                <option>Youth leadership</option>
                                <option>Troop admin</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="tt-interest-field tt-interest-field-wide">
                            <label htmlFor={`${fieldId}-message`}>Anything you'd like us to know? <span>Optional</span></label>
                            <textarea id={`${fieldId}-message`} name="message" rows={4} maxLength={1200} placeholder="What would you like Troop Talk to help with?" />
                        </div>
                    </div>
                    <p className="tt-interest-email-help" id={`${fieldId}-email-help`}>This opens your email app with these details. Review the draft and send it there.</p>
                    <button className="tt-interest-submit" type="submit">Prepare email<span aria-hidden="true">↗</span></button>

                    {draft && (
                        <div className="tt-interest-fallback">
                            <p role="status">If your email app didn't open, copy the details below and email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Nothing has been sent from this page.</p>
                            <label className="tt-interest-draft-label" htmlFor={`${fieldId}-draft`}>Your email details</label>
                            <textarea ref={draftRef} id={`${fieldId}-draft`} value={draft} readOnly rows={7} />
                            <button className="tt-interest-copy" type="button" onClick={copyDetails}>Copy details</button>
                            <p className="tt-interest-copy-status" role="status">{copyStatus}</p>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
