"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/icons";
import NutriScoreRing from "@/components/NutriScoreRing";
import { useAuth } from "@/lib/auth-context";
import { mockSaveScanResult } from "@/lib/mock-scanner";
import { getScoreStatus } from "@/lib/score";

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
  const delta = Number(searchParams.get("delta") ?? 3);
  const status = getScoreStatus(score);

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

  // Authentication happens after the result, not before it — see
  // scan/layout.tsx. A returning signed-in user's result is saved without
  // asking again; a signed-out visitor is offered sign-in/sign-up, which
  // brings them right back here (via `next=`) once they've done so, and the
  // save then happens automatically too.
  const { status: authStatus, user } = useAuth();
  const savedRef = useRef(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (authStatus !== "signed-in" || savedRef.current) return;
    savedRef.current = true;
    mockSaveScanResult({ score, delta, capturedAt: new Date().toISOString() });
    setSaved(true);
  }, [authStatus, score, delta]);

  const resultsUrl = `/scan/results?${new URLSearchParams({
    score: String(score),
    delta: String(delta),
  }).toString()}`;
  const nextParam = `?next=${encodeURIComponent(resultsUrl)}`;

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

        {authStatus === "signed-in" ? (
          <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-800">
            <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-700" />
            {saved
              ? `Saved to ${user?.name ?? "your"} history`
              : "Saving to your history…"}
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-900">
              Save this result
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Sign in or create a free account to save this scan and track
              your NutriScore over time.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href={`/sign-in${nextParam}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
              >
                Sign in
              </Link>
              <Link
                href={`/sign-up${nextParam}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Create account
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/history"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800"
          >
            View your history
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/scan/welcome"
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
