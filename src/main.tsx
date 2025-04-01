
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Get base path from window if set by the script in index.html
const basePath = window.__BASE_PATH__ || '/';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basePath}>
    <App />
  </BrowserRouter>
);
