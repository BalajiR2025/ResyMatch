"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionsSectionProps {
  result: AnalysisResult;
}

export function SuggestionsSection({ result }: SuggestionsSectionProps) {
  const { resume_suggestions } = result;
  const INITIAL_COUNT = 3;
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? resume_suggestions : resume_suggestions.slice(0, INITIAL_COUNT);
  const hasMore = resume_suggestions.length > INITIAL_COUNT;

  return (
    <section aria-labelledby="suggestions-heading" className="w-full">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            <h2 id="suggestions-heading" className="text-lg font-semibold text-foreground">
              Resume Improvement Suggestions
            </h2>
          </div>
          <span className="text-xs text-muted-foreground px-2.5 py-1 bg-muted rounded-full">
            {resume_suggestions.length} suggestions
          </span>
        </div>

        <ol className="flex flex-col gap-3" aria-label="Resume improvement suggestions">
          {visible.map((suggestion, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-muted/30",
                "hover:bg-muted/50 transition-colors duration-150"
              )}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{suggestion}</p>
            </li>
          ))}
        </ol>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mx-auto"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show fewer
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                View {resume_suggestions.length - INITIAL_COUNT} more suggestions
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
