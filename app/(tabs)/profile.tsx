import RequestsScreen from '@/app/(tabs)/requests/index';
import TasksListScreen from '@/app/(tabs)/tasks/index';
import '@/global.css';
import MenuItem from '@/src/components/MenuItem';
import HelpScreen from '@/src/components/screens/HelpScreen';
import SettingsScreen from '@/src/components/screens/SettingsScreen';
import { useAuthStore } from '@/src/store/authStore';
import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ProfileScreenType = 'profile' | 'requests' | 'tasks' | 'settings' | 'help';

export default function ProfileScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();
    const params = useLocalSearchParams();
    const [currentScreen, setCurrentScreen] = useState<ProfileScreenType>('profile');
    const getPrimaryColor = useThemeStore((s) => s.getPrimaryColor);
    const primaryColor = getPrimaryColor();

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

    return (
        <View className="flex-1 relative bg-background-light">

            <ScrollView
                style={{
                    paddingTop: top,
                    paddingBottom: bottom + 88,
                }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="bg-white px-4 py-6 shadow-sm">
                    <View className="items-center">
                        <View
                            className="mb-4 h-24 w-24 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${primaryColor}1A` }}
                        >
                            <Ionicons name="person" size={48} color={primaryColor} />
                        </View>
                        <Text className="text-2xl font-bold">{user?.full_name}</Text>
                        <Text className="mt-1 text-sm text-text-secondary">
                            {user?.email}
                        </Text>
                        <View
                            className="mt-2 rounded-full px-3 py-1"
                            style={{ backgroundColor: `${primaryColor}1A` }}
                        >
                            <Text
                                className="text-sm font-medium"
                                style={{ color: primaryColor }}
                            >
                                {isVolunteer ? 'Tình nguyện viên' : 'Người dùng'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Menu */}
                <View className="mt-4 bg-white">
                    {isVolunteer ? (
                        <MenuItem
                            icon="clipboard-outline"
                            title="Theo dõi nhiệm vụ"
                            subtitle="Xem và cập nhật trạng thái nhiệm vụ"
                            onPress={() => setCurrentScreen('tasks')}
                            color={primaryColor}
                        />
                    ) : (
                        <MenuItem
                            icon="document-text-outline"
                            title="Theo dõi yêu cầu"
                            subtitle="Xem trạng thái yêu cầu cứu trợ của bạn"
                            onPress={() => setCurrentScreen('requests')}
                            color={primaryColor}
                        />
                    )}
                </View>

                <View className="mt-4 bg-white">
                    <MenuItem
                        icon="person-outline"
                        title="Thông tin cá nhân"
                        onPress={() => { }}
                        color={primaryColor}
                    />
                    <MenuItem
                        icon="notifications-outline"
                        title="Thông báo"
                        onPress={() => { }}
                        color={primaryColor}
                    />
                    <MenuItem
                        icon="settings-outline"
                        title="Cài đặt"
                        onPress={() => setCurrentScreen('settings')}
                        color={primaryColor}
                    />
                    <MenuItem
                        icon="help-circle-outline"
                        title="Trợ giúp"
                        onPress={() => setCurrentScreen('help')}
                        color={primaryColor}
                    />
                </View>
            </ScrollView>

            {/* LOGOUT FIXED */}
            <View
                style={{ paddingBottom: bottom + 16 }}
                className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/80 px-4 pt-4"
            >
                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3"
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text className="font-bold text-red-500">Đăng xuất</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

