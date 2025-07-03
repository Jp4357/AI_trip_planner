// src/hooks/useTheme.ts
import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first, default to light if nothing found
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved === 'dark';
        }
        return false;
    });

    // Apply theme to DOM whenever isDark changes
    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Save to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return {
        isDark,
        toggleTheme
    };
};