interface ScrollCueProps {
  href: string;
  label?: string;
}

// Rotating circular "scroll" badge. The spin is plain CSS so it costs no JS and
// stops under reduced motion.
export default function ScrollCue({ href, label = "Scroll to explore" }: ScrollCueProps) {
  const ringText = `${label} • ${label} • `;

  return (
    <a
      href={href}
      aria-label={label}
      className="group relative grid h-28 w-28 place-items-center text-foreground"
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path id="scroll-cue-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[8px] font-bold uppercase">
          <textPath href="#scroll-cue-ring" textLength="236" lengthAdjust="spacing">
            {ringText}
          </textPath>
        </text>
      </svg>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-background transition-transform duration-300 group-hover:translate-y-1">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m6 13 6 6 6-6" />
        </svg>
      </span>
    </a>
  );
}
