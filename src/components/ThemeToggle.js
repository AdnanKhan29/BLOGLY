import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for user preference and set the initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Update the theme when isDarkMode changes
    const newTheme = isDarkMode ? 'dark' : 'light';
    document.documentElement.className = `theme-${newTheme}`;
    localStorage.setItem('theme', newTheme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className="px-4 py-2 bg-gray-200 dark:bg-dark text-black dark:text-white rounded-md"
      onClick={toggleTheme}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
