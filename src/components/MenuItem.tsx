import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
    isDark?: boolean;
}

export default function MenuItem({
    icon,
    title,
    subtitle,
    onPress,
    isDark = false,
}: MenuItemProps) {
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';
    const iconBg = isDark ? 'bg-gray-700' : 'bg-primary/10';
    const accentColor = '#137fec';

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center justify-between border-b ${borderClass} px-4 py-4`}
        >
            <View className="flex-row items-center gap-3">
                <View
                    className={`h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
                >
                    <Ionicons name={icon} size={22} color={accentColor} />
                </View>
                <View>
                    <Text className={`text-base font-medium ${textClass}`}>{title}</Text>
                    {subtitle && (
                        <Text className={`text-xs ${subTextClass}`}>{subtitle}</Text>
                    )}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        </TouchableOpacity>
    );
}
