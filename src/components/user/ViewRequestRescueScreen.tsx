import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface ViewRequestRescueScreenProps {
    onBack?: () => void;
}

export default function ViewRequestRescueScreen({
    onBack,
}: ViewRequestRescueScreenProps = {}) {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-background-light">
            {/* Header */}
            <View
                style={{ paddingTop: top }}
                className="flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-4"
            >
                <TouchableOpacity
                    onPress={onBack}
                    className="h-12 w-12 items-center justify-center rounded-full"
                >
                    <Ionicons name="arrow-back" size={24} color="#111418" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-lg font-bold">
                    Theo dõi yêu cầu
                </Text>
                <View className="w-12" />
            </View>

            <ScrollView
                style={{ paddingBottom: bottom + 120 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Map Section */}
                <View className="relative h-64 w-full bg-gray-200">
                    <View className="h-full w-full items-center justify-center">
                        <Ionicons name="map" size={60} color="#6b7280" />
                    </View>
                    {/* Gradient Overlay */}
                    <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white" />
                    {/* ETA Badge */}
                    <View className="absolute bottom-4 left-4 flex-row items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-lg">
                        <Ionicons name="time" size={20} color="#137fec" />
                        <View>
                            <Text className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                Dự kiến đến
                            </Text>
                            <Text className="text-sm font-bold">15 phút</Text>
                        </View>
                    </View>
                </View>

                {/* Status Headline */}
                <View className="px-4 pb-2 pt-4">
                    <Text className="text-[26px] font-bold leading-tight">
                        Đội cứu hộ đang đến
                    </Text>
                    <Text className="mt-1 text-sm text-gray-500">
                        Đừng lo lắng, chúng tôi đang trên đường tới vị trí của bạn.
                    </Text>
                </View>

                {/* Volunteer Card */}
                <View className="p-4">
                    <View className="flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                        <View className="flex-row items-center gap-4">
                            <View className="relative">
                                <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gray-300 shadow-sm">
                                    <Ionicons name="person" size={28} color="#137fec" />
                                </View>
                                <View className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold">Nguyễn Văn A</Text>
                                <View className="flex-row items-center gap-1">
                                    <Ionicons name="checkmark-circle" size={18} color="#137fec" />
                                    <Text className="text-sm font-medium text-primary">
                                        Tình nguyện viên
                                    </Text>
                                </View>
                                <Text className="mt-0.5 text-xs text-gray-500">
                                    Xe bán tải • 29C-123.45
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary shadow-sm shadow-blue-200">
                                <Ionicons name="call" size={20} color="#fff" />
                                <Text className="font-bold text-white">Gọi điện</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white">
                                <Ionicons name="chatbubble-outline" size={20} color="#111418" />
                                <Text className="font-bold">Nhắn tin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="my-2 h-2 w-full bg-gray-100" />

                {/* Timeline Progress */}
                <View className="px-4 py-4">
                    <Text className="mb-4 text-lg font-bold">Tiến trình</Text>
                    <View className="relative flex-col gap-0">
                        {/* Step 3 - Current */}
                        <View className="flex-row gap-4">
                            <View className="flex-col items-center">
                                <View className="z-10 h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md">
                                    <Ionicons name="car" size={18} color="#fff" />
                                </View>
                                <View className="my-1 w-0.5 flex-1 bg-gray-200" />
                            </View>
                            <View className="flex-1 pb-6">
                                <View className="flex-row items-start justify-between">
                                    <Text className="text-base font-bold">
                                        Đội cứu hộ đang di chuyển
                                    </Text>
                                    <View className="rounded-md bg-primary/10 px-2 py-1">
                                        <Text className="text-xs font-bold text-primary">
                                            Hiện tại
                                        </Text>
                                    </View>
                                </View>
                                <Text className="mt-1 text-sm text-gray-500">
                                    Đang cách bạn 3.5km
                                </Text>
                            </View>
                        </View>

                        {/* Step 2 - Completed */}
                        <View className="flex-row gap-4">
                            <View className="flex-col items-center">
                                <View className="z-10 h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                    <Ionicons name="checkmark" size={18} color="#fff" />
                                </View>
                                <View className="my-1 w-0.5 flex-1 bg-green-500" />
                            </View>
                            <View className="flex-1 pb-6 opacity-70">
                                <View className="flex-row items-start justify-between">
                                    <Text className="text-base font-medium">
                                        Đã phân công tình nguyện viên
                                    </Text>
                                    <Text className="text-xs font-medium text-gray-400">
                                        09:15
                                    </Text>
                                </View>
                                <Text className="mt-1 text-sm text-gray-500">
                                    TNV Nguyễn Văn A đã nhận yêu cầu
                                </Text>
                            </View>
                        </View>

                        {/* Step 1 - Completed */}
                        <View className="flex-row gap-4">
                            <View className="flex-col items-center">
                                <View className="z-10 h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                    <Ionicons name="checkmark" size={18} color="#fff" />
                                </View>
                            </View>
                            <View className="flex-1 pb-2 opacity-70">
                                <View className="flex-row items-start justify-between">
                                    <Text className="text-base font-medium">
                                        Yêu cầu đã được gửi
                                    </Text>
                                    <Text className="text-xs font-medium text-gray-400">
                                        09:00
                                    </Text>
                                </View>
                                <Text className="mt-1 text-sm text-gray-500">
                                    Hệ thống đã ghi nhận vị trí của bạn
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom Actions */}
            <View
                style={{ paddingBottom: bottom + 16 }}
                className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/90 p-4"
            >
                <View className="flex-col gap-3">
                    <TouchableOpacity className="h-12 w-full flex-row items-center justify-center gap-2 rounded-xl border border-red-500 bg-white">
                        <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
                        <Text className="text-sm font-bold text-red-500">
                            Hủy yêu cầu cứu hộ
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-center text-xs text-gray-400">
                        Chỉ hủy nếu bạn đã an toàn hoặc không cần hỗ trợ nữa.
                    </Text>
                </View>
            </View>

            {/* SOS Floating Button */}
            {/* <TouchableOpacity className="absolute bottom-28 right-4 z-50 h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-lg">
                <Ionicons name="warning" size={28} color="#fff" />
            </TouchableOpacity> */}
        </View>
    );
}
