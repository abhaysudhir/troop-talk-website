export default function TentMark({ className = "" }: { className?: string }) {
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
