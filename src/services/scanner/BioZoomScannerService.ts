import type {
  HistoryEntry,
  ScanResult,
  ScannerService,
  SystemCheckDefinition,
} from "./ScannerService";

// Placeholder for the real BioZoom SDK integration. No protocol logic
// lives here yet — every method throws so this can be built out
// incrementally and swapped in via index.ts once ready, without changing
// the ScannerService contract or any page that depends on it.
//
// Per CLAUDE.md: never invent or modify scanner protocol behavior. Real
// implementations of these methods must be based on confirmed BioZoom SDK
// behavior (packages/biozoom-sdk), not guessed here.
export class BioZoomScannerService implements ScannerService {
  getSystemChecks(): SystemCheckDefinition[] {
    throw new Error("Not implemented");
  }

  runSystemChecks(): Promise<boolean> {
    throw new Error("Not implemented");
  }

  connect(): Promise<void> {
    throw new Error("Not implemented");
  }

  disconnect(): Promise<void> {
    throw new Error("Not implemented");
  }

  startScan(): Promise<void> {
    throw new Error("Not implemented");
  }

  cancel(): Promise<void> {
    throw new Error("Not implemented");
  }

  analyzeScan(): Promise<ScanResult> {
    throw new Error("Not implemented");
  }

  getHistory(): HistoryEntry[] {
    throw new Error("Not implemented");
  }

  saveResult(): void {
    throw new Error("Not implemented");
  }
}
