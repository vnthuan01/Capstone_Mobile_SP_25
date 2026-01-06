import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CitizenHome() {
  const { top, bottom } = useSafeAreaInsets();
  //   const user = useAuthStore((s) => s.user);

  return (
    <ScrollView
      style={{ paddingTop: top, paddingBottom: bottom + 120 }}
      className="bg-background-light"
    >
      {/* HEADER */}
      <View className="bg-white px-4 py-4 shadow-sm">
        {/* <Text className="text-lg font-bold">Xin chào, {user?.full_name}</Text> */}
        <Text className="mt-1 text-xs text-green-600">Trực tuyến</Text>
      </View>

      {/* MAP */}
      <View className="mt-4 px-4">
        <View className="h-44 items-center justify-center rounded-xl bg-gray-200">
          <Ionicons name="location" size={36} color="#137fec" />
          <Text className="mt-1 text-xs text-gray-500">Vị trí hiện tại</Text>
        </View>
      </View>

      {/* SEND REQUEST */}
      <View className="mt-6 px-4">
        <View className="gap-3 rounded-xl bg-white p-4 shadow-sm">
          <Text className="text-lg font-bold">Gửi yêu cầu cứu trợ</Text>
          <Text className="text-sm text-text-secondary">
            Gửi vị trí & mô tả tình trạng để nhận hỗ trợ nhanh nhất.
          </Text>

          <TouchableOpacity className="h-12 flex-row items-center justify-center gap-2 rounded-lg bg-primary">
            <Ionicons name="send" color="#fff" />
            <Text className="font-bold text-white">Gửi ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TRACK REQUEST */}
      <View className="mt-4 px-4">
        <View className="flex-row items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center gap-3">
            <Ionicons name="radio" size={22} color="#137fec" />
            <View>
              <Text className="font-bold">Theo dõi yêu cầu</Text>
              <Text className="text-xs text-text-secondary">
                Chưa có yêu cầu
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" />
        </View>
      </View>

      {/* SOS */}
      <View className="mt-8 px-4">
        <TouchableOpacity className="h-16 flex-row items-center justify-center gap-3 rounded-xl bg-red-600">
          <Ionicons name="warning" size={26} color="#fff" />
          <Text className="text-xl font-black text-white">SOS – KHẨN CẤP</Text>
        </TouchableOpacity>

        <Text className="mt-2 text-center text-xs text-gray-400">
          Nhấn giữ để gửi tín hiệu khẩn cấp
        </Text>
      </View>
    </ScrollView>
  );
}
