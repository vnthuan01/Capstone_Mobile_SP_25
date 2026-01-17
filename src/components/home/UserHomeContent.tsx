import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UserHomeContent() {
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View style={{ paddingBottom: bottom + 20 }}>
            {/* Quick Actions */}
            <View className="mt-6 px-4">
                <Text className="mb-3 text-lg font-bold">Hành động nhanh</Text>
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
                            router.push({
                                pathname: '/profile',
                                params: { view: 'requests' },
                            })
                        }
                    />
                </View>
            </View>

            {/* Active Request */}
            <View className="mt-6 px-4">
                <Text className="mb-3 text-lg font-bold">Yêu cầu đang xử lý</Text>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: '/profile',
                            params: { view: 'requests' },
                        })
                    }
                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                    <View className="h-32 items-center justify-center bg-gray-200">
                        <Ionicons name="map" size={40} color="#6b7280" />
                    </View>
                    <View className="p-4">
                        <View className="mb-2 flex-row items-center gap-2">
                            <View className="rounded-full bg-green-100 px-2 py-0.5">
                                <Text className="text-xs font-bold text-green-700">
                                    Đang xử lý
                                </Text>
                            </View>
                        </View>
                        <Text className="text-lg font-bold">Yêu cầu cứu trợ #001</Text>
                        <Text className="mt-1 text-sm text-text-secondary">
                            Lương thực, Y tế
                        </Text>
                        <View className="mt-3 flex-row items-center gap-2 rounded-lg bg-blue-50 p-2">
                            <Ionicons name="car" size={18} color="#137fec" />
                            <Text className="text-sm font-medium text-primary">
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
    color: 'primary' | 'green';
    onPress: () => void;
}) {
    const bgColor = color === 'primary' ? 'bg-primary' : 'bg-green-600';

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-1 items-center justify-center gap-2 rounded-xl ${bgColor} p-6 shadow-lg`}
        >
            <Ionicons name={icon} size={32} color="#fff" />
            <Text className="font-bold text-white">{label}</Text>
        </TouchableOpacity>
    );
}
