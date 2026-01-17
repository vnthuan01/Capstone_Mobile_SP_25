import '@/global.css';
import Header from '@/src/components/header/header';
import UpdateTaskStatusScreen from '@/src/components/volunteer/UpdateTaskStatusScreen';
import ViewTasksScreen from '@/src/components/volunteer/ViewTasksScreen';
import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TasksScreenType = 'list' | 'detail' | 'update';

interface TasksListScreenProps {
    onBack?: () => void;
}

export default function TasksListScreen({ onBack }: TasksListScreenProps) {
    const { bottom } = useSafeAreaInsets();
    const [currentScreen, setCurrentScreen] = useState<TasksScreenType>('list');

    const { mode } = useThemeStore();
    const isDark = mode === 'dark';

    // Styles
    const bgClass = isDark ? 'bg-gray-900' : 'bg-background-light';
    const cardBgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const surfaceBgClass = isDark ? 'bg-gray-800' : 'bg-surface';
    const mapPlaceholderBg = isDark ? 'bg-gray-700' : 'bg-gray-200';

    if (currentScreen === 'detail') {
        return <ViewTasksScreen onBack={() => setCurrentScreen('list')} />;
    }

    if (currentScreen === 'update') {
        return <UpdateTaskStatusScreen onBack={() => setCurrentScreen('list')} />;
    }

    return (
        <View className={`flex-1 ${bgClass}`}>
            <Header
                title="Nhiệm vụ cứu trợ"
                subtitle="Danh sách nhiệm vụ được giao"
                onBack={onBack}
            />
            <ScrollView
                contentContainerStyle={{ paddingBottom: bottom + 96 }}
                className="flex-1"
            >

                {/* Status Toggle */}
                <View className="mt-4 px-4">
                    <View className={`flex-row rounded-xl p-1 ${surfaceBgClass}`}>
                        <StatusButton label="Sẵn sàng" active isDark={isDark} />
                        <StatusButton label="Bận" isDark={isDark} />
                    </View>
                </View>

                {/* Active Tasks */}
                <View className="mt-6 px-4">
                    <Text className={`mb-3 text-base font-bold ${textClass}`}>Đang thực hiện</Text>

                    <TouchableOpacity
                        onPress={() => setCurrentScreen('detail')}
                        className={`mb-3 overflow-hidden rounded-xl shadow-sm ${cardBgClass}`}
                    >
                        <View className={`h-32 items-center justify-center ${mapPlaceholderBg}`}>
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
                            <Text className={`text-lg font-bold ${textClass}`}>Nguyễn Văn A</Text>
                            <Text className={`mt-1 text-sm ${subTextClass}`}>
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
                                <TouchableOpacity className={`flex-row items-center justify-center gap-1 rounded-lg border px-4 py-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                                    <Ionicons name="call" size={18} color="#137fec" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Pending Tasks */}
                <View className="mt-6 px-4">
                    <Text className={`mb-3 text-base font-bold ${textClass}`}>Chờ xử lý</Text>

                    <View className="gap-3">
                        <TaskItem
                            name="Trần Thị B"
                            type="Cứu hộ"
                            distance="2.5 km"
                            priority="normal"
                            isDark={isDark}
                        />
                        <TaskItem
                            name="Lê Văn C"
                            type="Chỗ ở"
                            distance="3.8 km"
                            priority="high"
                            isDark={isDark}
                        />
                    </View>
                </View>

                {/* Completed Tasks */}
                <View className="mt-6 px-4">
                    <Text className={`mb-3 text-base font-bold ${textClass}`}>Đã hoàn thành hôm nay</Text>

                    <View className="gap-3">
                        <CompletedTaskItem
                            name="Phạm Văn D"
                            type="Lương thực"
                            time="14:30"
                            isDark={isDark}
                        />
                        <CompletedTaskItem name="Hoàng Thị E" type="Y tế" time="12:15" isDark={isDark} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function StatusButton({ label, active, isDark }: { label: string; active?: boolean; isDark: boolean }) {
    const activeBg = isDark ? 'bg-gray-600' : 'bg-white';
    const activeText = isDark ? 'text-white' : 'text-primary';
    const inactiveText = isDark ? 'text-gray-400' : 'text-gray-400';

    return (
        <View
            className={`h-10 flex-1 items-center justify-center rounded-lg ${active ? activeBg : ''
                }`}
        >
            <Text className={active ? `font-bold ${activeText}` : inactiveText}>
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
    isDark,
}: {
    name: string;
    type: string;
    distance: string;
    priority: 'normal' | 'high';
    isDark: boolean;
}) {
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-black';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';

    return (
        <TouchableOpacity className={`flex-row items-center justify-between rounded-xl p-4 shadow-sm ${cardBg}`}>
            <View className="flex-1">
                {priority === 'high' && (
                    <View className="mb-1 w-fit rounded-full bg-amber-100 px-2 py-0.5">
                        <Text className="text-xs font-bold text-amber-700">
                            Ưu tiên cao
                        </Text>
                    </View>
                )}
                <Text className={`font-bold ${textClass}`}>{name}</Text>
                <Text className={`mt-0.5 text-sm ${subTextClass}`}>
                    {type} • {distance}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        </TouchableOpacity>
    );
}

function CompletedTaskItem({
    name,
    type,
    time,
    isDark,
}: {
    name: string;
    type: string;
    time: string;
    isDark: boolean;
}) {
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-black';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';

    return (
        <View className={`flex-row items-center justify-between rounded-xl p-4 shadow-sm ${cardBg}`}>
            <View className="flex-1">
                <View className="mb-1 flex-row items-center gap-2">
                    <View className="rounded-full bg-green-50 px-2 py-0.5">
                        <Text className="text-xs font-bold text-green-700">
                            Hoàn thành
                        </Text>
                    </View>
                </View>
                <Text className={`font-bold ${textClass}`}>{name}</Text>
                <Text className={`mt-0.5 text-sm ${subTextClass}`}>
                    {type} • {time}
                </Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
        </View>
    );
}
