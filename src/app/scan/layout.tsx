import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import ScanStepper from "@/components/scan/ScanStepper";

// Shared chrome for the whole scanner flow: Welcome → System Check →
// Instructions → Scan → Processing → Results. No auth gate here — signing
// in only happens after Results, when there's an actual scan to save (see
// scan/results/page.tsx), so every screen up to and including Results is
// open to signed-out visitors.
export default function ScanLayout({ children }: { children: React.ReactNode }) {
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
