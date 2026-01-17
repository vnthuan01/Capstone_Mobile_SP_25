import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SettingsScreenProps {
    onBack?: () => void;
}

type ThemeColor = 'blue' | 'green' | 'purple' | 'orange';

const THEME_COLORS: Record<ThemeColor, { name: string; color: string; bg: string }> = {
    blue: { name: 'Xanh dương', color: '#137fec', bg: 'bg-blue-500' },
    green: { name: 'Xanh lá', color: '#16a34a', bg: 'bg-green-500' },
    purple: { name: 'Tím', color: '#9333ea', bg: 'bg-purple-500' },
    orange: { name: 'Cam', color: '#ea580c', bg: 'bg-orange-500' },
};

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
    const { top, bottom } = useSafeAreaInsets();
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState<ThemeColor>('blue');

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
                setSelectedTheme(parsed.selectedTheme ?? 'blue');
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

    const handleThemeChange = (theme: ThemeColor) => {
        setSelectedTheme(theme);
        saveSettings('selectedTheme', theme);
    };

    return (
        <View className="flex-1 bg-background-light">
            {/* Header */}
            <View
                style={{ paddingTop: top }}
                className="flex-row items-center gap-3 border-b border-gray-100 bg-white px-4 py-4"
            >
                {onBack && (
                    <TouchableOpacity
                        onPress={onBack}
                        className="h-10 w-10 items-center justify-center rounded-full"
                    >
                        <Ionicons name="arrow-back" size={24} color="#111418" />
                    </TouchableOpacity>
                )}
                <Text className="text-xl font-bold">Cài đặt</Text>
            </View>

            <ScrollView
                style={{ paddingBottom: bottom + 32 }}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Theme Section */}
                <View className="mt-4 bg-white px-4 py-4">
                    <Text className="mb-4 text-base font-bold text-gray-800">
                        Màu chủ đạo
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                        {(Object.keys(THEME_COLORS) as ThemeColor[]).map((theme) => (
                            <TouchableOpacity
                                key={theme}
                                onPress={() => handleThemeChange(theme)}
                                className={`flex-row items-center gap-2 rounded-full border-2 px-4 py-2 ${selectedTheme === theme
                                    ? 'border-gray-800 bg-gray-50'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <View
                                    className={`h-5 w-5 rounded-full ${THEME_COLORS[theme].bg}`}
                                />
                                <Text
                                    className={`text-sm font-medium ${selectedTheme === theme ? 'text-gray-800' : 'text-gray-600'
                                        }`}
                                >
                                    {THEME_COLORS[theme].name}
                                </Text>
                                {selectedTheme === theme && (
                                    <Ionicons name="checkmark" size={16} color="#111418" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Notifications Section */}
                <View className="mt-4 bg-white">
                    <View className="px-4 py-3">
                        <Text className="text-base font-bold text-gray-800">Thông báo</Text>
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
                    />
                </View>

                {/* Privacy Section */}
                <View className="mt-4 bg-white">
                    <View className="px-4 py-3">
                        <Text className="text-base font-bold text-gray-800">
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
                    />
                </View>

                {/* App Info Section */}
                <View className="mt-4 bg-white">
                    <View className="px-4 py-3">
                        <Text className="text-base font-bold text-gray-800">
                            Thông tin ứng dụng
                        </Text>
                    </View>

                    <SettingItem
                        icon="information-circle-outline"
                        title="Phiên bản"
                        value="1.0.0"
                    />

                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Chính sách bảo mật"
                        showArrow
                    />

                    <SettingItem
                        icon="document-text-outline"
                        title="Điều khoản sử dụng"
                        showArrow
                    />
                </View>

                {/* Danger Zone */}
                <View className="mt-4 bg-white">
                    <View className="px-4 py-3">
                        <Text className="text-base font-bold text-red-500">
                            Vùng nguy hiểm
                        </Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center gap-3 border-b border-gray-100 px-4 py-4">
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
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}) {
    return (
        <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
            <View className="flex-row flex-1 items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Ionicons name={icon} size={20} color="#137fec" />
                </View>
                <View className="flex-1">
                    <Text className="text-base font-medium">{title}</Text>
                    <Text className="text-xs text-text-secondary">{subtitle}</Text>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
                thumbColor={value ? '#137fec' : '#f4f3f4'}
            />
        </View>
    );
}

function SettingItem({
    icon,
    title,
    value,
    showArrow,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    value?: string;
    showArrow?: boolean;
}) {
    return (
        <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
            <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Ionicons name={icon} size={20} color="#137fec" />
                </View>
                <Text className="text-base font-medium">{title}</Text>
            </View>
            {value && <Text className="text-sm text-text-secondary">{value}</Text>}
            {showArrow && <Ionicons name="chevron-forward" size={20} color="#6b7280" />}
        </TouchableOpacity>
    );
}
