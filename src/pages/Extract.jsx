import React, { useState } from 'react';

export default function Extract() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);

  const handleExtract = async () => {
    if (!link) {
      alert('Bitte Link eingeben');
      return;
    }

    setResult({
      caption: 'Beispiel Caption',
      username: 'BeispielUser',
      url: link,
      date: new Date().toISOString(),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('igLoggedIn');
    localStorage.removeItem('igUsername');
    window.location.href = '/';
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
      <button
        onClick={handleExtract}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Caption auslesen
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-white">
          <p><strong>Username:</strong> {result.username}</p>
          <p><strong>Caption:</strong> {result.caption}</p>
          <p><strong>URL:</strong> <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{result.url}</a></p>
          <p><strong>Datum:</strong> {new Date(result.date).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
