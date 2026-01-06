import { useAuthStore } from '@/src/store/authStore';
import { Redirect } from 'expo-router';

export default function HomeRouter() {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Redirect href="/login" />;

  if (user.role === 'volunteer') {
    return <Redirect href="/home/volunteer" />;
  }

  return <Redirect href="/home/user" />;
}
