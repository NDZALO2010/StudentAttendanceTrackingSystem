import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'edtrackTheme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark-theme', initial === 'dark');
  }, []);

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <button
      id="theme-toggle"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle light / dark theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
