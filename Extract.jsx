import React, { useState } from 'react';

export default function Extract() {
  const [link, setLink] = useState('');
  const [kategorie, setKategorie] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setError(null);
    if (!link) {
      alert('Bitte Link eingeben');
      return;
    }

    const cookies = localStorage.getItem("igCookies");
    if (!cookies) {
      alert("Nicht eingeloggt oder Cookies fehlen.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://insta-caption-scraper.onrender.com/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          link: link,
          cookies: JSON.parse(cookies),
          kategorie: kategorie
        })
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("igLoggedIn");
    localStorage.removeItem("igCookies");
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Caption Extractor</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <input
        type="text"
        placeholder="Instagram Link hier einfügen"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Kategorie (optional)"
        value={kategorie}
        onChange={(e) => setKategorie(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />
      <button
        onClick={handleExtract}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Extrahiere..." : "Caption auslesen"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
          <p><strong>Fehler:</strong> {error.error}</p>
          {error.trace && (
            <pre className="mt-2 text-xs whitespace-pre-wrap">{error.trace}</pre>
          )}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded bg-white">
          <p><strong>Username:</strong> {result.username}</p>
          <p><strong>Caption:</strong> {result.caption}</p>
          <p><strong>URL:</strong> <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{result.url}</a></p>
          <p><strong>Datum:</strong> {new Date(result.date).toLocaleString()}</p>
          <p><strong>Kategorie:</strong> {result.kategorie}</p>
        </div>
      )}
    </div>
  );
}
