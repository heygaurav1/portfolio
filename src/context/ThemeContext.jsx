import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize state directly from localStorage to prevent flash
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            return 'system';
        }
        return 'system';
    });

    const [effectiveTheme, setEffectiveTheme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;

        const getEffectiveTheme = (currentTheme) => {
            if (currentTheme === 'system') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            return currentTheme;
        };

        const updateTheme = () => {
            const currentEffective = getEffectiveTheme(theme);
            root.classList.remove('light', 'dark');
            root.classList.add(currentEffective);
            setEffectiveTheme(currentEffective);
            localStorage.setItem('theme', theme);
        };

        updateTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                updateTheme();
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
