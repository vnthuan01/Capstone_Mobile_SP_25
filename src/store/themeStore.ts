import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'dark';

export const THEME_COLORS: Record<ThemeColor, { name: string; color: string; bg: string }> = {
    blue: { name: 'Xanh dương', color: '#137fec', bg: 'bg-blue-500' },
    green: { name: 'Xanh lá', color: '#16a34a', bg: 'bg-green-500' },
    purple: { name: 'Tím', color: '#9333ea', bg: 'bg-purple-500' },
    orange: { name: 'Cam', color: '#ea580c', bg: 'bg-orange-500' },
    dark: { name: 'Tối', color: '#1f2937', bg: 'bg-gray-800' },
};

interface ThemeState {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;
    getPrimaryColor: () => string;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            themeColor: 'blue',
            setThemeColor: (color) => set({ themeColor: color }),
            getPrimaryColor: () => THEME_COLORS[get().themeColor].color,
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
