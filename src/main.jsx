import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LangProvider } from "./context/LangContext.jsx";

import AnimatedRoutes from "./AnimatedRoutes.jsx";

// import "github-markdown-css/github-markdown.css";
import "github-markdown-css/github-markdown-light.css";
import "github-markdown-css/github-markdown-dark.css";

createRoot(document.getElementById("root")).render(
  // TODO: get basename from vite.config.js
  <BrowserRouter basename="/Developer_Portfolio">
    <ThemeProvider>
      <LangProvider>
        <StrictMode>
          <AnimatedRoutes />
        </StrictMode>
      </LangProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
