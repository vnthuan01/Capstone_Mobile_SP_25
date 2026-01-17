import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
    color: string;
}

export default function MenuItem({
    icon,
    title,
    subtitle,
    onPress,
    color,
}: MenuItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4"
        >
            <View className="flex-row items-center gap-3">
                <View
                    className="h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${color}1A` }}
                >
                    <Ionicons name={icon} size={22} color={color} />
                </View>
                <View>
                    <Text className="text-base font-medium">{title}</Text>
                    {subtitle && (
                        <Text className="text-xs text-text-secondary">{subtitle}</Text>
                    )}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>
    );
}
