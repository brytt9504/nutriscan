"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HandIcon } from "@/components/icons";
import { mockRunScan } from "@/lib/mock-scanner";

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScanInProgressPage() {
  const router = useRouter();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    mockRunScan(setPercent, { durationMs: 6000, signal: controller.signal }).then(
      () => {
        if (!controller.signal.aborted) {
          setTimeout(() => router.push("/scan/processing"), 400);
        }
      },
    );

    return () => controller.abort();
  }, [router]);

  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="#15803d"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.08s linear" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"
          >
            <HandIcon className="h-5 w-5" />
          </motion.span>
          <span className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            {percent}%
          </span>
        </div>
      </div>

      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-slate-900">
        Hold still
      </h1>
      <p className="mt-1.5 max-w-xs text-center text-sm text-slate-500">
        Keep your palm flat on the scanner. This usually takes about two
        minutes.
      </p>
    </div>
  );
}
