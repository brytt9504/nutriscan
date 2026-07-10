export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
          NutriScan
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Clinical vitality scanning
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          This is an infrastructure placeholder. The patient result experience,
          scan history, and clinician dashboard are being built next.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-slate-500">
          <p>
            Powered by{" "}
            <span className="font-medium text-slate-700">Biozoom</span>
          </p>
        </div>
      </div>
    </div>
  );
}
