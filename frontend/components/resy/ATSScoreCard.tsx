"use client";

import { useMemo } from "react";
import type { AnalysisResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrendingUp, Target, Info } from "lucide-react";

interface ATSScoreCardProps {
  result: AnalysisResult;
}

type Band = "Excellent" | "Good" | "Fair" | "Poor";

const BAND_CONFIG: Record<Band, { label: string; colorClass: string; gaugeColor: string; bgClass: string; borderClass: string }> = {
  Excellent: {
    label: "Excellent",
    colorClass: "text-emerald-600 dark:text-emerald-400",
    gaugeColor: "var(--score-excellent)",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    borderClass: "border-emerald-200 dark:border-emerald-800/50",
  },
  Good: {
    label: "Good",
    colorClass: "text-teal-600 dark:text-teal-400",
    gaugeColor: "var(--primary)",
    bgClass: "bg-teal-50 dark:bg-teal-950/40",
    borderClass: "border-teal-200 dark:border-teal-800/50",
  },
  Fair: {
    label: "Fair",
    colorClass: "text-amber-600 dark:text-amber-400",
    gaugeColor: "var(--score-fair)",
    bgClass: "bg-amber-50 dark:bg-amber-950/40",
    borderClass: "border-amber-200 dark:border-amber-800/50",
  },
  Poor: {
    label: "Poor",
    colorClass: "text-rose-600 dark:text-rose-400",
    gaugeColor: "var(--score-poor)",
    bgClass: "bg-rose-50 dark:bg-rose-950/40",
    borderClass: "border-rose-200 dark:border-rose-800/50",
  },
};

const PLACEMENT_CONFIG: Record<string, { colorClass: string; bgClass: string }> = {
  High: { colorClass: "text-emerald-600 dark:text-emerald-400", bgClass: "bg-emerald-50 dark:bg-emerald-950/40" },
  Medium: { colorClass: "text-teal-600 dark:text-teal-400", bgClass: "bg-teal-50 dark:bg-teal-950/40" },
  Low: { colorClass: "text-amber-600 dark:text-amber-400", bgClass: "bg-amber-50 dark:bg-amber-950/40" },
  "Very Low": { colorClass: "text-rose-600 dark:text-rose-400", bgClass: "bg-rose-50 dark:bg-rose-950/40" },
};

function CircularGauge({ percent, color, size = 180 }: { percent: number; color: string; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (percent / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]" aria-hidden="true">
      {/* Background track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth={12}
        strokeLinecap="round"
      />
      {/* Progress arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={`${strokeDash} ${circumference}`}
        style={{ transition: "stroke-dasharray 1s ease-out" }}
      />
    </svg>
  );
}

export function ATSScoreCard({ result }: ATSScoreCardProps) {
  const band = result.ats_quality_band as Band;
  const config = BAND_CONFIG[band] ?? BAND_CONFIG.Fair;

  const placementChance = useMemo(() => {
    const p = result.placement_probability;
    if (p.toLowerCase().startsWith("high")) return "High";
    if (p.toLowerCase().startsWith("medium")) return "Medium";
    if (p.toLowerCase().startsWith("very low")) return "Very Low";
    return "Low";
  }, [result.placement_probability]);

  const placementStyle = PLACEMENT_CONFIG[placementChance] ?? PLACEMENT_CONFIG.Low;

  return (
    <section aria-labelledby="ats-heading" className="w-full">
      <div className={cn("rounded-2xl border p-6 md:p-8", config.bgClass, config.borderClass)}>
        <div className="flex items-center gap-2 mb-6">
          <Target className={cn("w-5 h-5", config.colorClass)} />
          <h2 id="ats-heading" className="text-lg font-semibold text-foreground">
            ATS Score &amp; Placement Probability
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Circular Gauge */}
          <div className="relative flex-shrink-0">
            <CircularGauge percent={result.ats_score_percent} color={config.gaugeColor} size={180} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-4xl font-bold tabular-nums", config.colorClass)}>
                {result.ats_score_percent.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground mt-1 font-medium">ATS Score</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            {/* Band Badge */}
            <div className="flex items-center gap-3">
              <span className={cn("text-2xl font-bold", config.colorClass)}>{config.label}</span>
              <span className={cn("text-xs px-2.5 py-1 rounded-full font-semibold border", config.bgClass, config.borderClass, config.colorClass)}>
                Quality Band
              </span>
            </div>

            {/* Placement */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <TrendingUp className="w-4 h-4" />
                Placement Probability
              </div>
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-xl text-base font-bold w-fit", placementStyle.bgClass, placementStyle.colorClass)}>
                {result.placement_probability}
              </div>
            </div>

            {/* ATS Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>ATS Score</span>
                <span>{result.ats_score_percent.toFixed(1)} / 100</span>
              </div>
              <div className="h-2.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.ats_score_percent}%`, backgroundColor: config.gaugeColor }}
                  role="progressbar"
                  aria-valuenow={result.ats_score_percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`ATS Score: ${result.ats_score_percent.toFixed(1)}%`}
                />
              </div>
            </div>

            {/* Selection Summary */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/50 border border-border">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.selection_summary.message}
              </p>
            </div>
          </div>
        </div>

        {/* Score scale legend */}
        <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap gap-3 justify-center md:justify-start">
          {(["Excellent", "Good", "Fair", "Poor"] as Band[]).map((b) => {
            const dotColors: Record<Band, string> = {
              Excellent: "bg-emerald-500",
              Good: "bg-teal-500",
              Fair: "bg-amber-500",
              Poor: "bg-rose-500",
            };
            return (
            <div key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={cn("w-2.5 h-2.5 rounded-full", dotColors[b])} />
              <span className={b === band ? "text-foreground font-semibold" : ""}>{b}</span>
              <span className="text-muted-foreground/60">
                {b === "Excellent" ? "80+" : b === "Good" ? "65-79" : b === "Fair" ? "50-64" : "<50"}
              </span>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
