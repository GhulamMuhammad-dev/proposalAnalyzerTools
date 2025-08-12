'use client'
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiSend, FiCopy, FiDownload } from "react-icons/fi";

export default function ProposalAnalyzer() {
  const [proposal, setProposal] = useState("");
  const [clientName, setClientName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, { y: 20, opacity: 0, duration: 0.6 });
  }, [result]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!proposal || proposal.trim().length < 50) return alert("Please enter a proposal (min 50 chars)");
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
    } catch (err) {
      alert(err.message || "Failed to analyze");
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
    a.download = "rewritten_proposal.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h2 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-4">
        Proposal Analyzer — Turn any draft into a client-winning proposal
      </motion.h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client name (optional)"
            className="input input-bordered w-full"
          />
          <input
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Short job description (optional)"
            className="input input-bordered w-full"
          />
        </div>

        <textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          rows={8}
          placeholder="Paste your Upwork proposal here..."
          className="textarea textarea-bordered w-full"
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm"
          >
            <FiSend />
            {loading ? "Analyzing..." : "Analyze Proposal"}
          </button>

          <button
            type="button"
            className="px-3 py-2 border rounded-md text-sm"
            onClick={() => {
              setProposal("");
              setResult(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {result && (
        <div ref={cardRef} className="mt-6 p-6 border rounded-lg bg-white shadow">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-lg font-semibold">Overall score: {result.overall_score}/10</h3>

            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Scores</h4>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.entries(result.scores).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium">High Impact Changes</h4>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {(result.high_impact_changes || result.highImpactChanges || []).map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Top Suggestions</h4>
              <ul className="mt-2 space-y-2">
                {(result.suggestions || []).slice(0, 6).map((s, i) => (
                  <li key={i} className="text-sm">
                    <strong>{s.category}:</strong> {s.suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Rewritten Proposal</h4>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    <FiCopy />
                    {copySuccess || "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 px-2 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    <FiDownload />
                    Download
                  </button>
                </div>
              </div>
              <div className="mt-2 prose max-w-none">
                <ReactMarkdown>{result.rewritten_proposal || result.rewrittenProposal || ""}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
