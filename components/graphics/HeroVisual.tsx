export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-mist via-white to-blue/10"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        role="img"
        aria-label="Abstract scientific illustration representing life sciences research and learning"
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#30609C"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="145"
          fill="none"
          stroke="#41835E"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="#2A3351"
          strokeOpacity="0.12"
          strokeWidth="1"
        />

        <g
          className="animate-orbit-slow"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="200" cy="20" r="6" fill="#41835E" />
          <circle cx="380" cy="200" r="5" fill="#30609C" />
          <circle cx="200" cy="380" r="4" fill="#F6DD34" />
        </g>

        <g
          className="animate-orbit-slower"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="90" cy="90" r="4" fill="#30609C" />
          <circle cx="310" cy="110" r="5" fill="#41835E" />
          <circle cx="90" cy="310" r="4" fill="#2A3351" />
        </g>

        <g transform="translate(140 130)">
          <path
            d="M35 0 H65 V35 L92 105 C97 118 87 130 74 130 H26 C13 130 3 118 8 105 L35 35 Z"
            fill="#FFFFFF"
            stroke="#2A3351"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M18 95 L82 95 L74 115 C71 122 66 125 60 125 H40 C34 125 29 122 26 115 Z"
            fill="#41835E"
            fillOpacity="0.85"
          />
          <rect x="30" y="0" width="40" height="10" rx="3" fill="#2A3351" />
          <circle cx="50" cy="72" r="4" fill="#30609C" />
          <circle cx="38" cy="88" r="3" fill="#F6DD34" />
          <circle cx="62" cy="90" r="3" fill="#2A3351" />
        </g>

        <g stroke="#30609C" strokeOpacity="0.35" strokeWidth="1.5">
          <line x1="200" y1="200" x2="200" y2="20" strokeDasharray="2 5" />
          <line x1="200" y1="200" x2="380" y2="200" strokeDasharray="2 5" />
        </g>
      </svg>
    </div>
  );
}
