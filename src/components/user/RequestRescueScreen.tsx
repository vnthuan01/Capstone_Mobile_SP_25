import '@/global.css';
import Header from '@/src/components/header/header';
import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ImageBackground,
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
    const { colors } = useTheme();


    const [selectedNeed, setSelectedNeed] = useState<NeedType | null>(null);
    const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
    const [peopleCount, setPeopleCount] = useState(1);

    const needTypes = [
        {
            id: 'food' as NeedType,
            title: 'Lương thực',
            subtitle: 'Đồ ăn, nước uống',
            icon: 'restaurant',
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFX93A6fFIE7aJ-uWKAQ2XBj6drj0eOsVb4tITkmnPdNlmqbyVMQAL2AzmzSELzSqDJPMyoT9hplMDZsg0G4BAREqK9nZaLIFEmrkcLbBidC1TJFscwpOeRFvZLtPerKjbyjvFOhub8LAWyIdOv-1L77EwUKKgqWIb2KCzKmciMGSlgQS3y0Gk5UYO2QjJ46ZziRtctnEdpVX5p4BN9c899nYmv7DSB-PtAALeM_mh-A94Ju6ht-1EeTroKbES-LGFX1lTKSHYmVU"
        },
        {
            id: 'medical' as NeedType,
            title: 'Y tế',
            subtitle: 'Thuốc, sơ cứu',
            icon: 'medkit-sharp',
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHjfrV4x6qFLCYIhVwVPfP3EbRvVpde5xiD_gJ7EzeDkqFmelAbWzKMUH0uJ-K-kpMsIIosIRIQuVp3ngKPkL1PDSM48e4RRJzErDutEfqtFybM90mkV6L5sQsv8Mq8TqiiXFwdbfvrFHPZjsWlFK7B2tgo6_sxr9EovVSlUgO01mPSlzaRVzVpwruGd_EiwCbqON1XilZBT7-9XhrvgDsYjv3VLpuiNfSbbxv3nNNq3dv3bHJXQGyhhhMMijF__djit0FIL2poU"
        },
        {
            id: 'shelter' as NeedType,
            title: 'Chỗ ở',
            subtitle: 'Lều trại, nơi trú',
            icon: 'home',
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfAmxoMlngNsSAzEJ0fdw5Bm4rhgKedc3cb8BihtLzeuhALAf69vUbx27ztnJLVenJmM1YqnGevQcUdG2M4KC-FbsiTS5YgNCyCoJJpTCaZXihPPLv0u4Puwd3z2xwhD-7uiscw4FHYLlXovVNbiyi1Ml6R8hY-psa9nOG2a1A5wcawqiphoKBp169Kzd-PmYLQ9wLRnUvWF4BSVZqd8uBCsVSU_BMgBz34RmMLrh7M9AHG06Gk6-IQFg7bgmBHxFTkmHshe6aVMs"
        },
        {
            id: 'rescue' as NeedType,
            title: 'Khác*',
            subtitle: 'Nhu cầu khác',
            icon: 'medical',
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAXhLhHdhFoyT6UWv2ZLtm9hQrQGdfXriw3YqYaI-gP1JuQqxHnIJvyLqhk7SjQWnJ9yfcCmhdZsVA6-5VZkifYNMK-YgwrDtJWyxQW52LvOcVOByh1FB3x9QIWdJcKo6Xqya0uHWewA8ZnyjNiIPVMKqKWDyjS-q-d1p-U-8WyffWUG-L6gDIoPwjQa_EBuqlzlMvzEKq439M6UeV98ErcwgW79N_knDSZSS-iqlzdACjUKgHjKatT7I8Sd89Z2HJeQC0vjo0uoA"
        },
    ];

    return (
        <View className="flex-1" style={{ backgroundColor: colors.background }}>
            <Header title="Gửi yêu cầu cứu trợ" center onBack={onBack} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottom + 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Need Type Selection */}
                <View className="px-4 pb-4 pt-6">
                    <Text
                        className="pb-2 text-left text-[22px] font-bold"
                        style={{ color: colors.text }}
                    >
                        Bạn cần hỗ trợ gì?
                    </Text>
                    <Text
                        className="pb-4 text-sm"
                        style={{ color: colors.textSecondary }}
                    >
                        Chọn loại hình cứu trợ quan trọng nhất
                    </Text>

                    <View className="flex-row flex-wrap gap-3">
                        {needTypes.map((need) => (
                            <TouchableOpacity
                                key={need.id}
                                onPress={() => setSelectedNeed(need.id)}
                                className={`w-[48%] overflow-hidden rounded-xl border-2 p-2 ${selectedNeed === need.id
                                    ? `border-primary`
                                    : `border-transparent`
                                    }`}
                                style={{ backgroundColor: selectedNeed === need.id ? colors.card : 'transparent' }}
                            >
                                <View
                                    className="mb-3 aspect-[4/3] overflow-hidden rounded-lg border-2"
                                    style={{ borderColor: colors.border }}
                                >
                                    <ImageBackground
                                        source={{ uri: need.image }}
                                        className="h-full w-full items-center justify-center"
                                        resizeMode="cover"
                                    >
                                        <View className="absolute inset-0 bg-black/40" />
                                        <Ionicons
                                            name={need.icon as any}
                                            size={30}
                                            color="#fff" // Icons on images usually look better in white
                                            className='z-10 absolute top-1 left-1 opacity-50'
                                        />
                                        {selectedNeed === need.id && (
                                            <View className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full bg-white">
                                                <Ionicons name="checkmark" size={16} color={colors.primary} />
                                            </View>
                                        )}
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text className="text-base font-bold" style={{ color: colors.text }}>{need.title}</Text>
                                    <Text className="text-sm" style={{ color: colors.textSecondary }}>
                                        {need.subtitle}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="my-2 h-2" style={{ backgroundColor: colors.card, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }} />

                {/* Urgency Level */}
                <View className="flex-col px-4 py-4">
                    <Text
                        className="pb-3 text-lg font-bold leading-tight"
                        style={{ color: colors.text }}
                    >
                        Mức độ khẩn cấp
                    </Text>
                    <View
                        className="flex-row rounded-xl p-1 border-2"
                        style={{ borderColor: colors.border, backgroundColor: colors.card }}
                    >
                        <TouchableOpacity
                            onPress={() => setUrgency('normal')}
                            className={`flex-1 items-center justify-center rounded-lg py-3 ${urgency === 'normal' ? 'shadow-sm' : ''}`}
                            style={urgency === 'normal' ? { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 } : {}}
                        >
                            <Text
                                className="font-medium"
                                style={{ color: urgency === 'normal' ? colors.text : colors.textSecondary }}
                            >
                                Bình thường
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setUrgency('critical')}
                            className={`flex-1 flex-row items-center justify-center rounded-lg py-3 ${urgency === 'critical' ? 'shadow-md shadow-red-500/30' : ''}`}
                            style={urgency === 'critical' ? { backgroundColor: '#ef4444' } : {}}
                        >
                            {urgency === 'critical' && (
                                <Ionicons name="warning" size={18} color="#fff" />
                            )}
                            <Text
                                className="ml-1 font-medium"
                                style={{ color: urgency === 'critical' ? '#ffffff' : colors.textSecondary }}
                            >
                                Khẩn cấp
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="my-2 h-2" style={{ backgroundColor: colors.card, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }} />

                {/* Details Section */}
                <View className="flex-col gap-6 px-4 py-4">
                    {/* People Counter */}
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-base font-bold" style={{ color: colors.text }}>Số người bị ảnh hưởng</Text>
                            <Text className="text-sm" style={{ color: colors.textSecondary }}>
                                Bao gồm cả trẻ em & người già
                            </Text>
                        </View>
                        <View
                            className="flex-row items-center gap-3 rounded-lg p-1 border-2"
                            style={{ borderColor: colors.border, backgroundColor: colors.card }}
                        >
                            <TouchableOpacity
                                onPress={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                                className="h-10 w-10 items-center justify-center rounded-md shadow-sm"
                                style={{ backgroundColor: colors.background }}
                            >
                                <Ionicons name="remove" size={20} color={colors.text} />
                            </TouchableOpacity>
                            <Text className="w-6 text-center text-lg font-bold" style={{ color: colors.text }}>
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
                            <Text className="text-base font-bold" style={{ color: colors.text }}>Vị trí hiện tại</Text>
                            <View className="flex-row items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                                <Ionicons name="location" size={14} color="#16a34a" />
                                <Text className="text-xs font-medium text-green-600">
                                    Đã tự động định vị
                                </Text>
                            </View>
                        </View>
                        <View
                            className="relative aspect-[3/1] w-full overflow-hidden rounded-xl border"
                            style={{ backgroundColor: colors.card, borderColor: colors.border }}
                        >
                            <View className="h-full w-full items-center justify-center">
                                <Ionicons name="map" size={40} color={colors.textSecondary} />
                            </View>
                            <View className="absolute inset-0 items-center justify-center">
                                <Ionicons name="location" size={40} color="#ef4444" />
                            </View>
                        </View>
                        <View className="mt-1 flex-row items-start gap-2">
                            <Ionicons name="navigate" size={20} color={colors.primary} />
                            <Text className="text-sm font-medium" style={{ color: colors.text }}>
                                123 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội (Độ chính xác: 5m)
                            </Text>
                        </View>
                    </View>

                    {/* Media Upload */}
                    <View className="flex-col gap-2">
                        <Text className="text-base font-bold" style={{ color: colors.text }}>Hình ảnh/Video xác thực</Text>
                        <TouchableOpacity
                            className="h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed"
                            style={{ backgroundColor: colors.card, borderColor: colors.border }}
                        >
                            <View
                                className="h-8 w-8 items-center justify-center rounded-full"
                                style={{ backgroundColor: colors.card }}
                            >
                                <Ionicons name="camera" size={20} color={colors.textSecondary} />
                            </View>
                            <Text className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                                Chạm để chụp hoặc tải lên
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View
                style={{ paddingBottom: bottom + 16, backgroundColor: colors.card, borderTopColor: colors.border }}
                className="absolute bottom-0 left-0 right-0 border-t p-4 shadow-lg"
            >
                <TouchableOpacity className="h-12 w-full flex-row gap-2 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-lg shadow-blue-500/30">
                    <Text className="text-base font-bold leading-normal text-white">
                        GỬI YÊU CẦU NGAY
                    </Text>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
                <View className="mt-1 flex-row items-center justify-center gap-1">
                    <Ionicons name="sparkles" size={14} color={colors.textSecondary} />
                    <Text className="text-center text-xs" style={{ color: colors.textSecondary }}>
                        AI sẽ ưu tiên xử lý dựa trên mức độ khẩn cấp
                    </Text>
                </View>
            </View>
        </View>
    );
}
