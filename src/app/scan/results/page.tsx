"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/icons";
import NutriScoreRing from "@/components/NutriScoreRing";

export default function ScanResultsPage() {
  return (
    <Suspense fallback={null}>
      <ScanResults />
    </Suspense>
  );
}

function ScanResults() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") ?? 91);
  const status = searchParams.get("status") || "Excellent";
  const delta = Number(searchParams.get("delta") ?? 3);

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.1,
      delay: 0.3,
      ease: "easeOut",
      onUpdate: (value) => setDisplayScore(Math.round(value)),
    });
    return () => controls.stop();
  }, [score]);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md text-center"
      >
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircleIcon className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Scan complete
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Here&apos;s your NutriScore from today.
        </p>

        <div className="mt-8 flex justify-center">
          <NutriScoreRing
            score={displayScore}
            status={status}
            delta={delta}
            size={220}
            showSampleTag={false}
          />
        </div>

        <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-slate-600">
          Your score suggests strong carotenoid status consistent with a diet
          rich in colorful fruits and vegetables. Keep it up.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/history"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800"
          >
            View your history
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/scan"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Scan again
          </Link>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-slate-400 hover:text-slate-600"
        >
          Done for now
        </Link>
      </motion.div>
    </div>
  );
}
