const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  if (!response.ok) throw new Error("Login fehlgeschlagen");
  return await response.json();
}

export async function extractCaptions(links: string[]) {
  const response = await fetch(`${API_URL}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ links }),
    credentials: "include",
  });
  if (!response.ok) throw new Error("Extraction fehlgeschlagen");
  return await response.json();
}
