interface ResyMatchLogoProps {
  size?: number;
  className?: string;
}

export function ResyMatchLogo({ size = 32, className }: ResyMatchLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Background circle */}
      <circle cx="16" cy="16" r="14" className="fill-primary" />
      {/* Document shape */}
      <rect x="10" y="8" width="12" height="16" rx="2" fill="white" fillOpacity="0.9" />
      {/* Lines on document */}
      <rect x="12" y="11" width="8" height="1.5" rx="0.75" className="fill-primary/60" />
      <rect x="12" y="14" width="6" height="1.5" rx="0.75" className="fill-primary/40" />
      <rect x="12" y="17" width="7" height="1.5" rx="0.75" className="fill-primary/40" />
      {/* Checkmark accent */}
      <circle cx="22" cy="22" r="5" className="fill-primary" stroke="white" strokeWidth="2" />
      <path
        d="M19.5 22 L21 23.5 L24.5 20"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
