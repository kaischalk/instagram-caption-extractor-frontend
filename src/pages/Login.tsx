import React, { useState } from "react";
import { login } from "../api";

type Props = {
  onLoginSuccess: () => void;
};

export function Login({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      onLoginSuccess();
    } catch {
      setError("Login fehlgeschlagen");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-6 text-center font-semibold">Instagram Login</h2>
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
        required
      />
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition"
      >
        Login
      </button>
    </form>
  );
}
