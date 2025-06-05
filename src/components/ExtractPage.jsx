import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExtractPage() {
  const [links, setLinks] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/");
    }
  }, []);

  const handleExtract = async () => {
    const linkList = links.split("\n").map((link) => link.trim()).filter(Boolean);
    const res = await fetch("https://insta-caption-scraper.onrender.com/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links: linkList })
    });
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Instagram Caption Extractor</h2>
      <textarea
        rows="5"
        className="border w-full p-2 mb-4"
        placeholder="Füge hier Instagram Reel-Links ein, jeweils in einer neuen Zeile..."
        value={links}
        onChange={(e) => setLinks(e.target.value)}
      />
      <button onClick={handleExtract} className="bg-green-600 text-white px-4 py-2 rounded">
        Extrahieren
      </button>
      <div className="mt-6">
        {results.map((r, idx) => (
          <div key={idx} className="border rounded p-4 mb-2">
            <p><strong>Link:</strong> <a href={r.url} target="_blank">{r.url}</a></p>
            <p><strong>Username:</strong> {r.username}</p>
            <p><strong>Caption:</strong> {r.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
