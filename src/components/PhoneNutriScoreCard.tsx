import NutriScoreGauge from "@/components/NutriScoreGauge";

type PhoneNutriScoreCardProps = {
  variant?: "phone" | "flat";
  className?: string;
};

export default function PhoneNutriScoreCard({
  variant = "phone",
  className = "",
}: PhoneNutriScoreCardProps) {
  if (variant === "flat") {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
      >
        <NutriScoreGauge score={97} status="Excellent" delta={4} size={180} />
      </div>
    );
  }

  return (
    <div
      className={`rounded-[2.25rem] bg-slate-900 p-3 shadow-xl ${className}`}
    >
      <div className="flex flex-col items-center rounded-[1.65rem] bg-white px-6 py-8">
        <NutriScoreGauge score={97} status="Excellent" delta={4} size={190} />
      </div>
    </div>
  );
}
