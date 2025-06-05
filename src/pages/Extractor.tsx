import React, { useState } from "react";
import { extractCaptions } from "../api";

export function Extractor() {
  const [linksText, setLinksText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleExtract() {
    setError(null);
    setLoading(true);
    const links = linksText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    try {
      const res = await extractCaptions(links);
      setResults(res.results);
    } catch {
      setError("Fehler bei der Extraktion");
    } finally {
      setLoading(false);
    }
  }

  function formatMarkdown(item: any) {
    return `### ${item.username || "unbekannt"} - ${new Date(item.date).toLocaleDateString()}\n\n${item.caption}\n\n[Link](${item.url})`;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <h1 className="text-3xl mb-6 font-semibold text-center">Instagram Caption Extractor</h1>
      <textarea
        rows={6}
        placeholder="Instagram Reel Links (je Zeile ein Link)"
        value={linksText}
        onChange={(e) => setLinksText(e.target.value)}
        className="w-full p-3 border rounded mb-4 font-mono"
      />
      <button
        onClick={handleExtract}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded mb-6"
      >
        {loading ? "Lädt..." : "Captions extrahieren"}
      </button>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      {results.length > 0 && (
        <div>
          <h2 className="text-xl mb-4">Ergebnisse (Markdown)</h2>
          <pre className="bg-gray-100 p-4 rounded max-h-96 overflow-auto whitespace-pre-wrap">
            {results.map(formatMarkdown).join("\n\n---\n\n")}
          </pre>
        </div>
      )}
    </div>
  );
}
