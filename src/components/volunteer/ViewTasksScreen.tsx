import '@/global.css';
import Header from '@/src/components/header/header';
import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ViewTasksScreenProps {
    onBack?: () => void;
}

export default function ViewTasksScreen({
    onBack,
}: ViewTasksScreenProps = {}) {
    const { bottom } = useSafeAreaInsets();
    const { colors, isDark } = useTheme();

    // Theme Styles
    const mapPlaceholderBg = isDark ? 'bg-gray-700' : 'bg-gray-200';
    const iconWrapperBg = isDark ? 'bg-gray-700' : 'bg-primary/10';

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
            <Header
                title="Chi tiết nhiệm vụ"
                onBack={onBack}
                center
            />

            <ScrollView
                contentContainerStyle={{ paddingBottom: bottom + 120 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Citizen Info Card */}
                <View className="p-4">
                    <View
                        className="flex-col gap-4 rounded-xl p-5 shadow-sm"
                        style={{ backgroundColor: colors.card }}
                    >
                        {/* Header with Priority Badge */}
                        <View className="flex-row items-start justify-between">
                            <View className="flex-col gap-1">
                                <View className="mb-1 flex-row items-center gap-2">
                                    <View className="flex-row items-center rounded-full bg-amber-100 px-2.5 py-0.5">
                                        <Ionicons
                                            name="alert-circle"
                                            size={14}
                                            color="#d97706"
                                            style={{ marginRight: 4 }}
                                        />
                                        <Text className="text-xs font-bold text-amber-800">
                                            Ưu tiên cao
                                        </Text>
                                    </View>
                                    <View className="rounded-full bg-blue-50 px-2.5 py-0.5">
                                        <Text className="text-xs font-medium text-blue-700">
                                            Mới
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-xl font-bold leading-tight" style={{ color: colors.text }}>
                                    Nguyễn Văn A
                                </Text>
                            </View>
                            <TouchableOpacity className={`h-10 w-10 items-center justify-center rounded-full ${iconWrapperBg}`}>
                                <Ionicons name="call" size={20} color={colors.primary} />
                            </TouchableOpacity>
                        </View>

                        {/* Address */}
                        <View className="flex-row items-start gap-3 text-sm">
                            <Ionicons
                                name="location"
                                size={20}
                                color="#617589"
                                style={{ marginTop: 2 }}
                            />
                            <Text className="flex-1 font-normal leading-normal" style={{ color: colors.text }}>
                                123 Đường Trần Phú, Quận Hải Châu, Đà Nẵng
                            </Text>
                        </View>

                        {/* Separator */}
                        <View className={`h-px w-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />

                        {/* Request Details */}
                        <View className="grid grid-cols-1 gap-4">
                            <View className="flex-col gap-1">
                                <Text className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                                    Loại hỗ trợ
                                </Text>
                                <View className="flex-row flex-wrap gap-2">
                                    <View className="flex-row items-center gap-1 rounded bg-red-50 px-2 py-1">
                                        <Ionicons name="medical" size={16} color="#b91c1c" />
                                        <Text className="text-sm font-medium text-red-700">
                                            Y tế
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center gap-1 rounded bg-green-50 px-2 py-1">
                                        <Ionicons name="restaurant" size={16} color="#15803d" />
                                        <Text className="text-sm font-medium text-green-700">
                                            Lương thực
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View className="flex-col gap-1">
                                <Text className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                                    Ghi chú
                                </Text>
                                <View
                                    className="rounded-lg border p-3"
                                    style={{
                                        borderColor: colors.border,
                                        backgroundColor: isDark ? colors.card : '#f9fafb'
                                    }}
                                >
                                    <Text className="text-sm font-normal leading-relaxed" style={{ color: colors.text }}>
                                        "Gia đình có người già và trẻ nhỏ, nước đang dâng cao khoảng
                                        0.5m trước cửa nhà."
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Map & Route Section */}
                <View className="px-4 pb-4">
                    <View className="flex-col gap-3">
                        <Text className="px-1 text-base font-bold" style={{ color: colors.text }}>Lộ trình di chuyển</Text>
                        <View
                            className="group relative h-64 w-full overflow-hidden rounded-xl border shadow-sm"
                            style={{ borderColor: colors.border }}
                        >
                            {/* AI Route Badge */}
                            <View className={`absolute left-3 top-3 z-10 flex-row items-center gap-2 rounded-lg border border-blue-100 px-3 py-1.5 shadow-sm backdrop-blur-sm ${isDark ? 'bg-gray-900/90' : 'bg-white/90'}`}>
                                <Ionicons name="sparkles" size={18} color={colors.primary} />
                                <Text className="text-xs font-bold text-primary">AI Gợi ý</Text>
                            </View>

                            {/* Map Placeholder */}
                            <View className={`h-full w-full items-center justify-center ${mapPlaceholderBg}`}>
                                <Ionicons name="map" size={60} color="#6b7280" />
                            </View>

                            {/* Location Button */}
                            <View
                                className="absolute bottom-3 right-3 z-10 rounded-lg p-2 shadow-md"
                                style={{ backgroundColor: colors.card }}
                            >
                                <Ionicons name="locate" size={20} color="#6b7280" />
                            </View>
                        </View>

                        {/* Stats */}
                        <View className="grid grid-cols-2 gap-3">
                            <View
                                className="items-center rounded-xl border border-blue-100 p-3 text-center"
                                style={{ backgroundColor: isDark ? colors.card : '#eff6ff' }}
                            >
                                <Text className="text-2xl font-bold leading-tight text-primary">
                                    1.2 km
                                </Text>
                                <View className="flex-row items-center gap-1 text-gray-500">
                                    <Ionicons name="resize" size={16} color="#617589" />
                                    <Text className="text-xs font-medium uppercase">
                                        Khoảng cách
                                    </Text>
                                </View>
                            </View>
                            <View
                                className="items-center rounded-xl border border-blue-100 p-3 text-center"
                                style={{ backgroundColor: isDark ? colors.card : '#eff6ff' }}
                            >
                                <Text className="text-2xl font-bold leading-tight text-primary">
                                    5 phút
                                </Text>
                                <View className="flex-row items-center gap-1 text-gray-500">
                                    <Ionicons name="time" size={16} color="#617589" />
                                    <Text className="text-xs font-medium uppercase">Dự kiến</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom Actions */}
            <View
                style={{
                    paddingBottom: bottom + 16,
                    backgroundColor: isDark ? colors.background : '#ffffff',
                    borderTopColor: colors.border
                }}
                className="absolute bottom-0 left-0 w-full border-t p-4 pb-6 shadow-lg"
            >
                <View className="flex-row gap-3">
                    <TouchableOpacity
                        className="flex-1 flex-row items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-amber-500 px-4 py-3"
                        style={{ backgroundColor: colors.background }}
                    >
                        <Ionicons name="warning" size={20} color="#d97706" />
                        <Text className="font-bold text-amber-600">Báo sự cố</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-[2] flex-row items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 py-3 shadow-lg shadow-primary/30">
                        <Ionicons name="navigate" size={20} color="#fff" />
                        <Text className="font-bold text-white">Bắt đầu điều hướng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
