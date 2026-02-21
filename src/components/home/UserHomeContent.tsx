import '@/global.css';
import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UserHomeContent() {
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();
    const { colors, isDark } = useTheme();

    return (
        <View style={{ paddingBottom: bottom + 20 }}>
            {/* Quick Actions */}
            <View className="mt-6 px-4">
                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Hành động nhanh
                </Text>
                <View className="flex-row gap-3">
                    <QuickActionCard
                        icon="add-circle"
                        label="Gửi yêu cầu"
                        color="primary"
                        onPress={() => router.push('/create-request')}
                    />
                    <QuickActionCard
                        icon="location"
                        label="Theo dõi"
                        color="green"
                        onPress={() =>
                            router.push(
                                '/requests',
                            )
                        }
                    />
                    <QuickActionCard
                        icon="heart"
                        label="Ủng hộ"
                        color="orange"
                        onPress={() => router.push('/donate')}
                    />
                </View>
            </View>

            {/* Active Request */}
            <View className="mt-6 px-4">
                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Yêu cầu đang xử lý
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: '/profile',
                            params: { view: 'requests' },
                        })
                    }
                    className="overflow-hidden rounded-xl shadow-sm"
                    style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
                >
                    <View
                        className="h-32 items-center justify-center"
                        style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6' }}
                    >
                        <Ionicons name="map" size={40} color={colors.textSecondary} />
                    </View>
                    <View className="p-4">
                        <View className="mb-2 flex-row items-center gap-2">
                            <View className="rounded-full bg-green-100 px-2 py-0.5">
                                <Text className="text-xs font-bold text-green-700">
                                    Đang xử lý
                                </Text>
                            </View>
                        </View>
                        <Text className="text-lg font-bold" style={{ color: colors.text }}>Yêu cầu cứu trợ #001</Text>
                        <Text className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
                            Lương thực, Y tế
                        </Text>
                        <View
                            className="mt-3 flex-row items-center gap-2 rounded-lg p-2"
                            style={{ backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff' }}
                        >
                            <Ionicons name="car" size={18} color={colors.primary} />
                            <Text
                                className="text-sm font-medium"
                                style={{ color: isDark ? '#93c5fd' : colors.primary }}
                            >
                                Đội cứu hộ đang đến - 15 phút
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function QuickActionCard({
    icon,
    label,
    color,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    color: 'primary' | 'green' | 'orange';
    onPress: () => void;
}) {
    const bgColor = color === 'primary' ? 'bg-primary' : color === 'green' ? 'bg-green-600' : 'bg-orange-500';




    // Pulse animation for add-circle
    const pulseAnim = useRef(new Animated.Value(1)).current;
    // Jump animation for location
    const jumpAnim = useRef(new Animated.Value(0)).current;
    const outlineAnim = useRef(new Animated.Value(0)).current;
    const outlineScale = outlineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.8],
    });

    const outlineOpacity = outlineAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0.5, 0.3, 0],
    });
    useEffect(() => {
        if (icon === 'add-circle') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: 800,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }),

                ])
            ).start();
            // Outline pulse
            Animated.loop(
                Animated.sequence([
                    Animated.timing(outlineAnim, {
                        toValue: 1,
                        duration: 1600,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(outlineAnim, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else if (icon === 'location') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(jumpAnim, {
                        toValue: -4,
                        duration: 600,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(jumpAnim, {
                        toValue: 0,
                        duration: 600,
                        easing: Easing.in(Easing.quad),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [icon]);

    const animatedStyle = icon === 'add-circle'
        ? { transform: [{ scale: pulseAnim }] }
        : icon === 'location'
            ? { transform: [{ translateY: jumpAnim }] }
            : {};

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className={`flex-1 items-center justify-center gap-2 rounded-xl ${bgColor} p-6 shadow-lg shadow-black/10`}
        >
            <View className="relative items-center justify-center">
                {/* OUTLINE */}
                <Animated.View
                    pointerEvents="none"
                    style={{
                        position: 'absolute',
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,0.9)',
                        opacity: outlineOpacity,
                        transform: [{ scale: outlineScale }],
                    }}
                />

                {/* ICON PULSE */}
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <Ionicons name={`${icon}`} size={32} color="#fff" />
                </Animated.View>
            </View>
            <Text className="font-bold text-white text-center">{label}</Text>
        </TouchableOpacity>
    );
}
