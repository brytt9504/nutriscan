"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BluetoothIcon, CheckCircleIcon } from "@/components/icons";
import { CONNECT_STEPS, mockConnectScanner } from "@/lib/mock-scanner";

export default function ScanConnectPage() {
  const router = useRouter();
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    mockConnectScanner(
      (index) => {
        setCompletedCount(index + 1);
      },
      { signal: controller.signal },
    ).then(() => {
      if (!controller.signal.aborted) {
        setTimeout(() => router.push("/scan/in-progress"), 500);
      }
    });

    return () => controller.abort();
  }, [router]);

  const isConnected = completedCount >= CONNECT_STEPS.length;

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          {!isConnected && (
            <motion.span
              className="absolute inset-0 rounded-full bg-emerald-200"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span
            className={
              "relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-sm transition-colors " +
              (isConnected ? "bg-emerald-700" : "bg-emerald-600")
            }
          >
            {isConnected ? (
              <CheckCircleIcon className="h-9 w-9" />
            ) : (
              <BluetoothIcon className="h-9 w-9" />
            )}
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
          {isConnected ? "Scanner connected" : "Connecting to your scanner"}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          {isConnected
            ? "Starting your scan…"
            : "Make sure your NutriScan scanner is powered on and nearby."}
        </p>

        <ul className="mt-8 flex flex-col gap-2.5 text-left">
          <AnimatePresence initial={false}>
            {CONNECT_STEPS.slice(0, completedCount)
              .slice()
              .reverse()
              .map((step) => (
                <motion.li
                  key={step.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3"
                >
                  <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {step.label}
                    </p>
                    <p className="text-xs text-slate-500">{step.detail}</p>
                  </div>
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
