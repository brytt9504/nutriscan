"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChevronLeftIcon } from "@/components/icons";
import ScanStepper from "@/components/scan/ScanStepper";
import { useAuth } from "@/lib/auth-context";

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "signed-out") {
      router.replace(`/sign-in?next=${encodeURIComponent(pathname)}`);
    }
  }, [status, pathname, router]);

  if (status !== "signed-in") {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24 text-sm text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <div className="border-b border-slate-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center gap-4 sm:gap-8">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Exit
          </Link>
          <ScanStepper />
        </div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
