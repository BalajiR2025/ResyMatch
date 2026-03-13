"use client";

import type { AnalysisResult } from "@/lib/types";
import { GitCompare } from "lucide-react";

interface SimilarityScoreCardProps {
  result: AnalysisResult;
}

export function SimilarityScoreCard({ result }: SimilarityScoreCardProps) {
  const score = result.similarity_score_percent;

  const getColor = (s: number) => {
    if (s >= 80) return { text: "text-emerald-600 dark:text-emerald-400", bg: "var(--score-excellent)" };
    if (s >= 65) return { text: "text-primary", bg: "var(--primary)" };
    if (s >= 50) return { text: "text-amber-600 dark:text-amber-400", bg: "var(--score-fair)" };
    return { text: "text-rose-600 dark:text-rose-400", bg: "var(--score-poor)" };
  };

  const color = getColor(score);

  return (
    <section aria-labelledby="similarity-heading" className="w-full">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <GitCompare className="w-5 h-5 text-primary" />
          <h2 id="similarity-heading" className="text-lg font-semibold text-foreground">
            Similarity Score
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className={`text-5xl font-bold tabular-nums ${color.text}`}>
              {score.toFixed(1)}%
            </span>
            <span className="text-sm text-muted-foreground">TF-IDF Cosine Similarity</span>
          </div>

          <div className="flex-1 w-full">
            <div className="h-3 rounded-full bg-border overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${score}%`, backgroundColor: color.bg }}
                role="progressbar"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Similarity score: ${score.toFixed(1)}%`}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50% threshold</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.score_explanations.similarity_score}
          </p>
        </div>
      </div>
    </section>
  );
}
