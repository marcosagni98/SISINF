import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";
import { DEBUG } from "./config";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Get the root element where the React app will be mounted
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**
 * Render the React application.
 * Wraps the App component with providers for authentication, theme, and routing.
 * Uses React Strict Mode if the application is in DEBUG mode.
 */
root.render(
  DEBUG ? (
    // Strict mode enabled in DEBUG mode for highlighting potential issues
    <React.StrictMode>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  ) : (
    // Normal mode for production builds
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
);
