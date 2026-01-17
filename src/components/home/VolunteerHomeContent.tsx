import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VolunteerHomeContent() {
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View style={{ paddingBottom: bottom + 20 }}>
            {/* Quick Stats */}
            <View className="mt-6 px-4">
                <Text className="mb-3 text-lg font-bold">Thống kê hôm nay</Text>
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
                <Text className="mb-3 text-lg font-bold">Nhiệm vụ hiện tại</Text>
                <TouchableOpacity
                    onPress={() => router.push('/tasks')}
                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                    <View className="h-32 items-center justify-center bg-gray-200">
                        <Ionicons name="location" size={40} color="#137fec" />
                    </View>
                    <View className="p-4">
                        <View className="mb-2 flex-row items-center gap-2">
                            <View className="rounded-full bg-amber-100 px-2 py-0.5">
                                <Text className="text-xs font-bold text-amber-700">
                                    Ưu tiên cao
                                </Text>
                            </View>
                        </View>
                        <Text className="text-lg font-bold">
                            Cứu trợ lương thực - Khu vực A
                        </Text>
                        <Text className="mt-1 text-sm text-text-secondary">
                            123 Đường Trần Phú, Quận Hải Châu
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
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
    const bgColor =
        color === 'green'
            ? 'bg-green-50'
            : color === 'blue'
                ? 'bg-blue-50'
                : 'bg-orange-50';
    const iconColor =
        color === 'green' ? '#16a34a' : color === 'blue' ? '#137fec' : '#f97316';

    return (
        <View className={`flex-1 items-center rounded-xl ${bgColor} p-4 shadow-sm`}>
            <Ionicons name={icon} size={28} color={iconColor} />
            <Text className="mt-2 text-2xl font-bold">{value}</Text>
            <Text className="mt-1 text-xs text-text-secondary">{label}</Text>
        </View>
    );
}
