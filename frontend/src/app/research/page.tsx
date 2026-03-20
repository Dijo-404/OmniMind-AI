"use client";

import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Search,
  Loader2,
  BookOpen,
  FileText,
  BarChart,
  Lightbulb,
  CheckCircle,
  Target,
} from "lucide-react";

import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleResearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await apiClient.autonomousResearch(query);
      setResult(data);
    } catch (error) {
      console.error("Research failed:", error);
      toast.error("Research unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Autonomous Research Agent
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deep analysis on complex topics with evidence-based insights and
            recommendations.
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter research topic or question..."
              className="w-full bg-secondary border border-border rounded-2xl px-6 py-5 text-foreground pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg shadow-2xl"
            />
            <button
              onClick={handleResearch}
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 rounded-xl font-semibold flex items-center justify-center transition-all active:scale-95 shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-secondary/40 border border-border rounded-3xl overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-700 shadow-2xl">
            <div className="bg-gradient-to-r from-purple-900/10 to-blue-900/10 px-8 py-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Research Report: {result.topic}
                </h2>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                MODEL: INF-70B-GRADIENT
              </div>
            </div>

            <div className="p-8">
              <article className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed text-lg space-y-6">
                  {result.report}
                </div>
              </article>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: <FileText className="w-5 h-5" />,
                    label: "Doc Context",
                  },
                  {
                    icon: <BarChart className="w-5 h-5" />,
                    label: "Data Points",
                  },
                  {
                    icon: <Lightbulb className="w-5 h-5" />,
                    label: "Key Strategy",
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    label: "Verified",
                  },
                ].map((tag, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-4 rounded-xl bg-secondary/20 border border-border/50 text-muted-foreground"
                  >
                    {tag.icon}
                    <span className="text-xs mt-2 font-medium">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-purple-500/30 transition-all">
              <h3 className="text-purple-600 font-bold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" /> Comprehensive Synthesis
              </h3>
              <p className="text-muted-foreground">
                Retrieves data across all uploaded knowledge bases to build a
                unified perspective on complex markets.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-blue-500/30 transition-all">
              <h3 className="text-blue-600 font-bold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> Actionable Solutions
              </h3>
              <p className="text-muted-foreground">
                Goes beyond data collection to provide specific solutions and
                final recommendations for business execution.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
