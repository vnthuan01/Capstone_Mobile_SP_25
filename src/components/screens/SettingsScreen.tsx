import '@/global.css';
import Header from '@/src/components/header/header';
import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SettingsScreenProps {
    onBack?: () => void;
}

const ACCENT_COLOR = '#137fec'; // Màu chủ đạo cố định

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
    const { bottom } = useSafeAreaInsets();
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);

    const { mode, toggleTheme } = useThemeStore();
    const isDark = mode === 'dark';
    const bgClass = isDark ? 'bg-gray-900' : 'bg-background-light';
    const cardBgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem('app_settings');
            if (settings) {
                const parsed = JSON.parse(settings);
                setNotifications(parsed.notifications ?? true);
                setSoundEnabled(parsed.soundEnabled ?? true);
                setVibrationEnabled(parsed.vibrationEnabled ?? true);
                setLocationEnabled(parsed.locationEnabled ?? true);
            }
        } catch (error) {
            console.log('Error loading settings:', error);
        }
    };

    const saveSettings = async (key: string, value: any) => {
        try {
            const settings = await AsyncStorage.getItem('app_settings');
            const parsed = settings ? JSON.parse(settings) : {};
            parsed[key] = value;
            await AsyncStorage.setItem('app_settings', JSON.stringify(parsed));
        } catch (error) {
            console.log('Error saving settings:', error);
        }
    };

    return (
        <View className={`flex-1 ${bgClass}`}>
            <Header title="Cài đặt" onBack={onBack} />



            <ScrollView
                style={{ paddingBottom: bottom + 32 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Appearance Section */}
                <View className={`mt-4 ${cardBgClass} px-4 py-4`}>
                    <Text className={`mb-4 text-base font-bold ${textClass}`}>
                        Giao diện
                    </Text>
                    <View className={`flex-row items-center justify-between border-b ${borderClass} px-0 py-2`}>
                        <View className="flex-row items-center gap-3">
                            <View className={`h-10 w-10 items-center justify-center rounded-full ${isDark ? 'bg-gray-700' : 'bg-primary/10'}`}>
                                <Ionicons name="moon-outline" size={20} color={ACCENT_COLOR} />
                            </View>
                            <Text className={`text-base font-medium ${textClass}`}>Chế độ tối</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
                            thumbColor={isDark ? ACCENT_COLOR : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* Notifications Section */}
                <View className={`mt-4 ${cardBgClass}`}>
                    <View className="px-4 py-3">
                        <Text className={`text-base font-bold ${textClass}`}>Thông báo</Text>
                    </View>

                    <SettingToggle
                        icon="notifications-outline"
                        title="Cho phép thông báo"
                        subtitle="Nhận thông báo về yêu cầu cứu trợ"
                        value={notifications}
                        onValueChange={(val) => {
                            setNotifications(val);
                            saveSettings('notifications', val);
                        }}
                        isDark={isDark}
                    />

                    <SettingToggle
                        icon="volume-high-outline"
                        title="Âm thanh"
                        subtitle="Phát âm thanh khi có thông báo"
                        value={soundEnabled}
                        onValueChange={(val) => {
                            setSoundEnabled(val);
                            saveSettings('soundEnabled', val);
                        }}
                        isDark={isDark}
                    />

                    <SettingToggle
                        icon="phone-portrait-outline"
                        title="Rung"
                        subtitle="Rung khi có thông báo"
                        value={vibrationEnabled}
                        onValueChange={(val) => {
                            setVibrationEnabled(val);
                            saveSettings('vibrationEnabled', val);
                        }}
                        isDark={isDark}
                    />
                </View>

                {/* Privacy Section */}
                <View className={`mt-4 ${cardBgClass}`}>
                    <View className="px-4 py-3">
                        <Text className={`text-base font-bold ${textClass}`}>
                            Quyền riêng tư
                        </Text>
                    </View>

                    <SettingToggle
                        icon="location-outline"
                        title="Vị trí"
                        subtitle="Cho phép truy cập vị trí của bạn"
                        value={locationEnabled}
                        onValueChange={(val) => {
                            setLocationEnabled(val);
                            saveSettings('locationEnabled', val);
                        }}
                        isDark={isDark}
                    />
                </View>

                {/* App Info Section */}
                <View className={`mt-4 ${cardBgClass}`}>
                    <View className="px-4 py-3">
                        <Text className={`text-base font-bold ${textClass}`}>
                            Thông tin ứng dụng
                        </Text>
                    </View>

                    <SettingItem
                        icon="information-circle-outline"
                        title="Phiên bản"
                        value="1.0.0"
                        isDark={isDark}
                    />

                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Chính sách bảo mật"
                        showArrow
                        isDark={isDark}
                    />

                    <SettingItem
                        icon="document-text-outline"
                        title="Điều khoản sử dụng"
                        showArrow
                        isDark={isDark}
                    />
                </View>

                {/* Danger Zone */}
                <View className={`mt-4 ${cardBgClass}`}>
                    <View className="px-4 py-3">
                        <Text className="text-base font-bold text-red-500">
                            Vùng nguy hiểm
                        </Text>
                    </View>

                    <TouchableOpacity className={`flex-row items-center gap-3 border-b ${borderClass} px-4 py-4`}>
                        <View className="h-10 w-10 items-center justify-center rounded-full bg-red-50">
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-red-500">
                                Xóa tài khoản
                            </Text>
                            <Text className="text-xs text-gray-500">
                                Xóa vĩnh viễn tài khoản và dữ liệu
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="h-8" />
            </ScrollView>
        </View>
    );
}

function SettingToggle({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    isDark,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    isDark: boolean;
}) {
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';
    const iconBg = isDark ? 'bg-gray-700' : 'bg-primary/10';

    return (
        <View className={`flex-row items-center justify-between border-b ${borderClass} px-4 py-4`}>
            <View className="flex-row flex-1 items-center gap-3">
                <View
                    className={`h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
                >
                    <Ionicons name={icon} size={20} color={ACCENT_COLOR} />
                </View>
                <View className="flex-1">
                    <Text className={`text-base font-medium ${textClass}`}>{title}</Text>
                    <Text className={`text-xs ${subTextClass}`}>{subtitle}</Text>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
                thumbColor={value ? ACCENT_COLOR : '#f4f3f4'}
            />
        </View>
    );
}

function SettingItem({
    icon,
    title,
    value,
    showArrow,
    isDark,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    value?: string;
    showArrow?: boolean;
    isDark: boolean;
}) {
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';
    const iconBg = isDark ? 'bg-gray-700' : 'bg-primary/10';

    return (
        <TouchableOpacity className={`flex-row items-center justify-between border-b ${borderClass} px-4 py-4`}>
            <View className="flex-row items-center gap-3">
                <View className={`h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
                    <Ionicons name={icon} size={20} color={ACCENT_COLOR} />
                </View>
                <Text className={`text-base font-medium ${textClass}`}>{title}</Text>
            </View>
            {value && <Text className={`text-sm ${subTextClass}`}>{value}</Text>}
            {showArrow && <Ionicons name="chevron-forward" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />}
        </TouchableOpacity>
    );
}
