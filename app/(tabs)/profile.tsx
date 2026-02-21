import RequestsScreen from '@/app/(tabs)/requests/index';
import TasksListScreen from '@/app/(tabs)/tasks/index';
import '@/global.css';
import CitizenProfile from '@/src/components/profile/CitizenProfile';
import VolunteerProfile from '@/src/components/profile/VolunteerProfile';
import HelpScreen from '@/src/components/screens/HelpScreen';
import SettingsScreen from '@/src/components/screens/SettingsScreen';
import { useTheme } from '@/src/context/ThemeContext';
import { useAuthStore } from '@/src/store/authStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ProfileScreenType = 'profile' | 'requests' | 'tasks' | 'settings' | 'help';

const ACCENT_COLOR = '#DA251D';

export default function ProfileScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();
    const params = useLocalSearchParams();
    const [currentScreen, setCurrentScreen] = useState<ProfileScreenType>('profile');

    // Theme logic
    // Theme logic
    const { colors, isDark } = useTheme();
    // Helper to keep some compatibility or we just use styles directly
    // const bgClass = isDark ? 'bg-gray-900' : 'bg-background-light'; // Replacing with style
    const headerBg = isDark ? 'bg-gray-700' : 'bg-primary/10'; // Keep for now or refactor


    useEffect(() => {
        if (params.view) {
            setCurrentScreen(params.view as ProfileScreenType);
        }
    }, [params.view]);

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    // Hiển thị màn hình theo dõi yêu cầu cho User
    if (currentScreen === 'requests') {
        return <RequestsScreen onBack={() => setCurrentScreen('profile')} />;
    }

    // Hiển thị màn hình theo dõi nhiệm vụ cho Volunteer
    if (currentScreen === 'tasks') {
        return <TasksListScreen onBack={() => setCurrentScreen('profile')} />;
    }

    // Hiển thị màn hình Cài đặt
    if (currentScreen === 'settings') {
        return <SettingsScreen onBack={() => setCurrentScreen('profile')} />;
    }

    // Hiển thị màn hình Trợ giúp
    if (currentScreen === 'help') {
        return <HelpScreen onBack={() => setCurrentScreen('profile')} />;
    }

    const isVolunteer = user?.role === 'Volunteer';

    return isVolunteer ? (
        <VolunteerProfile onLogout={handleLogout} onNavigate={(s) => setCurrentScreen(s)} />
    ) : (
        <CitizenProfile onLogout={handleLogout} onNavigate={(s) => setCurrentScreen(s)} />
    );
}

