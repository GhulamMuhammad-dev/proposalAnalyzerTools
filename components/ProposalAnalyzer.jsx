'use client'
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiSend, FiCopy, FiDownload, FiEdit2, FiTrash2, FiCheck, FiAward } from "react-icons/fi";

const AnimatedScoreBar = ({ score }) => {
  const barRef = useRef(null);
  const color = score >= 8 ? "bg-lime-500" : score >= 5 ? "bg-amber-500" : "bg-red-500";

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: 0 },
        {
          width: `${score * 10}%`,
          duration: 1.5,
          ease: "power3.out"
        }
      );
    }
  }, [score]);

  return (
    <div className="w-full h-2 bg-dark-color/50 rounded-full overflow-hidden">
      <div ref={barRef} className={`h-full ${color}`}></div>
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
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef.current) return;
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
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
      setActiveTab("analysis");
    } catch (err) {
      alert(err.message || "Failed to analyze proposal");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = result?.rewritten_proposal || result?.rewrittenProposal || "";
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const handleDownload = () => {
    const text = result?.rewritten_proposal || result?.rewrittenProposal || "";
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proposal_${clientName || "client"}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const scoreColor = (score) => {
    if (score >= 8) return "text-lime-400";
    if (score >= 5) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-dark-color text-light-color p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-lime-600 mb-4">
            Proposal Excellence Analyzer
          </h1>
          <p className="text-lg text-light-color/80 max-w-2xl mx-auto">
            Transform your draft proposals into compelling, client-winning documents
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-dark-color/70 rounded-xl p-6 shadow-lg border border-light-color/10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-lime-400">
              <FiEdit2 />
              Proposal Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-color/80 mb-1">Client Name (Optional)</label>
                  <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-4 py-3 bg-dark-color/50 border border-light-color/10 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-light-color"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-color/80 mb-1">Job Description (Optional)</label>
                  <input
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="e.g. E-commerce website development"
                    className="w-full px-4 py-3 bg-dark-color/50 border border-light-color/10 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-light-color"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light-color/80 mb-1">Your Proposal Draft*</label>
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  rows={10}
                  placeholder="Paste your proposal draft here (minimum 50 characters)..."
                  className="w-full px-4 py-3 bg-dark-color/50 border border-light-color/10 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-light-color"
                />
                <p className="text-xs text-light-color/50 mt-1">*Required field</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-dark-color px-6 py-3 rounded-lg font-medium shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-dark-color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Analyze Proposal
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProposal("");
                    setClientName("");
                    setJobDescription("");
                    setResult(null);
                  }}
                  className="flex items-center gap-2 px-5 py-3 border border-light-color/20 text-light-color hover:bg-dark-color/50 rounded-lg font-medium"
                >
                  <FiTrash2 />
                  Clear All
                </button>
              </div>
            </form>
          </div>

          {/* Tips Sidebar */}
          <div className="bg-dark-color/70 rounded-xl p-6 shadow-lg border border-light-color/10 h-fit">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-lime-400">
              <FiAward />
              Proposal Tips
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-dark-color/50 rounded-lg border border-lime-500/20">
                <h3 className="font-medium text-lime-400 mb-2">Personalization</h3>
                <p className="text-sm text-light-color/80">Address the client by name and reference their job post.</p>
              </div>
              <div className="p-4 bg-dark-color/50 rounded-lg border border-lime-500/20">
                <h3 className="font-medium text-lime-400 mb-2">Value Proposition</h3>
                <p className="text-sm text-light-color/80">Focus on how you'll solve their problem.</p>
              </div>
              <div className="p-4 bg-dark-color/50 rounded-lg border border-lime-500/20">
                <h3 className="font-medium text-lime-400 mb-2">Structure</h3>
                <p className="text-sm text-light-color/80">Use short paragraphs and bullet points.</p>
              </div>
              <div className="p-4 bg-dark-color/50 rounded-lg border border-lime-500/20">
                <h3 className="font-medium text-lime-400 mb-2">Call to Action</h3>
                <p className="text-sm text-light-color/80">End with a clear next step.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={cardRef} className="mt-10 bg-dark-color/70 rounded-xl shadow-lg border border-light-color/10 overflow-hidden">
            <div className="border-b border-light-color/10">
              <div className="flex flex-wrap">
                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`px-6 py-4 font-medium ${activeTab === "analysis" ? "text-lime-400 border-b-2 border-lime-400" : "text-light-color/70 hover:text-light-color"}`}
                >
                  Analysis Report
                </button>
                <button
                  onClick={() => setActiveTab("proposal")}
                  className={`px-6 py-4 font-medium ${activeTab === "proposal" ? "text-lime-400 border-b-2 border-lime-400" : "text-light-color/70 hover:text-light-color"}`}
                >
                  Enhanced Proposal
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "analysis" ? (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-dark-color/50 rounded-lg border border-lime-500/20">
                    <div>
                      <h3 className="text-sm font-medium text-light-color/80 uppercase tracking-wider mb-2">
                        Overall Score
                      </h3>
                      <div className="flex items-end gap-3">
                        <span className={`text-5xl font-bold ${scoreColor(result.overall_score)}`}>
                          {result.overall_score}
                        </span>
                        <span className="text-xl text-light-color/60 mb-1.5">/ 10</span>
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="flex justify-between text-xs text-light-color/60 mb-1">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                      <AnimatedScoreBar score={result.overall_score} />
                      <p className={`text-sm mt-3 text-center md:text-right ${scoreColor(result.overall_score)}`}>
                        {result.overall_score >= 8 ? "Excellent! Minor improvements" : 
                         result.overall_score >= 5 ? "Good, but needs refinement" : 
                         "Needs significant work"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-color/50 p-6 rounded-lg border border-lime-500/20">
                      <h4 className="font-medium text-xl text-lime-400 flex items-center gap-2 mb-6">
                        Detailed Metrics
                      </h4>
                      <div className="space-y-5">
                        {Object.entries(result.scores).map(([k, v]) => (
                          <div key={k} className="group">
                            <div className="flex items-center justify-between mb-1">
                              <span className="capitalize text-light-color font-medium">
                                {k.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className={`font-bold ${scoreColor(v)}`}>
                                {v}
                              </span>
                            </div>
                            <AnimatedScoreBar score={v} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-dark-color/50 p-6 rounded-lg border border-lime-500/20">
                      <h4 className="font-medium text-xl text-lime-400 flex items-center gap-2 mb-6">
                        High Impact Changes
                      </h4>
                      <ul className="space-y-3">
                        {(result.high_impact_changes || result.highImpactChanges || []).map((it, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-dark-color/30 rounded-lg border border-light-color/10 hover:bg-dark-color/40 transition-colors">
                            <FiCheck className="text-lime-400 mt-1 flex-shrink-0" />
                            <span className="text-light-color/90">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-dark-color/50 p-6 rounded-lg border border-lime-500/20">
                    <h4 className="font-medium text-xl text-lime-400 flex items-center gap-2 mb-6">
                      Top Suggestions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(result.suggestions || []).slice(0, 6).map((s, i) => (
                        <div key={i} className="p-4 bg-dark-color/30 rounded-lg border border-light-color/10 hover:border-lime-500/30 transition-colors">
                          <div className="text-sm font-medium text-lime-400 mb-1">{s.category}</div>
                          <p className="text-sm text-light-color/80">{s.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold text-lime-400">Enhanced Proposal</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-dark-color/50 border border-lime-500/30 hover:bg-lime-500/10 text-light-color rounded-lg transition-colors"
                      >
                        <FiCopy />
                        {copySuccess || "Copy"}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-lime-600 hover:bg-lime-700 text-dark-color rounded-lg transition-colors"
                      >
                        <FiDownload />
                        Download
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none bg-dark-color/30 p-6 rounded-lg border border-light-color/10">
                    <ReactMarkdown>{result.rewritten_proposal || result.rewrittenProposal || ""}</ReactMarkdown>
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