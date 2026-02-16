import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./ErrorBoundary";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<p style='padding:20px;font-family:sans-serif'>Error: #root not found.</p>";
} else {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (err) {
    rootEl.innerHTML = `<div style="padding:20px;font-family:sans-serif;white-space:pre-wrap">App failed to load: ${err instanceof Error ? err.message : String(err)}</div>`;
  }
}
