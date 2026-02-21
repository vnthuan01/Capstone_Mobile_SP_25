import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Linking,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HotlineScreenProps {
    onBack?: () => void;
}

const REGIONS = ['Miền Bắc', 'Miền Trung', 'Miền Nam'];

const NATIONAL_HOTLINES = [
    { number: '113', name: 'Cảnh sát', icon: 'local-police', color: 'text-primary' },
    { number: '114', name: 'Cứu hỏa', icon: 'local-fire-department', color: 'text-primary' },
    { number: '115', name: 'Cấp cứu', icon: 'medical-services', color: 'text-primary' },
] as const;

type LocalDirectory = {
    city: string;
    description: string;
    icon: string;
    contacts: {
        name: string;
        number: string;
        icon: string;
        color: string;
        displayNumber?: string;
    }[];
};

const LOCAL_DIRECTORIES: LocalDirectory[] = [
    {
        city: 'Hà Nội',
        description: 'Thủ đô',
        icon: 'location-city',
        contacts: [
            {
                name: 'Tìm kiếm cứu nạn',
                number: '024382578',
                icon: 'flood',
                color: 'text-primary',
            },
            {
                name: 'Cấp thoát nước',
                number: '024382578',
                displayNumber: '024.xxxx',
                icon: 'water-drop',
                color: 'text-secondary',
            },
        ],
    },
    {
        city: 'Hải Phòng',
        description: 'Thành phố cảng',
        icon: 'anchor',
        contacts: [
            {
                name: 'Y tế khẩn cấp',
                number: '0225115',
                icon: 'medical-services',
                color: 'text-primary',
            },
            {
                name: 'Sự cố điện lực',
                number: '19001234',
                displayNumber: '1900.xxxx',
                icon: 'bolt',
                color: 'text-accent',
            },
        ],
    },
    {
        city: 'Quảng Ninh',
        description: 'Vùng ven biển',
        icon: 'landscape',
        contacts: [
            {
                name: 'Phòng chống thiên tai',
                number: '0203xxxx',
                icon: 'tsunami',
                color: 'text-primary',
            },
        ],
    },
];

export default function HotlineScreen({ onBack }: HotlineScreenProps) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('Miền Bắc');
    const [expandedCity, setExpandedCity] = useState<string | null>('Hà Nội');

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    const handleCall = (number: string) => {
        const phoneUrl = Platform.select({
            ios: `telprompt:${number}`,
            android: `tel:${number}`,
            default: `tel:${number}`,
        });
        Linking.openURL(phoneUrl);
    };

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            {/* Header */}
            <View
                style={{ paddingTop: top }}
                className="mb-2 flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-3 pb-2 dark:border-gray-800 dark:bg-[#111418]"
            >
                <TouchableOpacity
                    onPress={handleBack}
                    className="h-12 w-12 items-center justify-center rounded-full"
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        className="text-[#0f172a] dark:text-white"
                        color="currentColor"
                    />
                </TouchableOpacity>

                <Text className="flex-1 pr-12 text-center text-lg font-bold text-[#111418] dark:text-white">
                    Hotline Khẩn cấp
                </Text>

                <TouchableOpacity className="flex-row items-center gap-1 rounded-full bg-red-50 px-3 py-1.5">
                    <Ionicons name="alert-circle" size={18} color="#dc2626" />
                    <Text className="text-sm font-bold text-red-600">SOS</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottom + 24 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View className="sticky top-0 z-20 bg-background-light px-4 py-4 dark:bg-[#0b1118]">
                    <View className="relative flex-row items-center rounded-2xl bg-white px-4 shadow-sm dark:bg-[#1c2630]">
                        <Ionicons name="search" size={20} className="text-gray-400" color="currentColor" />
                        <TextInput
                            className="flex-1 py-3.5 pl-3 pr-4 text-base text-[#111418] dark:text-white"
                            placeholder="Tìm kiếm tỉnh/thành phố..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* National Emergency */}
                <View className="mb-6 px-4">
                    <Text className="mb-3 px-1 text-sm font-bold uppercase tracking-wider text-gray-500">
                        Gọi Khẩn Cấp Quốc Gia
                    </Text>
                    <View className="flex-row gap-3">
                        {NATIONAL_HOTLINES.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleCall(item.number)}
                                className="flex-1 items-center justify-center rounded-2xl border-b-4 border-primary bg-white p-4 shadow-sm active:scale-95 dark:bg-[#1c2630]"
                            >
                                <View className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
                                    {/* Using MaterialIcons equivalent or similar */}
                                    <Ionicons name={item.number === '113' ? 'shield-checkmark' : item.number === '114' ? 'flame' : 'medkit'} size={28} className={item.color} color="#DA251D" />
                                </View>
                                <Text className="text-2xl font-black leading-none text-gray-800 dark:text-white">
                                    {item.number}
                                </Text>
                                <Text className="mt-1 text-xs font-semibold text-gray-500">
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Regions Tabs */}
                <View className="px-4 pb-4">
                    <View className="flex-row rounded-xl bg-white p-1.5 shadow-sm dark:bg-[#1c2630]">
                        {REGIONS.map((region) => (
                            <TouchableOpacity
                                key={region}
                                onPress={() => setSelectedRegion(region)}
                                className={`flex-1 rounded-lg py-2.5 ${selectedRegion === region
                                    ? 'bg-primary shadow-md'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Text
                                    className={`text-center text-sm ${selectedRegion === region
                                        ? 'font-bold text-white'
                                        : 'font-medium text-gray-500 dark:text-gray-400'
                                        }`}
                                >
                                    {region}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Local Directory */}
                <View className="flex-col gap-4 px-4">
                    <Text className="px-1 text-sm font-bold uppercase tracking-wider text-gray-500">
                        Danh bạ địa phương
                    </Text>

                    {LOCAL_DIRECTORIES.map((dir, index) => (
                        <View
                            key={index}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1c2630]"
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    setExpandedCity(expandedCity === dir.city ? null : dir.city)
                                }
                                className="flex-row items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800"
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                        <Ionicons
                                            name={dir.city === 'Hà Nội' ? 'business' : dir.city === 'Hải Phòng' ? 'boat' : 'map'}
                                            size={24}
                                            color="#1565C0"
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-lg font-bold text-[#111418] dark:text-white">
                                            {dir.city}
                                        </Text>
                                        <Text className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {dir.description}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                                    <Ionicons
                                        name={
                                            expandedCity === dir.city
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        size={20}
                                        className="text-gray-500"
                                        color="currentColor"
                                    />
                                </View>
                            </TouchableOpacity>
                            {expandedCity === dir.city && (
                                <View className="space-y-3 bg-gray-50/30 p-4 dark:bg-[#1c2630]">
                                    {dir.contacts.map((contact, cIndex) => (
                                        <View
                                            key={cIndex}
                                            className="mb-3 flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-[#252f38]"
                                        >
                                            <View className="flex-row items-center gap-3">
                                                {/* Use icons logic */}
                                                <Ionicons name="information-circle" size={20} className={contact.color} color={contact.color.includes('primary') ? '#DA251D' : contact.color.includes('secondary') ? '#1565C0' : '#FFCC00'} />
                                                <Text className="text-sm font-semibold text-[#111418] dark:text-gray-200">
                                                    {contact.name}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => handleCall(contact.number)}
                                                className={`flex-row items-center gap-2 rounded-lg px-4 py-2 transition-colors ${contact.displayNumber
                                                    ? 'border border-gray-200 bg-white dark:border-gray-700 dark:bg-transparent'
                                                    : 'bg-secondary text-white shadow-sm shadow-blue-200 dark:shadow-none'
                                                    }`}
                                            >
                                                <Ionicons
                                                    name="call"
                                                    size={14}
                                                    color={contact.displayNumber ? 'currentColor' : '#ffffff'}
                                                    className={contact.displayNumber ? "text-gray-700 dark:text-gray-300" : ""}
                                                />
                                                <Text
                                                    className={`text-sm font-bold ${contact.displayNumber
                                                        ? 'text-gray-700 dark:text-gray-300'
                                                        : 'text-white'
                                                        }`}
                                                >
                                                    {contact.displayNumber || 'Gọi ngay'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                    <View className="py-4 text-center">
                        <View className="flex-row items-center justify-center gap-1">
                            <Ionicons name="checkmark-circle" size={14} color="#9CA3AF" />
                            <Text className="text-xs text-gray-400">Dữ liệu đã được lưu offline</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
