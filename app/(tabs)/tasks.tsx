import '@/global.css';
import UpdateTaskStatusScreen from '@/src/components/volunteer/UpdateTaskStatusScreen';
import ViewTasksScreen from '@/src/components/volunteer/ViewTasksScreen';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TasksScreen = 'list' | 'detail' | 'update';

export default function TasksListScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const [currentScreen, setCurrentScreen] = useState<TasksScreen>('list');

    if (currentScreen === 'detail') {
        return <ViewTasksScreen onBack={() => setCurrentScreen('list')} />;
    }

    if (currentScreen === 'update') {
        return <UpdateTaskStatusScreen onBack={() => setCurrentScreen('list')} />;
    }

    return (
        <ScrollView
            style={{ paddingTop: top, paddingBottom: bottom + 96 }}
            className="bg-background-light"
        >
            {/* Header */}
            <View className="bg-white px-4 py-4 shadow-sm">
                <Text className="text-xl font-bold">Nhiệm vụ cứu trợ</Text>
                <Text className="mt-1 text-sm text-text-secondary">
                    Danh sách nhiệm vụ được giao
                </Text>
            </View>

            {/* Status Toggle */}
            <View className="mt-4 px-4">
                <View className="flex-row rounded-xl bg-surface p-1">
                    <StatusButton label="Sẵn sàng" active />
                    <StatusButton label="Bận" />
                </View>
            </View>

            {/* Active Tasks */}
            <View className="mt-6 px-4">
                <Text className="mb-3 text-base font-bold">Đang thực hiện</Text>

                <TouchableOpacity
                    onPress={() => setCurrentScreen('detail')}
                    className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm"
                >
                    <View className="h-32 items-center justify-center bg-gray-200">
                        <Ionicons name="map" size={40} color="#6b7280" />
                    </View>
                    <View className="p-4">
                        <View className="mb-2 flex-row items-center gap-2">
                            <View className="rounded-full bg-amber-100 px-2 py-0.5">
                                <Text className="text-xs font-bold text-amber-700">
                                    Ưu tiên cao
                                </Text>
                            </View>
                            <View className="rounded-full bg-blue-50 px-2 py-0.5">
                                <Text className="text-xs font-bold text-blue-700">Mới</Text>
                            </View>
                        </View>
                        <Text className="text-lg font-bold">Nguyễn Văn A</Text>
                        <Text className="mt-1 text-sm text-text-secondary">
                            Lương thực, Y tế • 1.2 km
                        </Text>
                        <View className="mt-3 flex-row gap-2">
                            <TouchableOpacity
                                onPress={() => setCurrentScreen('update')}
                                className="flex-1 flex-row items-center justify-center gap-1 rounded-lg bg-primary py-2"
                            >
                                <Ionicons name="checkmark" size={18} color="#fff" />
                                <Text className="text-sm font-bold text-white">
                                    Cập nhật
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center justify-center gap-1 rounded-lg border border-gray-300 px-4 py-2">
                                <Ionicons name="call" size={18} color="#137fec" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Pending Tasks */}
            <View className="mt-6 px-4">
                <Text className="mb-3 text-base font-bold">Chờ xử lý</Text>

                <View className="gap-3">
                    <TaskItem
                        name="Trần Thị B"
                        type="Cứu hộ"
                        distance="2.5 km"
                        priority="normal"
                    />
                    <TaskItem
                        name="Lê Văn C"
                        type="Chỗ ở"
                        distance="3.8 km"
                        priority="high"
                    />
                </View>
            </View>

            {/* Completed Tasks */}
            <View className="mt-6 px-4">
                <Text className="mb-3 text-base font-bold">Đã hoàn thành hôm nay</Text>

                <View className="gap-3">
                    <CompletedTaskItem
                        name="Phạm Văn D"
                        type="Lương thực"
                        time="14:30"
                    />
                    <CompletedTaskItem name="Hoàng Thị E" type="Y tế" time="12:15" />
                </View>
            </View>
        </ScrollView>
    );
}

function StatusButton({ label, active }: { label: string; active?: boolean }) {
    return (
        <View
            className={`h-10 flex-1 items-center justify-center rounded-lg ${active ? 'bg-white' : ''
                }`}
        >
            <Text className={active ? 'font-bold text-primary' : 'text-gray-400'}>
                {label}
            </Text>
        </View>
    );
}

function TaskItem({
    name,
    type,
    distance,
    priority,
}: {
    name: string;
    type: string;
    distance: string;
    priority: 'normal' | 'high';
}) {
    return (
        <TouchableOpacity className="flex-row items-center justify-between rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-1">
                {priority === 'high' && (
                    <View className="mb-1 w-fit rounded-full bg-amber-100 px-2 py-0.5">
                        <Text className="text-xs font-bold text-amber-700">
                            Ưu tiên cao
                        </Text>
                    </View>
                )}
                <Text className="font-bold">{name}</Text>
                <Text className="mt-0.5 text-sm text-text-secondary">
                    {type} • {distance}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>
    );
}

function CompletedTaskItem({
    name,
    type,
    time,
}: {
    name: string;
    type: string;
    time: string;
}) {
    return (
        <View className="flex-row items-center justify-between rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-1">
                <View className="mb-1 flex-row items-center gap-2">
                    <View className="rounded-full bg-green-50 px-2 py-0.5">
                        <Text className="text-xs font-bold text-green-700">
                            Hoàn thành
                        </Text>
                    </View>
                </View>
                <Text className="font-bold">{name}</Text>
                <Text className="mt-0.5 text-sm text-text-secondary">
                    {type} • {time}
                </Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
        </View>
    );
}
