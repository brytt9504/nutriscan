type HandPlacementIllustrationProps = {
  className?: string;
};

// Purely decorative/instructional artwork — a stylized top-down view of a
// hand resting flat on the scanner, with light rings under the palm to echo
// the "optical measurement" concept used elsewhere (WifiRingsIcon on the
// homepage). Not a technical diagram of the real device; drawn in the same
// thin-outline style as the rest of the icon set.
export default function HandPlacementIllustration({
  className,
}: HandPlacementIllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      className={className}
      role="img"
      aria-label="A hand resting flat on the scanner, palm down"
    >
      {/* Scanner device */}
      <rect
        x="36"
        y="146"
        width="168"
        height="42"
        rx="13"
        stroke="currentColor"
        strokeWidth="2"
        className="text-slate-300"
      />
      <circle cx="54" cy="167" r="2.6" fill="currentColor" className="text-slate-300" />
      <path
        d="M164 172a10 10 0 0 1 14 0M168.3 167.7a4.2 4.2 0 0 1 5.4 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="text-slate-300"
      />
      <circle cx="176" cy="176" r="1.3" fill="currentColor" className="text-slate-300" />

      {/* Light rings under the palm */}
      <path
        d="M104 150a16 6 0 0 1 32 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-emerald-300"
      />
      <path
        d="M96 152a24 8 0 0 1 48 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-emerald-200"
      />

      {/* Hand, top-down, resting on the scanner */}
      <g className="text-emerald-700" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <rect x="112" y="44" width="16" height="82" rx="8" />
        <rect x="90" y="52" width="14" height="74" rx="7" transform="rotate(-10 97 126)" />
        <rect x="136" y="52" width="14" height="74" rx="7" transform="rotate(10 143 126)" />
        <rect x="158" y="68" width="13" height="58" rx="6.5" transform="rotate(22 164.5 126)" />
        <rect x="62" y="96" width="17" height="52" rx="8.5" transform="rotate(-46 70.5 148)" />
        <path
          d="M84 160c0-19.3 15.7-35 35-35s35 15.7 35 35v13a6 6 0 0 1-6 6H90a6 6 0 0 1-6-6v-13Z"
          fill="currentColor"
          fillOpacity="0.08"
        />
      </g>
    </svg>
  );
}
