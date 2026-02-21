import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';

interface CitizenProfileProps {
    onEdit?: () => void;
    onBack?: () => void;
    onLogout?: () => void;
    onNavigate?: (screen: 'profile' | 'requests' | 'tasks' | 'settings' | 'help') => void;
}

export default function CitizenProfile({ onEdit, onBack, onLogout, onNavigate }: CitizenProfileProps) {
    const { top, bottom } = useSafeAreaInsets();
    const user = useAuthStore((s) => s.user);

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            {/* Header Section */}
            <View className="relative bg-secondary pb-16 pt-4 dark:bg-[#1C252E]">
                <View
                    style={{ paddingTop: top }}
                    className="z-20 mb-4 flex-row items-center justify-between px-4"
                >
                    <View className="w-10 items-start justify-center">
                        {onBack && (
                            <TouchableOpacity
                                onPress={onBack}
                                className="rounded-full p-2 transition-colors hover:bg-white/10"
                            >
                                <Ionicons name="chevron-back" size={24} color="#ffffff" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text className="text-lg font-bold text-white">Cài đặt Tài khoản</Text>
                    <View className="w-10 items-end justify-center">
                        {/* Placeholder for symmetry */}
                    </View>
                </View>

                {/* Profile Info */}
                <View className="z-20 mt-2 items-center">
                    <View className="group relative mb-3 cursor-pointer">
                        <View
                            className="h-24 w-24 rounded-full border-4 border-white/20 bg-gray-200 shadow-lg"
                        >
                            {/* Placeholder for actual image */}
                            <View className="flex-1 items-center justify-center rounded-full bg-blue-900/50">
                                <Ionicons name="person" size={40} color="#ffffff" />
                            </View>
                        </View>
                        <View
                            className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-secondary bg-white shadow-sm dark:border-[#1C252E]"
                            accessibilityLabel="Xác thực"
                        >
                            <Ionicons name="shield-checkmark" size={14} color="#1565C0" />
                        </View>
                    </View>
                    <Text className="mb-1 text-xl font-bold text-white">{user?.full_name}</Text>
                    <View className="mt-1 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                        <Text className="text-sm font-normal text-white/80">ID: 123-456-789</Text>
                    </View>
                </View>

                {/* Bottom Curve */}
                <View className="absolute bottom-[-1px] left-0 h-10 w-full rounded-tl-3xl rounded-tr-3xl bg-background-light dark:bg-background-dark" />
            </View>

            {/* Scrollable Content */}
            <ScrollView
                className="z-10 -mt-2 flex-1 px-4"
                contentContainerStyle={{ paddingBottom: bottom + 120 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-col gap-6">
                    {/* Personal Info Section */}
                    <View>
                        <Text className="mb-2 px-2 text-sm font-bold uppercase tracking-wider text-[#637588] dark:text-gray-400">
                            Thông tin cá nhân
                        </Text>
                        <View className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#1C252E]">
                            <TouchableOpacity
                                onPress={onEdit}
                                className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                            >
                                <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <Ionicons name="document-text" size={20} className="text-[#424242] dark:text-gray-300" color="currentColor" />
                                </View>
                                <View className="flex-1 items-start">
                                    <Text className="text-base font-medium text-[#111418] dark:text-white">
                                        Cập nhật hồ sơ
                                    </Text>
                                    <Text className="mt-0.5 text-xs text-[#637588] dark:text-gray-400">
                                        Chỉnh sửa tên, địa chỉ, liên hệ
                                    </Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600"
                                    color="currentColor"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Security Section */}
                    <View>
                        <Text className="mb-2 px-2 text-sm font-bold uppercase tracking-wider text-[#637588] dark:text-gray-400">
                            Bảo mật & An toàn
                        </Text>
                        <View className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#1C252E]">
                            <View className="flex-col divide-y divide-gray-100 dark:divide-gray-800">
                                <TouchableOpacity className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Ionicons name="lock-closed" size={20} className="text-[#424242] dark:text-gray-300" color="currentColor" />
                                    </View>
                                    <View className="flex-1 items-start">
                                        <Text className="text-base font-medium text-[#111418] dark:text-white">
                                            Đổi mật khẩu
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600"
                                        color="currentColor"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Ionicons name="help-circle" size={20} className="text-[#424242] dark:text-gray-300" color="currentColor" />
                                    </View>
                                    <View className="flex-1 items-start">
                                        <Text className="text-base font-medium text-[#111418] dark:text-white">
                                            Thiết lập Câu hỏi Bảo mật
                                        </Text>
                                        <Text className="mt-0.5 text-xs text-[#637588] dark:text-gray-400">
                                            Dùng để khôi phục tài khoản
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600"
                                        color="currentColor"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Navigation Section */}
                    <View>
                        <Text className="mb-2 px-2 text-sm font-bold uppercase tracking-wider text-[#637588] dark:text-gray-400">
                            Chức năng & Hệ thống
                        </Text>
                        <View className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#1C252E]">
                            <View className="flex-col divide-y divide-gray-100 dark:divide-gray-800">
                                <TouchableOpacity
                                    onPress={() => onNavigate?.('requests')}
                                    className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                >
                                    <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Ionicons name="document-text" size={20} className="text-[#424242] dark:text-gray-300" color="currentColor" />
                                    </View>
                                    <View className="flex-1 items-start">
                                        <Text className="text-base font-medium text-[#111418] dark:text-white">
                                            Theo dõi yêu cầu
                                        </Text>
                                        <Text className="mt-0.5 text-xs text-[#637588] dark:text-gray-400">
                                            Xem trạng thái yêu cầu của bạn
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600"
                                        color="currentColor"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => onNavigate?.('settings')}
                                    className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                >
                                    <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Ionicons name="settings" size={20} className="text-[#424242] dark:text-gray-300" color="currentColor" />
                                    </View>
                                    <View className="flex-1 items-start">
                                        <Text className="text-base font-medium text-[#111418] dark:text-white">
                                            Cài đặt ứng dụng
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600"
                                        color="currentColor"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => onNavigate?.('help')}
                                    className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                >
                                    <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Ionicons name="help-circle" size={20} className="text-[#424242] dark:text-gray-300" color="currentColor" />
                                    </View>
                                    <View className="flex-1 items-start">
                                        <Text className="text-base font-medium text-[#111418] dark:text-white">
                                            Trung tâm trợ giúp
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600"
                                        color="currentColor"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Danger Zone */}
                    <View className="mb-8">
                        <Text className="mb-2 px-2 text-sm font-bold uppercase tracking-wider text-[#637588] dark:text-gray-400">
                            Vùng nguy hiểm
                        </Text>
                        <View className="overflow-hidden rounded-xl border border-red-100 bg-white shadow-sm dark:border-red-900/30 dark:bg-[#1C252E]">
                            <TouchableOpacity
                                className="group flex-row items-center gap-4 p-4 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10"
                            >
                                <View className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
                                    <Ionicons name="person-remove" size={20} color="#D32F2F" />
                                </View>
                                <View className="flex-1 items-start">
                                    <Text className="font-medium text-[#D32F2F]">
                                        Vô hiệu hóa tài khoản
                                    </Text>
                                    <Text className="mt-0.5 text-xs text-red-400 dark:text-red-300/60">
                                        Tạm dừng truy cập vào hệ thống
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <View className="mb-4 mt-2">
                        <TouchableOpacity
                            onPress={onLogout}
                            className="flex-row items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-4 shadow-sm transition-colors hover:bg-red-50 dark:border-red-900/30 dark:bg-[#1C252E] dark:hover:bg-red-900/10"
                        >
                            <Ionicons name="log-out-outline" size={20} color="#DA251D" />
                            <Text className="font-bold text-[#DA251D]">Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
