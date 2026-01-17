import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

const TAB_HEIGHT = Platform.OS === 'ios' ? 88 : 64;
const ICON_SIZE = 24;

export default function TabsLayout() {
  const user = useAuthStore((s) => s.user);
  const isVolunteer = user?.role === 'Volunteer';

  /* ================= COMMON OPTIONS ================= */
  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#137fec',
    tabBarInactiveTintColor: '#64748b',

    tabBarLabelPosition: 'below-icon',
    tabBarAllowFontScaling: false,

    tabBarStyle: {
      height: TAB_HEIGHT,
      paddingTop: 6,
      paddingBottom: Platform.OS === 'ios' ? 14 : 8,
      borderTopWidth: 0.5,
      overflow: 'visible',
    },

    tabBarItemStyle: {
      paddingVertical: 4,
    },

    tabBarLabelStyle: {
      fontSize: 12,
      lineHeight: 16,
      paddingBottom: 0,
      includeFontPadding: false,
    },
  } as const;


  /* ================= VOLUNTEER ================= */
  if (isVolunteer) {
    return (
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Trang chủ',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={ICON_SIZE} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Nhiệm vụ',
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={ICON_SIZE} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Hồ sơ',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={ICON_SIZE} color={color} />
            ),
          }}
        />

        {/* hidden routes */}
        <Tabs.Screen name="home/user" options={{ href: null }} />
        <Tabs.Screen name="home/volunteer" options={{ href: null }} />
        <Tabs.Screen name="create-request" options={{ href: null }} />
        <Tabs.Screen name="requests" options={{ href: null }} />
      </Tabs>
    );
  }

  /* ================= USER ================= */
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={ICON_SIZE} color={color} />
          ),
        }}
      />

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <Tabs.Screen
        name="create-request"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#137fec',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -24,
                shadowColor: '#137fec',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
                elevation: 10,
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={ICON_SIZE} color={color} />
          ),
        }}
      />

      {/* hidden routes */}
      <Tabs.Screen name="home/user" options={{ href: null }} />
      <Tabs.Screen name="home/volunteer" options={{ href: null }} />
      {/* hidden routes */}
      <Tabs.Screen name="tasks" options={{ href: null }} />
      <Tabs.Screen name="requests" options={{ href: null }} />
    </Tabs>
  );
}
