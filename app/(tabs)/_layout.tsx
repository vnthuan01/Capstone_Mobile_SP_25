import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

export default function TabsLayout() {
  const user = useAuthStore((s) => s.user);
  const isVolunteer = user?.role === 'Volunteer';

  if (isVolunteer) {
    // Volunteer Tabs
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#137fec',
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 : 64,
            paddingBottom: Platform.OS === 'ios' ? 24 : 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Trang chủ',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Nhiệm vụ',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Hồ sơ',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Hide user-specific screens */}
        <Tabs.Screen name="home/user" options={{ href: null }} />
        <Tabs.Screen name="home/volunteer" options={{ href: null }} />
        <Tabs.Screen name="create-request" options={{ href: null }} />
        <Tabs.Screen name="requests" options={{ href: null }} />
      </Tabs>
    );
  }

  // User Tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#137fec',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create-request"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: focused ? '#137fec' : '#137fec',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -20,
                shadowColor: '#137fec',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Hide volunteer-specific screens */}
      <Tabs.Screen name="home/user" options={{ href: null }} />
      <Tabs.Screen name="home/volunteer" options={{ href: null }} />
      <Tabs.Screen name="tasks" options={{ href: null }} />
      <Tabs.Screen name="requests" options={{ href: null }} />
    </Tabs>
  );
}
