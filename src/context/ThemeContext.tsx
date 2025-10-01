"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // This code will only run on the client side
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || "light"; // Default to light theme

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("theme", theme);
      
      // Apply Tailwind dark mode classes
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        // Apply GoodData dark theme using data-theme attribute
        document.documentElement.setAttribute("data-theme", "dark");
        // Set CSS custom properties for GoodData dark theme
        document.documentElement.style.setProperty("--gd-color-text", "#ffffff");
        document.documentElement.style.setProperty("--gd-color-text-secondary", "#b0b0b0");
        document.documentElement.style.setProperty("--gd-color-background", "#1a1a1a");
        document.documentElement.style.setProperty("--gd-color-background-secondary", "#2d2d2d");
        document.documentElement.style.setProperty("--gd-color-border", "#404040");
      } else {
        document.documentElement.classList.remove("dark");
        // Apply GoodData light theme using data-theme attribute
        document.documentElement.setAttribute("data-theme", "light");
        // Reset CSS custom properties for GoodData light theme
        document.documentElement.style.removeProperty("--gd-color-text");
        document.documentElement.style.removeProperty("--gd-color-text-secondary");
        document.documentElement.style.removeProperty("--gd-color-background");
        document.documentElement.style.removeProperty("--gd-color-background-secondary");
        document.documentElement.style.removeProperty("--gd-color-border");
      }
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
