'use client'
import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiSend, FiCopy, FiDownload, FiEdit2, FiTrash2, FiCheck, FiAward } from "react-icons/fi";

const clamp01 = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(10, num));
};

const useAnimatedWidth = (score) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { width: 0 },
      {
        width: `${clamp01(score) * 10}%`,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, [score]);
  return ref;
};

const scoreTint = (score) => {
  if (score >= 8) return { text: "text-primaryColor-400", bg: "bg-primaryColor-400" };
  if (score >= 5) return { text: "text-primaryColor-600", bg: "bg-primaryColor-600" };
  return { text: "text-primaryColor-800", bg: "bg-primaryColor-800" };
};

const AnimatedScoreBar = ({ score }) => {
  const ref = useAnimatedWidth(score);
  const { bg } = scoreTint(score || 0);
  return (
    <div className="w-full h-2 bg-darkColor/50 rounded-full overflow-hidden">
      <div ref={ref} className={`h-full ${bg}`} />
    </div>
  );
};

export default function ProposalAnalyzer() {
  const [proposal, setProposal] = useState("");
  const [clientName, setClientName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("analysis");
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !result) return;
    gsap.from(cardRef.current, { y: 20, opacity: 0, duration: 0.6 });
  }, [result]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!proposal || proposal.trim().length < 50) {
      alert("Please enter a proposal (minimum 50 characters required)");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal, clientName, jobDescription }),
      });
      const data = await res.json();

      // Frontend defensive normalization
      const cleaned = {
        overall_score: clamp01(Number(data?.overall_score)),
        scores: (function () {
          const src = data?.scores;
          if (!src) return {};
          if (Array.isArray(src)) {
            const o = {};
            for (const it of src) {
              const k = String(it?.name ?? it?.metric ?? "").trim();
              const v = clamp01(Number(it?.score ?? it?.value));
              if (k) o[k] = v;
            }
            return o;
          }
          const o = {};
          for (const [k, v] of Object.entries(src || {})) {
            o[k] = clamp01(v);
          }
          return o;
        })(),
        suggestions: Array.isArray(data?.suggestions)
          ? data.suggestions.map((s) => ({
              category: String(s?.category ?? "General"),
              suggestion: String(s?.suggestion ?? s?.text ?? s ?? ""),
            }))
          : [],
        rewritten_proposal: String(data?.rewritten_proposal ?? data?.rewrittenProposal ?? ""),
        high_impact_changes: Array.isArray(data?.high_impact_changes ?? data?.highImpactChanges)
          ? (data?.high_impact_changes ?? data?.highImpactChanges).map((x) => String(x))
          : [],
        _fallback: Boolean(data?._fallback),
      };

      // compute overall if missing and scores present
      if ((!Number.isFinite(cleaned.overall_score) || cleaned.overall_score === 0) && Object.keys(cleaned.scores).length > 0) {
        const vals = Object.values(cleaned.scores);
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        cleaned.overall_score = clamp01(Number(avg.toFixed(1)));
      }

      setResult(cleaned);
      setActiveTab("analysis");
    } catch (err) {
      alert(err?.message || "Failed to analyze proposal");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = result?.rewritten_proposal || "";
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const handleDownload = () => {
    const text = result?.rewritten_proposal || "";
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proposal_${clientName || "client"}_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const scoreTextClass = scoreTint(result?.overall_score ?? 0).text;

  const metricEntries = useMemo(() => {
    const entries = Object.entries(result?.scores ?? {}).filter(([, v]) => typeof v === "number" && !Number.isNaN(v));
    return entries.sort((a, b) => b[1] - a[1]);
  }, [result?.scores]);

  return (
    <div className="min-h-screen bg-darkColor text-lightColor p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primaryColor-400 to-primaryColor-600 mb-4">
            Proposal Excellence Analyzer
          </h1>
          <p className="text-lg text-lightColor/80 max-w-2xl mx-auto">Transform your draft proposals into compelling, client-winning documents</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-darkColor/70 rounded-xl p-6 shadow-lg border border-lightColor/10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-primaryColor-400"><FiEdit2 /> Proposal Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-lightColor/80 mb-1">Client Name (Optional)</label>
                  <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Acme Corporation" className="w-full px-4 py-3 bg-darkColor/50 border border-lightColor/10 rounded-lg focus:ring-2 focus:ring-primaryColor-500 focus:border-transparent text-lightColor" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lightColor/80 mb-1">Job Description (Optional)</label>
                  <textarea  value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="e.g. E-commerce website development" className="w-full px-4 py-3 bg-darkColor/50 border border-lightColor/10 rounded-lg focus:ring-2 focus:ring-primaryColor-500 focus:border-transparent text-lightColor" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-lightColor/80 mb-1">Your Proposal Draft*</label>
                <textarea value={proposal} onChange={(e) => setProposal(e.target.value)} rows={10} placeholder="Paste your proposal draft here (minimum 50 characters)..." className="w-full px-4 py-3 bg-darkColor/50 border border-lightColor/10 rounded-lg focus:ring-2 focus:ring-primaryColor-500 focus:border-transparent text-lightColor" />
                <p className="text-xs text-lightColor/50 mt-1">*Required field</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" disabled={loading} aria-label="Analyze Proposal" className="flex items-center gap-2 bg-gradient-to-r from-primaryColor-500 to-primaryColor-600 hover:from-primaryColor-600 hover:to-primaryColor-700 text-darkColor px-6 py-3 rounded-lg font-medium shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-darkColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiSend /> Analyze Proposal
                    </>
                  )}
                </button>

                <button type="button" aria-label="Clear All" onClick={() => { setProposal(""); setClientName(""); setJobDescription(""); setResult(null); setCopySuccess(""); setActiveTab("analysis"); }} className="flex items-center gap-2 px-5 py-3 border border-lightColor/20 text-lightColor hover:bg-darkColor/50 rounded-lg font-medium">
                  <FiTrash2 /> Clear All
                </button>
              </div>
            </form>
          </div>

          {/* Tips Sidebar */}
          <div className="bg-darkColor/70 rounded-xl p-6 shadow-lg border border-lightColor/10 h-full">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-primaryColor-400"><FiAward /> Proposal Tips</h2>
            <div className="space-y-4">
              <div className="p-4 bg-darkColor/50 rounded-lg border border-primaryColor-500/20">
                <h3 className="font-medium text-primaryColor-400 mb-2">Personalization</h3>
                <p className="text-sm text-lightColor/80">Address the client by name and reference their job post.</p>
              </div>
              <div className="p-4 bg-darkColor/50 rounded-lg border border-primaryColor-500/20">
                <h3 className="font-medium text-primaryColor-400 mb-2">Value Proposition</h3>
                <p className="text-sm text-lightColor/80">Focus on how you'll solve their problem.</p>
              </div>
              <div className="p-4 bg-darkColor/50 rounded-lg border border-primaryColor-500/20">
                <h3 className="font-medium text-primaryColor-400 mb-2">Structure</h3>
                <p className="text-sm text-lightColor/80">Use short paragraphs and bullet points.</p>
              </div>
              <div className="p-4 bg-darkColor/50 rounded-lg border border-primaryColor-500/20">
                <h3 className="font-medium text-primaryColor-400 mb-2">Call to Action</h3>
                <p className="text-sm text-lightColor/80">End with a clear next step.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={cardRef} className="mt-10 bg-darkColor/70 rounded-xl shadow-lg border border-lightColor/10 overflow-hidden">
            <div className="border-b border-lightColor/10">
              <div className="flex flex-wrap">
                <button onClick={() => setActiveTab("analysis")} className={`px-6 py-4 font-medium ${activeTab === "analysis" ? "text-primaryColor-400 border-b-2 border-primaryColor-400" : "text-lightColor/70 hover:text-lightColor"}`}>Analysis Report</button>
                <button onClick={() => setActiveTab("proposal")} className={`px-6 py-4 font-medium ${activeTab === "proposal" ? "text-primaryColor-400 border-b-2 border-primaryColor-400" : "text-lightColor/70 hover:text-lightColor"}`}>Enhanced Proposal</button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "analysis" ? (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-darkColor/50 rounded-lg border border-primaryColor-500/20">
                    <div>
                      <h3 className="text-sm font-medium text-lightColor/80 uppercase tracking-wider mb-2">Overall Score</h3>
                      <div className="flex items-end gap-3">
                        <span className={`text-5xl font-bold ${scoreTextClass}`}>{Number.isFinite(result.overall_score) ? result.overall_score : 0}</span>
                        <span className="text-xl text-lightColor/60 mb-1.5">/ 10</span>
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="flex justify-between text-xs text-lightColor/60 mb-1"><span>0</span><span>5</span><span>10</span></div>
                      <AnimatedScoreBar score={result.overall_score ?? 0} />
                      <p className={`text-sm mt-3 text-center md:text-right ${scoreTextClass}`}>
                        {result.overall_score >= 8 ? "Excellent! Minor improvements" : result.overall_score >= 5 ? "Good, but needs refinement" : "Needs significant work"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-darkColor/50 p-6 rounded-lg border border-primaryColor-500/20">
                      <h4 className="font-medium text-xl text-primaryColor-400 flex items-center gap-2 mb-6">Detailed Metrics</h4>
                      <div className="space-y-5">
                        {metricEntries.length === 0 && <div className="text-sm text-lightColor/60">No metrics returned.</div>}
                        {metricEntries.map(([k, v]) => {
                          const { text } = scoreTint(v);
                          return (
                            <div key={k} className="group">
                              <div className="flex items-center justify-between mb-1">
                                <span className="capitalize text-lightColor font-medium">{k.replace(/([A-Z])/g, " $1").trim()}</span>
                                <span className={`font-bold ${text}`}>{v}</span>
                              </div>
                              <AnimatedScoreBar score={v} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-darkColor/50 p-6 rounded-lg border border-primaryColor-500/20">
                      <h4 className="font-medium text-xl text-primaryColor-400 flex items-center gap-2 mb-6">High Impact Changes</h4>
                      <ul className="space-y-3">
                        {(result.high_impact_changes || []).map((it, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-darkColor/30 rounded-lg border border-lightColor/10 hover:bg-darkColor/40 transition-colors">
                            <FiCheck className="text-primaryColor-400 mt-1 flex-shrink-0" />
                            <span className="text-lightColor/90">{it}</span>
                          </li>
                        ))}
                        {(!result.high_impact_changes || result.high_impact_changes.length === 0) && <li className="text-sm text-lightColor/60">No high impact changes provided.</li>}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-darkColor/50 p-6 rounded-lg border border-primaryColor-500/20">
                    <h4 className="font-medium text-xl text-primaryColor-400 flex items-center gap-2 mb-6">Top Suggestions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(result.suggestions || []).slice(0, 6).map((s, i) => (
                        <div key={i} className="p-4 bg-darkColor/30 rounded-lg border border-lightColor/10 hover:border-primaryColor-500/30 transition-colors">
                          <div className="text-sm font-medium text-primaryColor-400 mb-1">{s.category}</div>
                          <p className="text-sm text-lightColor/80">{s.suggestion}</p>
                        </div>
                      ))}
                      {(!result.suggestions || result.suggestions.length === 0) && <div className="text-sm text-lightColor/60">No suggestions provided.</div>}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold text-primaryColor-400">Enhanced Proposal</h3>
                    <div className="flex gap-3">
                      <button onClick={handleCopy} aria-label="Copy enhanced proposal" className="flex items-center gap-2 px-4 py-2 bg-darkColor/50 border border-primaryColor-500/30 hover:bg-primaryColor-500/10 text-lightColor rounded-lg transition-colors">
                        <FiCopy /> {copySuccess || "Copy"}
                      </button>
                      <button onClick={handleDownload} aria-label="Download enhanced proposal" className="flex items-center gap-2 px-4 py-2 bg-primaryColor-600 hover:bg-primaryColor-700 text-darkColor rounded-lg transition-colors">
                        <FiDownload /> Download
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none bg-darkColor/30 p-6 rounded-lg border border-lightColor/10">
                    <ReactMarkdown>{result.rewritten_proposal || ""}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
