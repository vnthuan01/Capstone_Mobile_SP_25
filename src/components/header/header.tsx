import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    center?: boolean;
    rightComponent?: React.ReactNode;
}

export default function Header({
    title,
    subtitle,
    onBack,
    center = false,
    rightComponent,
}: HeaderProps) {
    const { top } = useSafeAreaInsets();
    const { mode } = useThemeStore();
    const isDark = mode === 'dark';

    // Theme Styles
    const bgClass = isDark ? 'bg-gray-800' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-gray-800';
    const subTextClass = isDark ? 'text-gray-400' : 'text-text-secondary';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-100';
    const arrowBgClass = isDark ? 'bg-gray-700' : 'bg-gray-100';

    return (
        <View
            style={{ paddingTop: top + 10, paddingBottom: 10 }}
            className={`px-4 shadow-sm border-b ${bgClass} ${borderClass}`}
        >
            <View className={`flex-row items-center ${center ? 'justify-between' : 'gap-3'}`}>
                {onBack && (
                    <TouchableOpacity
                        onPress={onBack}
                        className={`h-10 w-10 items-center justify-center rounded-full ${arrowBgClass}`}
                    >
                        <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#111418'} />
                    </TouchableOpacity>
                )}

                <View className={center ? 'flex-1 items-center' : 'flex-1'}>
                    <Text className={`font-bold ${center ? 'text-lg text-center' : 'text-xl'} ${textClass}`}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text className={`text-sm ${center ? 'text-center' : ''} ${subTextClass}`}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                {center && (
                    <View className="w-10 items-end">
                        {rightComponent}
                    </View>
                )}
            </View>
        </View>
    );
}
