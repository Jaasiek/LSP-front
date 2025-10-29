<<<<<<< HEAD:lsp-front-react/src/main.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

>>>>>>> f9d3cda118b7ab9d6ea90c8bff0f17f8fe26a86f:lsp-front-react/src/main.jsx
