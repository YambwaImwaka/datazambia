
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import React from 'react';

// Get base path from window if set by the script in index.html
const basePath = (window as any).__BASE_PATH__ || '/';

const container = document.getElementById("root");

// Ensure that the container exists before creating the root
if (!container) {
  throw new Error("Root element not found. Please check your HTML file.");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
