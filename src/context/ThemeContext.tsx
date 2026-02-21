import React, { createContext, useContext, useEffect } from 'react';
import { Colors, ThemeColors } from '../constants/theme';
import { useThemeStore } from '../store/themeStore';

interface ThemeContextType {
    colors: ThemeColors;
    isDark: boolean;
    mode: 'light' | 'dark';
    toggleTheme: () => Promise<void>;
    setTheme: (mode: 'light' | 'dark') => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { mode, toggleTheme, setTheme, loadTheme } = useThemeStore();

    // Ensure we render correctly after mounting to avoid hydration mismatch if needed,
    // though for simple specific style injection it might be fine.
    // We'll trust the store acts as source of truth.

    const colors = Colors[mode];
    const isDark = mode === 'dark';

    useEffect(() => {
        loadTheme();
    }, [loadTheme]);

    return (
        <ThemeContext.Provider value={{ colors, isDark, mode, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
