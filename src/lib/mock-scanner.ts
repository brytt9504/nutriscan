// Placeholder scanner "API" for UI prototyping only.
//
// This does NOT talk to hardware, WebUSB, or the BioZoom protocol in any
// way — it exists so the scan-flow screens have something to call while the
// real integration (packages/biozoom-sdk) is built separately. Nothing here
// encodes real device behavior; timings and steps are illustrative UX
// pacing, not confirmed protocol facts. See CLAUDE.md — this file must never
// be treated as a source of truth for real scanner behavior.

export type ConnectStep = {
  label: string;
  detail: string;
};

export const CONNECT_STEPS: ConnectStep[] = [
  { label: "Searching for scanner", detail: "Looking for a nearby NutriScan device" },
  { label: "Device found", detail: "NutriScan Scanner · SN-08213" },
  { label: "Pairing", detail: "Establishing a secure connection" },
  { label: "Connected", detail: "Ready to scan" },
];

export type MockScanResult = {
  score: number;
  status: string;
  delta: number;
  capturedAt: string;
};

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// Walks through CONNECT_STEPS, invoking onStep after each one "completes".
export async function mockConnectScanner(
  onStep: (index: number, step: ConnectStep) => void,
  { signal }: { signal?: AbortSignal } = {},
) {
  for (let i = 0; i < CONNECT_STEPS.length; i += 1) {
    await wait(650);
    if (signal?.aborted) return;
    onStep(i, CONNECT_STEPS[i]);
  }
}

// Reports progress from 0-100 over roughly `durationMs`.
export async function mockRunScan(
  onProgress: (percent: number) => void,
  { durationMs = 6000, signal }: { durationMs?: number; signal?: AbortSignal } = {},
) {
  const stepMs = 80;
  const steps = Math.ceil(durationMs / stepMs);
  for (let i = 1; i <= steps; i += 1) {
    await wait(stepMs);
    if (signal?.aborted) return;
    onProgress(Math.min(100, Math.round((i / steps) * 100)));
  }
}

// Simulates server-side analysis and returns an illustrative result.
// Not derived from any real measurement — display-only sample data.
export async function mockAnalyzeScan({
  signal,
}: { signal?: AbortSignal } = {}): Promise<MockScanResult> {
  await wait(1800);
  if (signal?.aborted) {
    return { score: 0, status: "", delta: 0, capturedAt: "" };
  }
  return {
    score: 91,
    status: "Excellent",
    delta: 3,
    capturedAt: new Date().toISOString(),
  };
}

export type MockHistoryEntry = {
  id: string;
  date: string;
  score: number;
  status: string;
};

// Sample-only scan history for the /history placeholder screen.
export const MOCK_SCAN_HISTORY: MockHistoryEntry[] = [
  { id: "scan-4", date: "Today", score: 91, status: "Excellent" },
  { id: "scan-3", date: "3 weeks ago", score: 88, status: "Excellent" },
  { id: "scan-2", date: "7 weeks ago", score: 84, status: "Good" },
  { id: "scan-1", date: "11 weeks ago", score: 79, status: "Good" },
];
