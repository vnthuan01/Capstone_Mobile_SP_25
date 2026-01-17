import '@/global.css';
import UserHomeContent from '@/src/components/home/UserHomeContent';
import VolunteerHomeContent from '@/src/components/home/VolunteerHomeContent';
import { useAuthStore } from '@/src/store/authStore';
import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IndexScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);
    const { mode } = useThemeStore();
    const isVolunteer = user?.role === 'Volunteer';
    const isDark = mode === 'dark';

    // Theme Styles
    const bgClass = isDark ? 'bg-gray-900' : 'bg-background-light';
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const cardBgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const iconWrapperBg = isDark ? 'bg-gray-700' : 'bg-gray-100';

    const STICKY_HEIGHT = 88; // chiều cao khu SOS

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const flashAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Pulse button
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.06,
                    duration: 700,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Flash icon
        Animated.loop(
            Animated.sequence([
                Animated.timing(flashAnim, {
                    toValue: 0.4,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(flashAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);



    return (
        <View className={`flex-1 relative justify-center ${bgClass}`}>
            {/* ===== CONTENT ===== */}
            <ScrollView
                style={{ paddingTop: top }}
                contentContainerStyle={{ paddingBottom: bottom + STICKY_HEIGHT }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="bg-transparent px-4 py-6 shadow-sm">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                            <Text className={`text-2xl font-bold ${textClass}`}>
                                Xin chào, {user?.full_name}
                            </Text>
                            <Text className={`mt-1 text-sm ${subTextClass}`}>
                                {isVolunteer ? 'Tình nguyện viên' : 'Người dùng'}
                            </Text>
                        </View>
                        <TouchableOpacity className={`h-10 w-10 items-center justify-center rounded-full ${iconWrapperBg}`}>
                            <Ionicons name="notifications-outline" size={24} color={isDark ? '#fff' : '#111418'} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Map */}
                <View className="mt-4 px-4">
                    <View className={`h-48 items-center justify-center overflow-hidden rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <Ionicons name="map" size={48} color="#6b7280" />
                        <Text className="mt-2 text-sm text-gray-500">
                            Bản đồ khu vực cứu trợ
                        </Text>
                    </View>
                </View>

                {/* Role content */}
                {isVolunteer ? <VolunteerHomeContent /> : <UserHomeContent />}
            </ScrollView>

            {/* ===== STICKY SOS ===== */}
            <View
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10, // tránh tab bar / home indicator
                    zIndex: 100,
                }}
            >
                <Animated.View
                    style={{
                        transform: [{ scale: pulseAnim }],
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg"
                    >
                        {/* Icon flash */}
                        <Animated.View style={{ opacity: flashAnim }}>
                            <Ionicons name="warning" size={30} color="#ffdd00ff" />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </View>


        </View>
    );
}
