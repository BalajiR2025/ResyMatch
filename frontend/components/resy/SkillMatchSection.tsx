"use client";

import type { AnalysisResult } from "@/lib/types";
import { CheckCircle2, XCircle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillMatchSectionProps {
  result: AnalysisResult;
}

export function SkillMatchSection({ result }: SkillMatchSectionProps) {
  const { match_breakdown, matched_skills, missing_skills } = result;
  const pct = match_breakdown.skills_match_percentage;

  return (
    <section aria-labelledby="skill-match-heading" className="w-full">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-primary" />
          <h2 id="skill-match-heading" className="text-lg font-semibold text-foreground">
            Skill Match Breakdown
          </h2>
        </div>

        {/* Overview stats */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col gap-0.5 px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {match_breakdown.matched_skill_count}
            </span>
            <span className="text-xs text-muted-foreground">Matched Skills</span>
          </div>
          <div className="flex flex-col gap-0.5 px-5 py-3 rounded-xl bg-destructive/10 border border-destructive/25">
            <span className="text-2xl font-bold text-destructive-foreground">
              {match_breakdown.missing_skill_count}
            </span>
            <span className="text-xs text-muted-foreground">Missing Skills</span>
          </div>
          <div className="flex flex-col gap-0.5 px-5 py-3 rounded-xl bg-muted border border-border">
            <span className="text-2xl font-bold text-foreground">
              {match_breakdown.total_required_skills}
            </span>
            <span className="text-xs text-muted-foreground">Total Required</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              {match_breakdown.matched_skill_count} / {match_breakdown.total_required_skills} skills matched
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{pct.toFixed(0)}%</span>
          </div>
          <div className="h-3 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 bg-emerald-500"
              style={{
                width: `${pct}%`,
              }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${pct.toFixed(0)}% skill match`}
            />
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matched */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-foreground">
                Matched Skills
                <span className="ml-2 text-xs font-normal text-muted-foreground">({matched_skills.length})</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {matched_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <h3 className="text-sm font-semibold text-foreground">
                Missing Skills
                <span className="ml-2 text-xs font-normal text-muted-foreground">({missing_skills.length})</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
