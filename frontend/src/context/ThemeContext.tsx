"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      // setTheme('light'); // Default to dark as per project style, but follow system if preferred?
      // Actually, let's stick to dark as default for now but allow loading.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-theme");
      root.setAttribute("data-theme", "light");
      // Force immediate variable updates if needed
      root.style.setProperty('--bg-main', '#ece8e2');
      root.style.setProperty('--bg-sidebar', '#e2ded7');
      root.style.setProperty('--bg-elev-1', '#f7f5f2');
      root.style.setProperty('--text-primary', '#000000');
      root.style.setProperty('--text-secondary', '#000000');
      root.style.setProperty('--border-primary', 'rgba(0,0,0,0.1)');
      root.style.setProperty('--glass-bg', 'rgba(255,255,255,0.8)');
      // HSL for tailwind
      root.style.setProperty('--background', '37 30% 91%');
      root.style.setProperty('--foreground', '240 10% 4%');
    } else {
      root.classList.remove("light-theme");
      root.setAttribute("data-theme", "dark");
      root.style.setProperty('--bg-main', '#0a0a0a');
      root.style.setProperty('--bg-sidebar', '#111111');
      root.style.setProperty('--bg-elev-1', '#151515');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', 'rgba(255,255,255,0.7)');
      root.style.setProperty('--border-primary', 'rgba(255,255,255,0.1)');
      root.style.setProperty('--glass-bg', 'rgba(10,10,10,0.72)');
      // HSL for tailwind
      root.style.setProperty('--background', '240 10% 4%');
      root.style.setProperty('--foreground', '0 0% 100%');
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
