import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from '@vercel/analytics/react';
import App from "./App.tsx";
import "./index.css";
// Removed performance monitor import

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
      })
      .catch(() => {
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
