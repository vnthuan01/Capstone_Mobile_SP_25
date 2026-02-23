import { useAuthStore } from '@/src/store/authStore';
import { Redirect } from 'expo-router';

export default function HomeRouter() {
  const user = useAuthStore((s) => s.user);
  const fakeUser = {
    ...user,
    role: 'Volunteer',
  };

  if (!user) return <Redirect href="/login" />;

  if (fakeUser.role === 'Volunteer') {
    return <Redirect href="/home/volunteer" />;
  }

  return <Redirect href="/home/user" />;
}
