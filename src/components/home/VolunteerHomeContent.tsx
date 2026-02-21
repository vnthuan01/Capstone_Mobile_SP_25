import '@/global.css';
import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VolunteerHomeContent() {
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();
    const { colors, isDark } = useTheme();

    return (
        <View style={{ paddingBottom: bottom + 20 }}>
            {/* Quick Stats */}
            <View className="mt-6 px-4">
                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Thống kê hôm nay
                </Text>
                <View className="flex-row gap-3">
                    <StatCard
                        icon="checkmark-circle"
                        label="Hoàn thành"
                        value="12"
                        color="green"
                    />
                    <StatCard
                        icon="time"
                        label="Đang thực hiện"
                        value="3"
                        color="blue"
                    />
                    <StatCard icon="list" label="Chờ xử lý" value="5" color="orange" />
                </View>
            </View>

            {/* Current Mission */}
            <View className="mt-6 px-4">
                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Nhiệm vụ hiện tại
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/tasks')}
                    className="overflow-hidden rounded-xl shadow-sm border"
                    style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                    <View
                        className="h-32 items-center justify-center"
                        style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6' }}
                    >
                        <Ionicons name="location" size={40} color={colors.primary} />
                    </View>
                    <View className="p-4">
                        <View className="mb-2 flex-row items-center gap-2">
                            <View className="rounded-full bg-amber-100 px-2 py-0.5">
                                <Text className="text-xs font-bold text-amber-700">
                                    Ưu tiên cao
                                </Text>
                            </View>
                        </View>
                        <Text className="text-lg font-bold" style={{ color: colors.text }}>
                            Cứu trợ lương thực - Khu vực A
                        </Text>
                        <Text className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
                            123 Đường Trần Phú, Quận Hải Châu
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View className="mt-6 px-4">
                <Text
                    className="mb-3 text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Thao tác nhanh
                </Text>
                <View className="flex-row flex-wrap gap-3">
                    <QuickAction
                        icon="alert-circle"
                        label="Báo cáo"
                        onPress={() => { }}
                    />
                    <QuickAction
                        icon="heart"
                        label="Ủng hộ"
                        onPress={() => router.push('/donate')}
                    />
                </View>
            </View>
        </View>
    );
}

function QuickAction({
    icon,
    label,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
}) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            className="h-28 w-[48%] items-center justify-center gap-2 rounded-xl shadow-sm border"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
            <Ionicons name={icon} size={28} color="#DA251D" />
            <Text className="text-sm font-semibold" style={{ color: colors.text }}>{label}</Text>
        </TouchableOpacity>
    );
}

function StatCard({
    icon,
    label,
    value,
    color,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    color: 'green' | 'blue' | 'orange';
}) {
    const { colors, isDark } = useTheme();

    // Determine the background and icon colors based on the theme and base color
    let backgroundColor;
    let iconColor;
    let textColor;

    if (color === 'green') {
        backgroundColor = isDark ? 'rgba(34, 197, 94, 0.15)' : '#f0fdf4';
        iconColor = isDark ? '#4ade80' : '#16a34a';
        textColor = isDark ? '#86efac' : '#15803d';
    } else if (color === 'blue') {
        backgroundColor = isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff';
        iconColor = isDark ? '#60a5fa' : '#1565C0';
        textColor = isDark ? '#93c5fd' : '#1d4ed8';
    } else {
        backgroundColor = isDark ? 'rgba(249, 115, 22, 0.15)' : '#fff7ed';
        iconColor = isDark ? '#fb923c' : '#f97316';
        textColor = isDark ? '#fdba74' : '#c2410c';
    }

    return (
        <View
            className="flex-1 items-center rounded-xl p-4 shadow-sm border"
            style={{ backgroundColor, borderColor: colors.border }}
        >
            <Ionicons name={icon} size={28} color={iconColor} />
            <Text
                className="mt-2 text-2xl font-bold"
                style={{ color: colors.text }}
            >
                {value}
            </Text>
            <Text
                className="mt-1 text-xs text-center"
                style={{ color: colors.textSecondary }}
            >
                {label}
            </Text>
        </View>
    );
}
