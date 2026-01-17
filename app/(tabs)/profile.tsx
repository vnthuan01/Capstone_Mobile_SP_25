import '@/global.css';
import HelpScreen from '@/src/components/HelpScreen';
import SettingsScreen from '@/src/components/SettingsScreen';
import RequestsScreen from '@/src/components/user/requests';
import TasksListScreen from '@/src/components/volunteer/tasks';
import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ProfileScreenType = 'profile' | 'requests' | 'tasks' | 'settings' | 'help';

export default function ProfileScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();
    const [currentScreen, setCurrentScreen] = useState<ProfileScreenType>('profile');

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
                        <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                            <Ionicons name="person" size={48} color="#137fec" />
                        </View>
                        <Text className="text-2xl font-bold">{user?.full_name}</Text>
                        <Text className="mt-1 text-sm text-text-secondary">
                            {user?.email}
                        </Text>
                        <View className="mt-2 rounded-full bg-primary/10 px-3 py-1">
                            <Text className="text-sm font-medium text-primary">
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
                        />
                    ) : (
                        <MenuItem
                            icon="document-text-outline"
                            title="Theo dõi yêu cầu"
                            subtitle="Xem trạng thái yêu cầu cứu trợ của bạn"
                            onPress={() => setCurrentScreen('requests')}
                        />
                    )}
                </View>

                <View className="mt-4 bg-white">
                    <MenuItem icon="person-outline" title="Thông tin cá nhân" onPress={() => { }} />
                    <MenuItem icon="notifications-outline" title="Thông báo" onPress={() => { }} />
                    <MenuItem icon="settings-outline" title="Cài đặt" onPress={() => setCurrentScreen('settings')} />
                    <MenuItem icon="help-circle-outline" title="Trợ giúp" onPress={() => setCurrentScreen('help')} />
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

function MenuItem({
    icon,
    title,
    subtitle,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4"
        >
            <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Ionicons name={icon} size={22} color="#137fec" />
                </View>
                <View>
                    <Text className="text-base font-medium">{title}</Text>
                    {subtitle && (
                        <Text className="text-xs text-text-secondary">{subtitle}</Text>
                    )}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>
    );
}
