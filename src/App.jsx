import React, { useState } from 'react'

export default function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [link, setLink] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)

    try {
      const res = await fetch('https://insta-caption-scraper.onrender.com/extract-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, links: [link] })
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
      } else {
        setError(data.detail || 'Fehler bei der Anfrage')
      }
    } catch (err) {
      setError('Netzwerkfehler')
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Instagram Caption Extractor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Instagram Username:
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Instagram Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <br />
        <label>
          Reel Link:
          <input value={link} onChange={e => setLink(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Caption auslesen</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <pre style={{ background: '#eee', padding: 10, marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
