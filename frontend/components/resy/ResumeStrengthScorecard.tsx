"use client";

import type { AnalysisResult } from "@/lib/types";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeStrengthScorecardProps {
  result: AnalysisResult;
}

const BREAKDOWN_COLORS = [
  { key: "Skill Match (40%)", color: "var(--primary)", textColor: "text-primary" },
  { key: "Projects Relevance (25%)", color: "var(--score-excellent)", textColor: "text-emerald-600 dark:text-emerald-400" },
  { key: "Experience Keywords (20%)", color: "var(--score-fair)", textColor: "text-amber-600 dark:text-amber-400" },
  { key: "Length & Formatting (15%)", color: "var(--chart-5)", textColor: "text-violet-600 dark:text-violet-400" },
] as const;

const WEIGHTS: Record<string, number> = {
  "Skill Match (40%)": 40,
  "Projects Relevance (25%)": 25,
  "Experience Keywords (20%)": 20,
  "Length & Formatting (15%)": 15,
};

function getScoreClass(score: number): string {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 65) return "text-primary";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

export function ResumeStrengthScorecard({ result }: ResumeStrengthScorecardProps) {
  const { total_score, breakdown } = result.resume_strength_scorecard;
  const totalClass = getScoreClass(total_score);

  return (
    <section aria-labelledby="scorecard-heading" className="w-full">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-primary" />
          <h2 id="scorecard-heading" className="text-lg font-semibold text-foreground">
            Resume Strength Scorecard
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Total score circle */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90" aria-hidden="true">
                <circle cx="64" cy="64" r="52" fill="none" stroke="var(--border)" strokeWidth="10" />
                <circle
                  cx="64" cy="64" r="52"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(total_score / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                  style={{ transition: "stroke-dasharray 1s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-2xl font-bold tabular-nums", totalClass)}>
                  {total_score.toFixed(0)}
                </span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">Overall Strength</span>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            {BREAKDOWN_COLORS.map(({ key, color, textColor }) => {
              const rawScore = breakdown[key as keyof typeof breakdown] ?? 0;
              const weight = WEIGHTS[key] ?? 100;
              const percentage = (rawScore / weight) * 100;

              return (
                <div key={key} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{key}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-sm font-bold tabular-nums", textColor)}>
                        {rawScore.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">/ {weight}</span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: color }}
                      role="progressbar"
                      aria-valuenow={rawScore}
                      aria-valuemin={0}
                      aria-valuemax={weight}
                      aria-label={`${key}: ${rawScore.toFixed(1)} of ${weight}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
