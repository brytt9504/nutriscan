// Maps a NutriScore (0-100) to a human-readable status label.
//
// This is the single source of truth for score → label — always derive the
// label from the score with this function rather than storing/passing a
// separate free-text status string, which is how a score of 88 previously
// ended up displayed as "Excellent" (90+) in the mock history data.
//
// Prototype-only thresholds, not derived from any published carotenoid
// scoring guidance. Revisit once a real scoring rubric is confirmed.

export type ScoreStatus = "Excellent" | "Good" | "Fair" | "Needs improvement";

export function getScoreStatus(score: number): ScoreStatus {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  return "Needs improvement";
}
