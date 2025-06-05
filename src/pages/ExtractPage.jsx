import React, { useState } from 'react';
import axios from 'axios';

function ExtractPage({ cookies }) {
  const [link, setLink] = useState('');
  const [kategorie, setKategorie] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleExtract = async () => {
    console.log("EXTRACT button clicked");
    if (!link) {
      alert("Bitte Link eingeben.");
      return;
    }

    try {
      const response = await axios.post("https://insta-caption-scraper.onrender.com/extract", {
        link,
        cookies,
        kategorie
      });
      setResult(response.data);
      setError(null);
      console.log("EXTRACT successful", response.data);
    } catch (err) {
      console.error("EXTRACT failed", err);
      setError(err.response?.data || { error: "Unbekannter Fehler" });
      setResult(null);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Link extrahieren</h2>
      <input
        type="text"
        placeholder="Instagram Reel Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Kategorie (optional)"
        value={kategorie}
        onChange={(e) => setKategorie(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleExtract} className="bg-blue-500 text-white p-2 rounded">
        Extrahieren
      </button>

      {result && (
        <div className="mt-4 border p-2 bg-green-100">
          <h3 className="font-bold">Ergebnis</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 border p-2 bg-red-100">
          <h3 className="font-bold">Fehler</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ExtractPage;