"use client";

import type { AnalysisResult } from "@/lib/types";
import { ATSScoreCard } from "./ATSScoreCard";
import { SkillMatchSection } from "./SkillMatchSection";
import { SimilarityScoreCard } from "./SimilarityScoreCard";
import { ResumeStrengthScorecard } from "./ResumeStrengthScorecard";
import { SuggestionsSection } from "./SuggestionsSection";
import { LearningRoadmap } from "./LearningRoadmap";
import { ScoreExplanations } from "./ScoreExplanations";
import { RotateCcw } from "lucide-react";

interface ResultsContainerProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsContainer({ result, onReset }: ResultsContainerProps) {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Analysis Results</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your resume has been analyzed against the job description
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-muted transition-all duration-150"
          aria-label="Start a new analysis"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New Analysis
        </button>
      </div>

      {/* Section 1: ATS Score + Placement — highest priority */}
      <ATSScoreCard result={result} />

      {/* Section 2: Skill Match */}
      <SkillMatchSection result={result} />

      {/* Section 3: Similarity Score */}
      <SimilarityScoreCard result={result} />

      {/* Section 4: Resume Strength Scorecard */}
      <ResumeStrengthScorecard result={result} />

      {/* Section 5: Suggestions */}
      <SuggestionsSection result={result} />

      {/* Section 6: Learning Roadmap */}
      <LearningRoadmap result={result} />

      {/* Section 7: Score Explanations */}
      <ScoreExplanations result={result} />
    </div>
  );
}
