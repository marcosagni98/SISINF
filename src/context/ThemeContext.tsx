import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create a context with default values
export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * ThemeProvider component to manage the application's light/dark theme.
 * Stores the selected theme in localStorage and applies it to the document.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * State to manage the current theme (light or dark).
   * Initially checks for a saved theme in localStorage or falls back to the user's system preference.
   */
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark' ? 'dark' : 'light';
    }

    // Fallback to system preference if no theme is saved
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  });

  /**
   * Effect to apply the current theme to the document and save it in localStorage.
   * Updates the `data-bs-theme` attribute for Bootstrap compatibility.
   */
  useEffect(() => {
    // Set the theme attribute for Bootstrap to recognize
    document.documentElement.setAttribute('data-bs-theme', theme);
    // Save the selected theme in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Function to toggle between light and dark themes.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
