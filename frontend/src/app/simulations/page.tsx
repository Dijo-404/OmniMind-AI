"use client";

import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Send,
  Terminal,
  Loader2,
  Info,
  Target,
  TrendingUp,
  Compass,
} from "lucide-react";

import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

export default function SimulationsPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await apiClient.simulateScenario(query);
      setResult(data);
    } catch (error) {
      console.error("Simulation failed:", error);
      toast.error("Simulation failed. Check link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Scenario Simulation
          </h1>
          <p className="text-muted-foreground text-lg">
            Ask "what-if" questions and explore predicted outcomes powered by
            Gradient AI.
          </p>
        </header>

        <div className="bg-secondary/50 border border-border rounded-2xl p-6 mb-8 backdrop-blur-xl">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What happens if oil prices increase by 30%?"
              className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={handleSimulate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {loading ? "Simulating..." : "Simulate"}
            </button>
          </div>
        </div>

        {result && (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-secondary/50 border border-border rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6 text-blue-400">
                <Terminal className="w-6 h-6" />
                <h2 className="text-xl font-bold uppercase tracking-wider">
                  Simulation Report
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed text-lg">
                  {result.analysis}
                </div>
              </div>

              {result.sources && (
                <div className="mt-10 pt-6 border-t border-zinc-800">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                    Evidence Sources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.sources.map((source: string, i: number) => (
                      <span
                        key={i}
                        className="bg-zinc-800/50 border border-zinc-700 text-zinc-400 px-3 py-1 rounded-full text-xs"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Compass className="w-6 h-6" />,
                title: "Market Volatility",
                desc: "Simulate shifts in global commodity prices and trade policies.",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Policy Impact",
                desc: "Predict how new regulations or subsidies will affect your sector.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Growth Forecasts",
                desc: "Explore outcomes of varying investment levels in renewable energy.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-border/80 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-blue-900/10 group-hover:text-blue-500 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
