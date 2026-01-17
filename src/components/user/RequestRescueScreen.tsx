import '@/global.css';
import Header from '@/src/components/header/header';
import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NeedType = 'food' | 'medical' | 'rescue' | 'shelter';
type UrgencyLevel = 'normal' | 'critical';

interface RequestRescueScreenProps {
    onBack?: () => void;
}

export default function RequestRescueScreen({
    onBack,
}: RequestRescueScreenProps) {
    const { bottom } = useSafeAreaInsets();
    const { mode } = useThemeStore();
    const isDark = mode === 'dark';

    // Theme Styles
    const bgClass = isDark ? 'bg-gray-900' : 'bg-background-light';
    const cardBgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-black';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';
    const inputBgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const mapPlaceholderBg = isDark ? 'bg-gray-700' : 'bg-gray-200';

    const [selectedNeed, setSelectedNeed] = useState<NeedType | null>(null);
    const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
    const [peopleCount, setPeopleCount] = useState(1);

    const needTypes = [
        {
            id: 'food' as NeedType,
            title: 'Lương thực',
            subtitle: 'Đồ ăn, nước uống',
            icon: 'restaurant',
        },
        {
            id: 'medical' as NeedType,
            title: 'Y tế',
            subtitle: 'Thuốc, sơ cứu',
            icon: 'medical',
        },
        {
            id: 'rescue' as NeedType,
            title: 'Cứu hộ',
            subtitle: 'Cần di tản gấp',
            icon: 'boat',
        },
        {
            id: 'shelter' as NeedType,
            title: 'Chỗ ở',
            subtitle: 'Lều trại, nơi trú',
            icon: 'home',
        },
    ];

    return (
        <View className={`flex-1 ${bgClass}`}>
            <Header title="Gửi yêu cầu cứu trợ" center onBack={onBack} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottom + 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Need Type Selection */}
                <View className="px-4 pb-4 pt-6">
                    <Text className="pb-2 text-left text-[22px] font-bold">
                        Bạn cần hỗ trợ gì?
                    </Text>
                    <Text className="pb-4 text-sm text-text-secondary">
                        Chọn loại hình cứu trợ quan trọng nhất
                    </Text>

                    <View className="flex-row flex-wrap gap-3">
                        {needTypes.map((need) => (
                            <TouchableOpacity
                                key={need.id}
                                onPress={() => setSelectedNeed(need.id)}
                                className={`w-[48%] overflow-hidden rounded-xl border-2 p-2 ${selectedNeed === need.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-transparent'
                                    }`}
                            >
                                <View className="mb-3 aspect-[4/3] items-center justify-center rounded-lg bg-gray-200">
                                    <Ionicons
                                        name={need.icon as any}
                                        size={40}
                                        color="#137fec"
                                    />
                                </View>
                                <View>
                                    <Text className="text-base font-bold">{need.title}</Text>
                                    <Text className="text-sm text-text-secondary">
                                        {need.subtitle}
                                    </Text>
                                </View>
                                {selectedNeed === need.id && (
                                    <View className="absolute right-4 top-4 h-6 w-6 items-center justify-center rounded-full bg-white">
                                        <Ionicons name="checkmark" size={16} color="#137fec" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="my-2 h-2 bg-gray-50" />

                {/* Urgency Level */}
                <View className="flex-col px-4 py-4">
                    <Text className="pb-3 text-lg font-bold leading-tight">
                        Mức độ khẩn cấp
                    </Text>
                    <View className="flex-row rounded-xl bg-surface p-1">
                        <TouchableOpacity
                            onPress={() => setUrgency('normal')}
                            className={`flex-1 items-center justify-center rounded-lg py-3 ${urgency === 'normal' ? 'bg-white shadow-sm' : ''
                                }`}
                        >
                            <Text
                                className={`font-medium ${urgency === 'normal' ? 'text-[#111418]' : 'text-text-secondary'
                                    }`}
                            >
                                Bình thường
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setUrgency('critical')}
                            className={`flex-1 flex-row items-center justify-center rounded-lg py-3 ${urgency === 'critical' ? 'bg-red-500 shadow-md' : ''
                                }`}
                        >
                            {urgency === 'critical' && (
                                <Ionicons name="warning" size={20} color="#fff" />
                            )}
                            <Text
                                className={`ml-1 font-medium ${urgency === 'critical' ? 'text-white' : 'text-text-secondary'
                                    }`}
                            >
                                Khẩn cấp
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="my-2 h-2 bg-gray-50" />

                {/* Details Section */}
                <View className="flex-col gap-6 px-4 py-4">
                    {/* People Counter */}
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-base font-bold">Số người bị ảnh hưởng</Text>
                            <Text className="text-sm text-text-secondary">
                                Bao gồm cả trẻ em & người già
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3 rounded-lg bg-surface p-1">
                            <TouchableOpacity
                                onPress={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                                className="h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm"
                            >
                                <Ionicons name="remove" size={20} color="#111418" />
                            </TouchableOpacity>
                            <Text className="w-6 text-center text-lg font-bold">
                                {peopleCount}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setPeopleCount(peopleCount + 1)}
                                className="h-10 w-10 items-center justify-center rounded-md bg-primary shadow-sm"
                            >
                                <Ionicons name="add" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Location */}
                    <View className="flex-col gap-2">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-base font-bold">Vị trí hiện tại</Text>
                            <View className="flex-row items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                                <Ionicons name="location" size={14} color="#16a34a" />
                                <Text className="text-xs font-medium text-green-600">
                                    Đã tự động định vị
                                </Text>
                            </View>
                        </View>
                        <View className="relative aspect-[3/1] w-full overflow-hidden rounded-xl bg-gray-200">
                            <View className="h-full w-full items-center justify-center">
                                <Ionicons name="map" size={40} color="#6b7280" />
                            </View>
                            <View className="absolute inset-0 items-center justify-center">
                                <Ionicons name="location" size={40} color="#ef4444" />
                            </View>
                        </View>
                        <View className="mt-1 flex-row items-start gap-2">
                            <Ionicons name="navigate" size={20} color="#617589" />
                            <Text className="text-sm font-medium">
                                123 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội (Độ chính xác: 5m)
                            </Text>
                        </View>
                    </View>

                    {/* Media Upload */}
                    <View className="flex-col gap-2">
                        <Text className="text-base font-bold">Hình ảnh/Video xác thực</Text>
                        <TouchableOpacity className="h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-surface">
                                <Ionicons name="camera" size={20} color="#111418" />
                            </View>
                            <Text className="text-sm font-medium text-text-secondary">
                                Chạm để chụp hoặc tải lên
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View
                style={{ paddingBottom: bottom + 16 }}
                className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4"
            >
                <TouchableOpacity className="h-12 w-full flex-row gap-2 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-lg shadow-blue-500/30">
                    <Text className="text-base font-bold leading-normal text-white">
                        GỬI YÊU CẦU NGAY
                    </Text>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
                <View className="mt-1 flex-row items-center justify-center gap-1">
                    <Ionicons name="sparkles" size={14} color="#617589" />
                    <Text className="text-center text-xs text-text-secondary">
                        AI sẽ ưu tiên xử lý dựa trên mức độ khẩn cấp
                    </Text>
                </View>
            </View>
        </View>
    );
}
