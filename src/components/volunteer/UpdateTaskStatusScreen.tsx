import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type StatusType = 'on_the_way' | 'delivered' | 'failed';

interface UpdateTaskStatusScreenProps {
    onBack?: () => void;
}

export default function UpdateTaskStatusScreen({
    onBack,
}: UpdateTaskStatusScreenProps = {}) {
    const { top, bottom } = useSafeAreaInsets();
    const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
    const [notes, setNotes] = useState('');

    const statusOptions = [
        {
            id: 'on_the_way' as StatusType,
            title: 'Đang di chuyển',
            subtitle: 'Đang trên đường tới điểm cứu trợ',
            icon: 'car',
            color: 'blue',
            bgColor: 'bg-blue-100',
            textColor: 'text-primary',
            borderColor: 'border-primary',
            ringColor: 'ring-primary',
        },
        {
            id: 'delivered' as StatusType,
            title: 'Đã giao hàng',
            subtitle: 'Hàng hóa đã được trao tận tay',
            icon: 'checkmark-circle',
            color: 'green',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            borderColor: 'border-green-500',
            ringColor: 'ring-green-500',
        },
        {
            id: 'failed' as StatusType,
            title: 'Thất bại / Bị chặn',
            subtitle: 'Không thể tiếp cận địa điểm',
            icon: 'ban',
            color: 'orange',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-500',
            borderColor: 'border-orange-500',
            ringColor: 'ring-orange-500',
        },
    ];

    return (
        <View className="flex-1 bg-background-light">
            {/* Header */}
            <View
                style={{ paddingTop: top }}
                className="flex-row items-center justify-between border-b border-gray-100 bg-background-light px-4 pb-2"
            >
                <TouchableOpacity
                    onPress={onBack}
                    className="h-10 w-10 items-center justify-center rounded-full"
                >
                    <Ionicons name="arrow-back" size={24} color="#111418" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-lg font-bold leading-tight tracking-tight">
                    Cập nhật tiến độ
                </Text>
                <View className="w-10" />
            </View>

            <ScrollView
                style={{ paddingBottom: bottom + 100 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Task Summary Card */}
                <View className="p-4">
                    <View className="flex-row items-stretch justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <View className="flex-[2] flex-col justify-center gap-1">
                            <View className="mb-1 inline-flex items-center gap-2">
                                <View className="rounded bg-blue-100 px-2 py-0.5">
                                    <Text className="text-xs font-bold text-blue-800">
                                        ƯU TIÊN CAO
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-base font-bold leading-tight">
                                #RELIEF-204
                            </Text>
                            <Text className="text-sm font-normal leading-normal text-text-secondary">
                                Nguyễn Văn A - Xã Lộc Yên
                            </Text>
                            <View className="mt-1 flex-row items-center gap-1 text-text-secondary">
                                <Ionicons name="location" size={14} color="#617589" />
                                <Text className="text-xs">Cách đây 2.5km</Text>
                            </View>
                        </View>
                        <View className="h-24 w-24 flex-none items-center justify-center rounded-lg border border-gray-100 bg-gray-200">
                            <Ionicons name="map" size={40} color="#6b7280" />
                        </View>
                    </View>
                </View>

                {/* Status Section */}
                <View>
                    <Text className="px-4 pb-3 pt-2 text-left text-lg font-bold leading-tight tracking-tight">
                        Trạng thái hiện tại
                    </Text>
                    <View className="flex-col gap-3 px-4">
                        {statusOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => setSelectedStatus(option.id)}
                                className={`relative flex-row items-center gap-4 rounded-xl border bg-white p-4 ${selectedStatus === option.id
                                    ? `${option.borderColor} ring-1 ${option.ringColor}`
                                    : 'border-gray-200'
                                    }`}
                            >
                                <View
                                    className={`h-5 w-5 rounded-full border-2 ${selectedStatus === option.id
                                        ? option.borderColor
                                        : 'border-gray-300 bg-transparent'
                                        }`}
                                >
                                    {selectedStatus === option.id && (
                                        <View
                                            className={`h-full w-full items-center justify-center rounded-full ${option.color === 'blue'
                                                ? 'bg-primary'
                                                : option.color === 'green'
                                                    ? 'bg-green-500'
                                                    : 'bg-orange-500'
                                                }`}
                                        >
                                            <View className="h-3 w-3 rounded-full bg-white" />
                                        </View>
                                    )}
                                </View>
                                <View
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${option.bgColor} ${option.textColor}`}
                                >
                                    <Ionicons
                                        name={option.icon as any}
                                        size={20}
                                        color={
                                            option.color === 'blue'
                                                ? '#137fec'
                                                : option.color === 'green'
                                                    ? '#16a34a'
                                                    : '#f97316'
                                        }
                                    />
                                </View>
                                <View className="flex grow flex-col">
                                    <Text className="text-sm font-bold leading-normal">
                                        {option.title}
                                    </Text>
                                    <Text className="text-xs font-normal leading-normal text-text-secondary">
                                        {option.subtitle}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Evidence Section */}
                <View>
                    <Text className="px-4 pb-3 pt-6 text-left text-lg font-bold leading-tight tracking-tight">
                        Hình ảnh chứng thực
                    </Text>
                    <View className="px-4">
                        <View className="flex-row gap-3 overflow-x-auto pb-2">
                            {/* Upload Button */}
                            <TouchableOpacity className="h-28 w-28 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white">
                                <Ionicons name="camera" size={30} color="#137fec" />
                                <Text className="mt-1 text-xs font-medium text-primary">
                                    Thêm ảnh
                                </Text>
                            </TouchableOpacity>
                            {/* Preview Image */}
                            <View className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                <View className="h-full w-full items-center justify-center bg-gray-200">
                                    <Ionicons name="image" size={40} color="#6b7280" />
                                </View>
                                <TouchableOpacity className="absolute right-1 top-1 rounded-full bg-black/50 p-1">
                                    <Ionicons name="close" size={12} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notes Section */}
                <View className="mb-4">
                    <Text className="px-4 pb-3 pt-4 text-left text-lg font-bold leading-tight tracking-tight">
                        Ghi chú
                    </Text>
                    <View className="px-4">
                        <TextInput
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Nhập tình trạng đường đi, lý do thất bại hoặc ghi chú thêm (tùy chọn)..."
                            placeholderTextColor="#617589"
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            className="min-h-[120px] w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm"
                        />
                    </View>
                </View>

                {/* Extra spacing */}
                <View className="h-8" />
            </ScrollView>

            {/* Sticky Footer */}
            <View
                style={{ paddingBottom: bottom + 16 }}
                className="absolute bottom-0 left-0 right-0 z-20 border-t border-gray-100 bg-white p-4 shadow-lg"
            >
                <TouchableOpacity className="flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 shadow-lg shadow-blue-500/30">
                    <Text className="text-base font-bold tracking-tight text-white">
                        Cập nhật trạng thái
                    </Text>
                    <Ionicons name="send" size={16} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
