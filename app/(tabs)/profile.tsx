import '@/global.css';
import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (
        <ScrollView
            style={{ paddingTop: top, paddingBottom: bottom + 96 }}
            className="flex-1 bg-background-light"
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
                            {user?.role === 'Volunteer' ? 'Tình nguyện viên' : 'Người dùng'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Menu Items */}
            <View className="mt-4 bg-white">
                <MenuItem
                    icon="person-outline"
                    title="Thông tin cá nhân"
                    onPress={() => { }}
                />
                <MenuItem
                    icon="notifications-outline"
                    title="Thông báo"
                    onPress={() => { }}
                />
                <MenuItem
                    icon="settings-outline"
                    title="Cài đặt"
                    onPress={() => { }}
                />
                <MenuItem
                    icon="help-circle-outline"
                    title="Trợ giúp"
                    onPress={() => { }}
                />
            </View>

            {/* Logout Button */}
            <View className="mt-6 px-4">
                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3"
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text className="font-bold text-red-500">Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function MenuItem({
    icon,
    title,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4"
        >
            <View className="flex-row items-center gap-3">
                <Ionicons name={icon} size={24} color="#6b7280" />
                <Text className="text-base">{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>
    );
}
