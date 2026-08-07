"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClockIcon,
  HandIcon,
  NonInvasiveIcon,
  SparkleIcon,
} from "@/components/icons";

const INSTRUCTIONS = [
  {
    icon: HandIcon,
    title: "Clean, bare skin",
    body: "Remove rings and nail polish, and make sure your hand is clean and dry.",
  },
  {
    icon: ClockIcon,
    title: "About 2 minutes",
    body: "Hold still with your palm resting flat on the scanner for the full measurement.",
  },
  {
    icon: NonInvasiveIcon,
    title: "Completely non-invasive",
    body: "No needles, no blood draw — just a beam of light measuring carotenoids in your skin.",
  },
];

export default function ScanInstructionsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <SparkleIcon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Before you scan
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            A few quick things to know before we connect to your scanner.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {INSTRUCTIONS.map(({ icon: Icon, title, body }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
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
          onClick={() => router.push("/scan/in-progress")}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          I&apos;m ready
        </button>
      </motion.div>
    </div>
  );
}
