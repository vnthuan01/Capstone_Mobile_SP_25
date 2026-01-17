import '@/global.css';
import UserHomeContent from '@/src/components/home/UserHomeContent';
import VolunteerHomeContent from '@/src/components/home/VolunteerHomeContent';
import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IndexScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);
    const isVolunteer = user?.role === 'Volunteer';

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
        <View className="flex-1 relative bg-background-light">
            {/* ===== CONTENT ===== */}
            <ScrollView
                style={{ paddingTop: top }}
                contentContainerStyle={{ paddingBottom: bottom + STICKY_HEIGHT }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="bg-white px-4 py-6 shadow-sm">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                            <Text className="text-2xl font-bold">
                                Xin chào, {user?.full_name}
                            </Text>
                            <Text className="mt-1 text-sm text-text-secondary">
                                {isVolunteer ? 'Tình nguyện viên' : 'Người dùng'}
                            </Text>
                        </View>
                        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <Ionicons name="notifications-outline" size={24} color="#111418" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Map */}
                <View className="mt-4 px-4">
                    <View className="h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-200">
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
            <Animated.View
                style={{
                    transform: [{ scale: pulseAnim }],
                }}
            >
                <TouchableOpacity className="h-16 flex-row items-center justify-center gap-3 rounded-xl bg-red-600 shadow-lg">
                    <Animated.View style={{ opacity: flashAnim }}>
                        <Ionicons name="warning" size={26} color="#fff" />
                    </Animated.View>

                    <Text className="text-xl font-black text-white">
                        SOS – KHẨN CẤP
                    </Text>
                </TouchableOpacity>
                <Text className="mt-2 text-center text-xs text-gray-400">
                    Nhấn để gửi tín hiệu khẩn cấp
                </Text>
            </Animated.View>

        </View>
    );
}
