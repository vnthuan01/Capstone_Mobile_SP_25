import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [counter, setCounter] = useState(30);
  const inputsRef = useRef<TextInput[]>([]);

  /* Countdown resend */
  useEffect(() => {
    if (counter === 0) return;
    const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    if (!/^\d{6}$/.test(text)) return;
    setOtp(text.split(''));
    inputsRef.current[5]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;
    // TODO: verify OTP
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-light"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full max-w-md flex-1 self-center bg-white">
          {/* Header */}
          <View className="sticky top-0 z-10 flex-row items-center px-4 py-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full"
            >
              <Ionicons name="chevron-back" size={22} color="#0f172a" />
            </TouchableOpacity>

            <Text className="flex-1 pr-10 text-center text-lg font-bold text-text-primary">
              Xác minh OTP
            </Text>
          </View>

          {/* Content */}
          <View className="flex-1 items-center px-6 pt-10">
            {/* Icon */}
            <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Ionicons name="lock-closed-outline" size={40} color="#1565C0" />
            </View>

            {/* Title */}
            <Text className="mb-3 text-center text-2xl font-bold text-text-primary">
              Nhập mã xác thực
            </Text>

            {/* Description */}
            <Text className="mb-8 max-w-xs text-center text-base leading-relaxed text-text-secondary">
              Vui lòng nhập mã 6 số đã được gửi tới số điện thoại{' '}
              <Text className="font-bold text-text-primary">
                +84 9xx xxx xxx
              </Text>
            </Text>

            {/* OTP Inputs */}
            <View className="mb-8 flex-row gap-2">
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(el) => {
                    if (el) inputsRef.current[index] = el;
                  }}
                  value={value}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(v) => handleChange(v, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  className="h-14 w-12 rounded-xl border border-surface-dark bg-background-light text-center text-xl font-bold text-text-primary"
                />
              ))}
            </View>

            {/* Resend */}
            <View className="mb-8 flex-row items-center gap-2">
              <Text className="text-sm text-text-secondary">
                Chưa nhận được mã?
              </Text>
              <TouchableOpacity
                disabled={counter > 0}
                onPress={() => setCounter(30)}
              >
                <Text
                  className={`text-sm font-medium ${counter > 0 ? 'text-text-secondary' : 'text-primary'
                    }`}
                >
                  Gửi lại {counter > 0 && `(00:${counter})`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={handleVerify}
              className="h-14 w-full items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
            >
              <Text className="text-lg font-bold text-white">Xác minh</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View className="mt-8 flex-row items-center gap-2">
              <Ionicons name="help-circle-outline" size={18} color="#64748b" />
              <Text className="text-sm text-text-secondary">Cần trợ giúp?</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
