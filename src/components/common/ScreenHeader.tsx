import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenHeaderProps {
    title: string;
    onBack?: () => void;
    backgroundColor?: string;
    titleColor?: string;
    iconColor?: string;
    rightAction?: React.ReactNode;
}

export default function ScreenHeader({
    title,
    onBack,
    backgroundColor,
    titleColor,
    iconColor,
    rightAction,
}: ScreenHeaderProps) {
    const { top } = useSafeAreaInsets();
    const { colors } = useTheme();

    const bgColor = backgroundColor ?? colors.background;
    const txtColor = titleColor ?? colors.text;
    const icnColor = iconColor ?? colors.text;

    return (
        <View
            style={{
                paddingTop: top,
                backgroundColor: bgColor,
                borderBottomColor: colors.border,
            }}
            className="flex-row items-center justify-between border-b px-4 pb-3"
        >
            <TouchableOpacity
                onPress={onBack}
                className="h-10 w-10 items-center justify-center rounded-full"
            >
                <Ionicons name="arrow-back" size={24} color={icnColor} />
            </TouchableOpacity>
            <Text
                className="flex-1 text-center text-lg font-bold leading-tight tracking-tight"
                style={{ color: txtColor }}
                numberOfLines={1}
            >
                {title}
            </Text>
            {rightAction ? rightAction : <View className="w-10" />}
        </View>
    );
}
