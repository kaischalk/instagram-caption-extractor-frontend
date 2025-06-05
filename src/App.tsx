import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Extractor } from "./pages/Extractor";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => setLoggedIn(true)} />}
        />
        <Route
          path="/extractor"
          element={loggedIn ? <Extractor /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={loggedIn ? "/extractor" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
