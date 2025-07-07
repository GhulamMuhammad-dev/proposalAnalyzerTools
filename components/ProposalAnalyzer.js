import { useState } from 'react';

export default function ProposalAnalyzer({ goBack }) {
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (proposal.trim().length < 50) return alert('Proposal must be at least 50 characters.');
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze');
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!results?.rewritten_proposal) return;
    await navigator.clipboard.writeText(results.rewritten_proposal);
    alert('Copied!');
  };

  const handleDownload = () => {
    const blob = new Blob([results.rewritten_proposal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `improved-proposal-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Proposal Analyzer</h2>
        <textarea
          className="w-full border p-4 rounded h-48 mb-4 text-black"
          placeholder="Paste your proposal..."
          value={proposal}
          onChange={e => setProposal(e.target.value)}
        ></textarea>
        <div className="flex gap-2 mb-4">
          <button onClick={handleAnalyze} className="bg-orange-600 text-white px-6 py-2 rounded" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Proposal'}
          </button>
          <button onClick={goBack} className="border px-4 py-2 rounded">Back</button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {results && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2 text-black">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(results.scores).map(([key, val]) => (
                <div key={key} className="p-4 border rounded bg-black">
                  <h4 className="font-semibold">{key}</h4>
                  <p className={`font-bold ${val >= 8 ? 'text-green-600' : val >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>{val}/10</p>
                </div>
              ))}
            </div>
            <h4 className="mt-4 font-semibold text-black">Suggestions:</h4>
            {results.suggestions.length ? (
              <ul className="list-disc pl-6 text-black">
                {results.suggestions.map((s, i) => (
                  <li key={i}><strong>{s.category}:</strong> {s.suggestion}</li>
                ))}
              </ul>
            ) : <p>No suggestions.</p>}

            <h4 className="mt-4 font-semibold">Improved Proposal</h4>
            <pre className="bg-gray-800 p-4 rounded whitespace-pre-wrap">{results.rewritten_proposal}</pre>
            <div className="mt-2 flex gap-2">
              <button onClick={handleCopy} className="text-sm px-4 py-1 bg-orange-600 text-white rounded">Copy</button>
              <button onClick={handleDownload} className="text-sm px-4 py-1 border rounded">Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
