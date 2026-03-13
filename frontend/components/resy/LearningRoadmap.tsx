"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import { Map, ExternalLink, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningRoadmapProps {
  result: AnalysisResult;
}

function getDomainLabel(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1);
  } catch {
    return "Resource";
  }
}

export function LearningRoadmap({ result }: LearningRoadmapProps) {
  const { learning_roadmap } = result;
  const skills = Object.entries(learning_roadmap);
  const INITIAL_OPEN = 3;

  const [openSkills, setOpenSkills] = useState<Set<string>>(
    new Set(skills.slice(0, INITIAL_OPEN).map(([k]) => k))
  );

  const toggleSkill = (skill: string) => {
    setOpenSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  };

  if (skills.length === 0) return null;

  return (
    <section aria-labelledby="roadmap-heading" className="w-full">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            <h2 id="roadmap-heading" className="text-lg font-semibold text-foreground">
              Learning Roadmap
            </h2>
          </div>
          <span className="text-xs text-muted-foreground px-2.5 py-1 bg-muted rounded-full">
            {skills.length} skills to learn
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {skills.map(([skillName, data], idx) => {
            const isOpen = openSkills.has(skillName);
            return (
              <div
                key={skillName}
                className="rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleSkill(skillName)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-colors text-left"
                  aria-expanded={isOpen}
                  aria-controls={`roadmap-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-semibold text-foreground text-sm">{skillName}</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{data.level.split("→")[0].trim()}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span>{data.level.split("→")[1]?.trim() ?? data.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {data.suggested_resources.length} resources
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div id={`roadmap-${idx}`} className="px-5 pb-4 border-t border-border/50 bg-muted/20">
                    <div className="flex flex-col gap-2 pt-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Suggested Resources
                      </p>
                      {data.suggested_resources.map((url, rIdx) => (
                        <a
                          key={rIdx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg",
                            "bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5",
                            "text-sm text-foreground hover:text-primary transition-all duration-150 group"
                          )}
                        >
                          <span className="w-6 h-6 flex-shrink-0 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                            {rIdx + 1}
                          </span>
                          <span className="flex-1 truncate font-medium">{getDomainLabel(url)}</span>
                          <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[200px]">
                            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
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
