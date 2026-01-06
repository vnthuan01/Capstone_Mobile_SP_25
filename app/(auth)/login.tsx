import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { authService } from '../../src/services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.login({
        email: email.trim(),
        password: password.trim(),
      });

      if (result.success) {
        Alert.alert('Thành công', result.message || 'Đăng nhập thành công', [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]);
      } else {
        Alert.alert('Lỗi', result.message || 'Đăng nhập thất bại');
      }
    } catch {
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-light"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-[420px] flex-1 self-center px-6 pb-8 pt-10">
          {/* Header */}
          <View className="mb-10 items-center">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Ionicons name="shield-checkmark" size={40} color="#ffffff" />
            </View>

            <Text className="text-[32px] font-bold text-text-primary">
              Đăng nhập
            </Text>
            <Text className="mt-2 text-center text-base text-text-secondary">
              Kết nối để nhận hỗ trợ khẩn cấp và cập nhật tình hình thiên tai.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-5">
            {/* Email / Phone */}
            <View>
              <Text className="mb-2 text-base font-medium text-text-primary">
                Email hoặc số điện thoại
              </Text>
              <TextInput
                className="h-14 rounded-xl border border-surface-dark bg-surface px-4 text-base text-text-primary"
                placeholder="Nhập email hoặc số điện thoại"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            {/* Password */}
            <View>
              <Text className="mb-2 text-base font-medium text-text-primary">
                Mật khẩu
              </Text>

              <View className="relative">
                <TextInput
                  className="h-14 rounded-xl border border-surface-dark bg-surface px-4 pr-12 text-base text-text-primary"
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />

                <TouchableOpacity
                  className="absolute right-4 top-[18px]"
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <Text className="text-lg text-text-secondary">
                    {showPassword ? '🙈' : '👁️'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="mt-2 self-end"
                onPress={() => router.push('/forgot-password')}
              >
                <Text className="text-sm font-semibold text-primary">
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`mt-4 h-12 items-center justify-center rounded-xl ${
                loading ? 'bg-primary/50' : 'bg-primary'
              }`}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-base font-bold text-white">
                  Đăng nhập
                </Text>
              )}
            </TouchableOpacity>

            {/* Biometric */}
            <View className="mt-6 items-center">
              <View className="mb-4 flex-row items-center gap-3">
                <View className="h-px flex-1 bg-surface-dark" />
                <Text className="text-sm text-text-secondary">
                  Hoặc đăng nhập bằng
                </Text>
                <View className="h-px flex-1 bg-surface-dark" />
              </View>

              <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full border border-surface-dark bg-white">
                <Ionicons
                  name="lock-closed-outline"
                  size={26}
                  color="#111827"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}

          <Pressable
            className="mt-10 items-center"
            onPress={() => router.push('/register')}
          >
            <Text className="text-sm text-text-secondary">
              Chưa có tài khoản?
            </Text>
            <Text className="font-bold text-primary">Đăng ký ngay</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
