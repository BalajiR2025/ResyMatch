"use client";

import { useRef, useState, useCallback } from "react";
import { FileText, Upload, X, Loader2, Sparkles, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputSectionProps {
  onAnalyze: (file: File, jobDescription: string) => Promise<void>;
  isLoading: boolean;
}

export function InputSection({ onAnalyze, isLoading }: InputSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAnalyze = file !== null && jobDescription.trim().length > 0 && !isLoading;

  const handleFile = useCallback((f: File) => {
    setFileError(null);
    if (f.type !== "application/pdf") {
      setFileError("Only PDF files are accepted.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setFileError("File size must be under 10 MB.");
      return;
    }
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!canAnalyze || !file) return;
    onAnalyze(file, jobDescription);
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          AI-Powered Resume Analysis
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4 text-balance">
          Match your resume to any job
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Get instant ATS compatibility scores, skill gap analysis, and personalized recommendations to land your dream job.
        </p>
      </div>

      {/* Input cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upload card */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Resume PDF
          </label>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload resume PDF"
            onClick={() => !file && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onKeyDown={(e) => e.key === "Enter" && !file && fileInputRef.current?.click()}
            className={cn(
              "relative flex flex-col items-center justify-center min-h-[220px] rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : file
                ? "border-primary/40 bg-primary/5 cursor-default"
                : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="sr-only"
              onChange={handleInputChange}
            />

            {file ? (
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground truncate max-w-[240px]">{file.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {isDragging ? "Drop your file here" : "Drop your resume here"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  PDF only, max 10MB
                </span>
              </div>
            )}
          </div>
          {fileError && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
              {fileError}
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="flex flex-col gap-3">
          <label htmlFor="job-description" className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Job Description
          </label>
          <div className="relative flex-1">
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here for the best analysis results..."
              className={cn(
                "w-full h-full min-h-[220px] resize-none rounded-2xl border bg-card text-foreground",
                "placeholder:text-muted-foreground px-4 py-4 text-sm leading-relaxed",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all",
                "border-border hover:border-primary/30"
              )}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {jobDescription.length > 0 ? `${jobDescription.length} characters` : "Paste the full JD for best results"}
            </span>
            {jobDescription.length > 0 && (
              <button
                onClick={() => setJobDescription("")}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={!canAnalyze}
          className={cn(
            "flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200",
            canAnalyze
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 active:scale-[0.98]"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
          aria-busy={isLoading}
          aria-disabled={!canAnalyze}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Resume
            </>
          )}
        </button>
        
        {(!file || !jobDescription) && !isLoading && (
          <p className="text-sm text-muted-foreground">
            {!file && !jobDescription
              ? "Upload your resume and paste a job description to get started"
              : !file
              ? "Upload your resume to continue"
              : "Paste a job description to continue"}
          </p>
        )}
      </div>
    </section>
  );
}
