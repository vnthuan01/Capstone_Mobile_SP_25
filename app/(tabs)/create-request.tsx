import '@/global.css';
import RequestRescueScreen from '@/src/components/user/RequestRescueScreen';
import { useRouter } from 'expo-router';

export default function CreateRequestScreen() {
    const router = useRouter();

    return <RequestRescueScreen onBack={() => router.back()} />;
}
