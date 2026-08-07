"use client";

import { useId } from "react";
import { motion } from "framer-motion";

// The shared visual core of the NutriScore gauge — just the spectrum arc
// and the needle, nothing else. Both NutriScoreGauge (full, results page)
// and NutriScoreGaugeCompact (homepage) render this so the arc/needle stay
// pixel-identical between the two; only the text around it differs.
//
// The arc is a fixed red → orange → yellow → green → yellow → orange → red
// spectrum spanning the full 0-100 range — it never fills/animates in
// proportion to the score, because a filling bar implies "more is always
// better," which isn't true here (both too low AND too high are red). Only
// the needle moves, like a real analog instrument settling on a reading.
// The green "optimal" band is deliberately widened (a flat plateau, not
// just a single point) so the target zone reads clearly at a glance.

type NutriScoreGaugeArcProps = {
  score: number;
  className?: string;
};

const CX = 120;
const CY = 122;
const RADIUS = 98;
const STROKE_WIDTH = 18;
const VIEW_WIDTH = 240;
const VIEW_HEIGHT = 148;
// ~22% shorter than the arc's inner edge (previously reached ~83) — a
// shorter needle with a larger hub reads as a premium instrument rather
// than a speedometer.
const NEEDLE_LENGTH = 65;

function angleForScore(score: number) {
  // 0 -> 180deg (left), 50 -> 90deg (top), 100 -> 0deg (right)
  return 180 - score * 1.8;
}

function pointForScore(score: number, radius: number) {
  const rad = (angleForScore(score) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY - radius * Math.sin(rad),
  };
}

export default function NutriScoreGaugeArc({ score, className = "" }: NutriScoreGaugeArcProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const gradientId = useId();

  const arcStart = pointForScore(0, RADIUS);
  const arcEnd = pointForScore(100, RADIUS);
  const needleTip = pointForScore(clampedScore, NEEDLE_LENGTH);
  const needleRestTip = pointForScore(0, NEEDLE_LENGTH);

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={`w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="15%" stopColor="#f97316" />
          <stop offset="32%" stopColor="#f59e0b" />
          <stop offset="48%" stopColor="#eab308" />
          <stop offset="64%" stopColor="#84cc16" />
          {/* Widened green plateau — 72%-88% is a flat, obvious "optimal" band */}
          <stop offset="72%" stopColor="#16a34a" />
          <stop offset="80%" stopColor="#16a34a" />
          <stop offset="88%" stopColor="#16a34a" />
          <stop offset="94%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>

      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${RADIUS} ${RADIUS} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />

      <motion.line
        initial={{ x2: needleRestTip.x, y2: needleRestTip.y }}
        animate={{ x2: needleTip.x, y2: needleTip.y }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        x1={CX}
        y1={CY}
        stroke="#0f172a"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={CX} cy={CY} r={12} fill="#0f172a" />
      <circle cx={CX} cy={CY} r={4.5} fill="#ffffff" />
    </svg>
  );
}
