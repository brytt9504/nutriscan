// Static sample ring — score/status/delta are hardcoded illustrative values,
// not derived from a real scan. Do not wire this to `vitality.ts` payload
// fields without an explicit, confirmed NutriScore mapping (none exists yet).

type NutriScoreRingProps = {
  score: number;
  status: string;
  delta: number;
  size?: number;
  showSampleTag?: boolean;
};

const RADIUS = 80;
const STROKE_WIDTH = 16;
const CENTER = 100;
const TRACK_COVERAGE = 92; // leaves an 8-unit gap at the top, activity-ring style

export default function NutriScoreRing({
  score,
  status,
  delta,
  size = 220,
  showSampleTag = true,
}: NutriScoreRingProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const progress = (clampedScore / 100) * TRACK_COVERAGE;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {showSampleTag && (
        <span className="absolute right-0 top-0 text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Sample
        </span>
      )}

      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        role="img"
        aria-label={`Sample NutriScore: ${clampedScore}, ${status}, ${
          delta >= 0 ? "up" : "down"
        } ${Math.abs(delta)} points since last scan`}
      >
        <defs>
          <linearGradient id="nutriscoreRingGradient" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="55%" stopColor="#22c55e" />
            <stop offset="75%" stopColor="#eab308" />
            <stop offset="90%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${TRACK_COVERAGE} ${100 - TRACK_COVERAGE}`}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="url(#nutriscoreRingGradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${progress} ${100 - progress}`}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          NutriScore
        </span>
        <span className="text-4xl font-semibold tracking-tight text-slate-900">
          {clampedScore}
        </span>
        <span className="mt-0.5 text-sm font-medium text-emerald-700">
          {status}
        </span>
        <span className="mt-1 flex items-center gap-0.5 text-xs font-medium text-emerald-600">
          <ArrowUp />
          {delta >= 0 ? "+" : ""}
          {delta} since last scan
        </span>
      </div>
    </div>
  );
}

function ArrowUp() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
      <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
