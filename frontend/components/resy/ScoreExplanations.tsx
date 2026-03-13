"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreExplanationsProps {
  result: AnalysisResult;
}

interface ExplanationItem {
  title: string;
  content: string;
  badge: string;
  badgeClass: string;
}

export function ScoreExplanations({ result }: ScoreExplanationsProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["ats"]));

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const items: ExplanationItem[] = [
    {
      title: "ATS Score",
      content: result.score_explanations.ats_score,
      badge: `${result.ats_score_percent.toFixed(1)}%`,
      badgeClass: "bg-primary/10 text-primary border-primary/25",
    },
    {
      title: "Skill Match",
      content: result.score_explanations.skills,
      badge: `${result.match_breakdown.skills_match_percentage.toFixed(0)}%`,
      badgeClass: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    },
    {
      title: "Similarity Score",
      content: result.score_explanations.similarity_score,
      badge: `${result.similarity_score_percent.toFixed(1)}%`,
      badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    },
  ];

  const keys = ["ats", "skills", "similarity"];

  return (
    <section aria-labelledby="explanations-heading" className="w-full">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 id="explanations-heading" className="text-lg font-semibold text-foreground">
            Score Explanations
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, idx) => {
            const key = keys[idx];
            const isOpen = openItems.has(key);
            return (
              <div key={key} className="rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-colors text-left"
                  aria-expanded={isOpen}
                  aria-controls={`explanation-${key}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground text-sm">{item.title}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold border", item.badgeClass)}>
                      {item.badge}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div
                    id={`explanation-${key}`}
                    className="px-5 pb-4 pt-1 border-t border-border/50 bg-muted/20"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
