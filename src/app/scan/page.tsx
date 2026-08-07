"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ClockIcon, HandIcon, SparkleIcon, TargetIcon } from "@/components/icons";
import HandPlacementIllustration from "@/components/scan/HandPlacementIllustration";

// Durations and copy here match the confirmed scan types in
// docs/Scanner.md ("Quick Scan — 30 seconds", "Precision Scan — 90
// seconds") — do not change these without updating that doc first.
const SCAN_MODES = [
  {
    id: "quick" as const,
    icon: SparkleIcon,
    label: "Quick Scan",
    duration: "30 seconds",
    durationMs: 30_000,
    description: "A fast reading — great for a quick check-in.",
  },
  {
    id: "precision" as const,
    icon: TargetIcon,
    label: "Precision Scan",
    duration: "90 seconds",
    durationMs: 90_000,
    description: "Our most accurate reading. Best for tracking trends.",
    badge: "Most accurate",
  },
];

// Grouped from the confirmed step-by-step instructions in
// docs/Scanner.md ("Remove jewelry", "Dry hands", "No lotion", "Place palm
// flat", "Remain still", "Maintain light pressure", "Do not lift hand").
const INSTRUCTIONS = [
  {
    icon: HandIcon,
    title: "Prepare your hand",
    body: "Remove jewelry, and make sure your hand is clean, dry, and free of lotion.",
  },
  {
    icon: TargetIcon,
    title: "Place your palm flat",
    body: "Rest your palm flat on the scanner with light, even pressure.",
  },
  {
    icon: ClockIcon,
    title: "Remain still",
    body: "Hold steady and keep your hand in place until the scan finishes.",
  },
];

export default function ScanInstructionsPage() {
  const router = useRouter();
  const [mode, setMode] = useState<(typeof SCAN_MODES)[number]["id"]>("quick");
  const [agreed, setAgreed] = useState(false);

  function handleStart() {
    const selected = SCAN_MODES.find((m) => m.id === mode)!;
    const params = new URLSearchParams({
      mode: selected.id,
      duration: String(selected.durationMs),
    });
    router.push(`/scan/in-progress?${params.toString()}`);
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Before you scan
          </h1>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            Follow these steps for the most accurate reading.
          </p>
        </div>

        <div className="mt-8 flex justify-center rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
          <HandPlacementIllustration className="h-40 w-auto sm:h-44" />
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold text-slate-900">
            Choose your scan
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {SCAN_MODES.map(({ id, icon: Icon, label, duration, description, badge }, index) => {
              const selected = mode === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
                  aria-pressed={selected}
                  className={
                    "relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors " +
                    (selected
                      ? "border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600"
                      : "border-slate-200 bg-white hover:border-slate-300")
                  }
                >
                  {badge && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-emerald-700 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {badge}
                    </span>
                  )}
                  <span
                    className={
                      "flex h-9 w-9 items-center justify-center rounded-full " +
                      (selected
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-700")
                    }
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="flex items-baseline gap-1.5 text-sm font-semibold text-slate-900">
                      {label}
                      <span className="text-xs font-medium text-slate-400">
                        · {duration}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {INSTRUCTIONS.map(({ icon: Icon, title, body }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
          />
          <span className="text-sm leading-relaxed text-slate-600">
            I have read these instructions and I&apos;m ready to begin.
          </span>
        </label>

        <button
          type="button"
          disabled={!agreed}
          onClick={handleStart}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-1 ring-emerald-700/10 transition-all hover:bg-emerald-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:ring-0"
        >
          Start Scan
        </button>
      </motion.div>
    </div>
  );
}
