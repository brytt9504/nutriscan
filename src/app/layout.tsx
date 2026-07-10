import type { Metadata } from "next";
import "./globals.css";

// Using the system font stack (configured in globals.css) instead of
// next/font/google. This avoids a build-time fetch to Google Fonts —
// one less external dependency that can flake during a Vercel build —
// and system fonts render instantly with no layout shift. Swap in a
// branded font here once NutriScan's design system is finalized.

export const metadata: Metadata = {
  title: "NutriScan",
  description: "NutriScan — clinical vitality scanning, powered by Biozoom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
