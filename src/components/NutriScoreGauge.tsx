// Static sample gauge — score/status/delta are hardcoded illustrative values,
// not derived from a real scan. Do not wire this to `vitality.ts` payload
// fields without an explicit, confirmed NutriScore mapping (none exists yet).

type NutriScoreGaugeProps = {
  score: number;
  status: string;
  delta: number;
  size?: number;
  showSampleTag?: boolean;
};

const RADIUS = 80;
const STROKE_WIDTH = 16;
const CENTER_X = 100;
const CENTER_Y = 100;

export default function NutriScoreGauge({
  score,
  status,
  delta,
  size = 220,
  showSampleTag = true,
}: NutriScoreGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const height = size * 0.62;

  return (
    <div className="relative" style={{ width: size, height }}>
      {showSampleTag && (
        <span className="absolute right-0 top-0 text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Sample
        </span>
      )}

      <svg
        viewBox="0 0 200 124"
        className="h-full w-full"
        role="img"
        aria-label={`Sample NutriScore: ${clampedScore}, ${status}, ${
          delta >= 0 ? "up" : "down"
        } ${Math.abs(delta)} points since last scan`}
      >
        <defs>
          <linearGradient id="nutriscoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        <path
          d={`M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${
            CENTER_X + RADIUS
          } ${CENTER_Y}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />

        <path
          d={`M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${
            CENTER_X + RADIUS
          } ${CENTER_Y}`}
          fill="none"
          stroke="url(#nutriscoreGaugeGradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${clampedScore} ${100 - clampedScore}`}
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-4xl font-semibold tracking-tight text-slate-900">
          {clampedScore}
        </span>
        <span className="text-sm font-medium text-emerald-700">{status}</span>
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
      <path
        d="M6 10V2M2.5 5.5 6 2l3.5 3.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
