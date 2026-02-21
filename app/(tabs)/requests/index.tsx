import Header from '@/src/components/header/header';
import ViewRequestRescueScreen from '@/src/components/user/ViewRequestRescueScreen';
import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RequestsScreenType = 'list' | 'detail';

interface RequestsScreenProps {
    onBack?: () => void;
}

export default function RequestsScreen({ onBack }: RequestsScreenProps) {
    const { bottom } = useSafeAreaInsets();
    const [currentScreen, setCurrentScreen] =
        useState<RequestsScreenType>('list');

    const { colors, isDark } = useTheme();

    // Styles
    const mapPlaceholderBg = isDark ? 'bg-gray-700' : 'bg-gray-200'; // Keep or refactor inline

    if (currentScreen === 'detail') {
        return (
            <ViewRequestRescueScreen onBack={() => setCurrentScreen('list')} />
        );
    }

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
            <Header
                title="Theo dõi yêu cầu"
                subtitle="Danh sách yêu cầu cứu trợ của bạn"
                onBack={onBack}
            />

            <ScrollView
                contentContainerStyle={{ paddingBottom: bottom + 96 }}
                className="flex-1"
            >

                {/* Active Request */}
                <View className="mt-4 px-4">
                    <Text className="mb-3 text-base font-bold" style={{ color: colors.text }}>Đang hoạt động</Text>
                    <TouchableOpacity
                        onPress={() => setCurrentScreen('detail')}
                        className="overflow-hidden rounded-xl shadow-sm"
                        style={{ backgroundColor: colors.card }}
                    >
                        {/* Map Preview */}
                        <View className={`h-32 items-center justify-center ${mapPlaceholderBg}`}>
                            <Ionicons name="map" size={40} color="#6b7280" />
                        </View>

                        {/* Request Info */}
                        <View className="p-4">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1">
                                    <View className="mb-2 flex-row items-center gap-2">
                                        <View className="rounded-full bg-green-100 px-2 py-0.5">
                                            <Text className="text-xs font-bold text-green-700">
                                                Đang xử lý
                                            </Text>
                                        </View>
                                        <View className="rounded-full bg-amber-100 px-2 py-0.5">
                                            <Text className="text-xs font-bold text-amber-700">
                                                Khẩn cấp
                                            </Text>
                                        </View>
                                    </View>

                                    <Text className="text-lg font-bold" style={{ color: colors.text }}>Yêu cầu cứu trợ #001</Text>
                                    <Text className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
                                        Lương thực, Y tế
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
                            </View>

                            {/* Status */}
                            <View className={`mt-3 flex-row items-center gap-2 rounded-lg p-3 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                                <Ionicons name="car" size={20} color={colors.primary} />
                                <Text className={`flex-1 text-sm font-medium ${isDark ? 'text-blue-300' : 'text-primary'}`}>
                                    Đội cứu hộ đang đến - Dự kiến 15 phút
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Past Requests */}
                <View className="mt-6 px-4">
                    <Text className="mb-3 text-base font-bold" style={{ color: colors.text }}>Lịch sử</Text>

                    <View className="gap-3">
                        <RequestHistoryItem
                            id="#002"
                            status="Hoàn thành"
                            statusColor="green"
                            type="Cứu hộ"
                            date="15/01/2026"
                        />
                        <RequestHistoryItem
                            id="#003"
                            status="Đã hủy"
                            statusColor="red"
                            type="Chỗ ở"
                            date="14/01/2026"
                        />
                    </View>
                </View>

                {/* Emergency Button */}
                <View className="mt-8 px-4">
                    <TouchableOpacity className="h-16 flex-row items-center justify-center gap-3 rounded-xl bg-red-600">
                        <Ionicons name="warning" size={26} color="#fff" />
                        <Text className="text-xl font-black text-white">SOS – KHẨN CẤP</Text>
                    </TouchableOpacity>

                    <Text className="mt-2 text-center text-xs text-gray-400">
                        Nhấn để gửi tín hiệu khẩn cấp
                    </Text>
                </View>
            </ScrollView >
        </View >
    );
}

function RequestHistoryItem({
    id,
    status,
    statusColor,
    type,
    date,
}: {
    id: string;
    status: string;
    statusColor: 'green' | 'gray' | 'red';
    type: string;
    date: string;
    // isDark prop removed as we use hook
}) {
    const { colors, isDark } = useTheme();

    // Derived styles based on statusColor
    const bgColor = statusColor === 'green' ? 'bg-green-50' : 'bg-gray-50';
    const textColor =
        statusColor === 'green' ? 'text-green-700' : statusColor === 'red' ? 'text-red-700' : 'text-gray-700';

    return (
        <TouchableOpacity
            className="flex-row items-center justify-between rounded-xl p-4 shadow-sm"
            style={{ backgroundColor: colors.card }}
        >
            <View className="flex-1">
                <View className="mb-1 flex-row items-center gap-2">
                    <View className={`rounded-full ${bgColor} px-2 py-0.5`}>
                        <Text className={`text-xs font-bold ${textColor}`}>{status}</Text>
                    </View>
                </View>
                <Text className="font-bold" style={{ color: colors.text }}>{id}</Text>
                <Text className="mt-0.5 text-sm" style={{ color: colors.textSecondary }}>
                    {type} • {date}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        </TouchableOpacity>
    );
}
