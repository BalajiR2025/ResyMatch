"use client";

import { useState } from "react";
import { InputSection } from "@/components/resy/InputSection";
import { ResultsContainer } from "@/components/resy/ResultsContainer";
import { ThemeToggle } from "@/components/resy/ThemeToggle";
import { ResyMatchLogo } from "@/components/resy/ResyMatchLogo";
import type { AnalysisResult } from "@/lib/types";
import { MOCK_RESULT } from "@/lib/mock-data";
import { AlertCircle, X, RotateCcw } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File, jobDescription: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (API_BASE) {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("job_description", jobDescription);

        const res = await fetch(`${API_BASE}/api/analyze/`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const msg = await res.text().catch(() => "Unknown error");
          throw new Error(`Analysis failed (${res.status}): ${msg}`);
        }

        const data: AnalysisResult = await res.json();
        setResult(data);
      } else {
        await new Promise((r) => setTimeout(r, 2200));
        setResult(MOCK_RESULT);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <ResyMatchLogo size={36} />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-base leading-tight">ResyMatch</span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">AI Resume Analyzer</span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">New Analysis</span>
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-8 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-foreground"
            >
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Analysis Failed</p>
                <p className="text-sm text-muted-foreground mt-0.5">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input or Results */}
          {!result ? (
            <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
          ) : (
            <ResultsContainer result={result} onReset={handleReset} />
          )}

          {/* Demo notice */}
          {!API_BASE && !result && !isLoading && (
            <p className="mt-10 text-center text-xs text-muted-foreground">
              Demo mode{" "}
              <span className="mx-1 text-border">|</span>
              Set <code className="font-mono text-[10px] bg-secondary px-1.5 py-0.5 rounded">NEXT_PUBLIC_API_BASE_URL</code> to connect backend
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ResyMatchLogo size={20} />
            <span className="text-sm font-medium text-foreground">ResyMatch</span>
          </div>
          <p className="text-xs text-muted-foreground">
            ATS scoring powered by TF-IDF and NLP
          </p>
        </div>
      </footer>
    </div>
  );
}
