import { useAuthStore } from '@/src/store/authStore';
import { useThemeStore } from '@/src/store/themeStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';

const TAB_HEIGHT = Platform.OS === 'ios' ? 88 : 64;
const ICON_SIZE = 24;

export default function TabsLayout() {
  const user = useAuthStore((s) => s.user);
  const isVolunteer = user?.role === 'Volunteer';
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  // Theme Colors
  const activeColor = '#137fec';
  const inactiveColor = isDark ? '#9ca3af' : '#64748b'; // gray-400 : slate-500
  const tabBgColor = isDark ? '#1f2937' : '#ffffff'; // gray-800 : white
  const borderColor = isDark ? '#374151' : '#e2e8f0'; // gray-700 : slate-200

  /* ================= COMMON OPTIONS ================= */
  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: activeColor,
    tabBarInactiveTintColor: inactiveColor,

    tabBarLabelPosition: 'below-icon',
    tabBarAllowFontScaling: false,

    tabBarStyle: {
      height: TAB_HEIGHT,
      paddingTop: 6,
      paddingBottom: Platform.OS === 'ios' ? 14 : 8,
      borderTopWidth: 0.5,
      borderTopColor: borderColor,
      backgroundColor: tabBgColor,
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

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.6,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -24,
              }}
            >
              {/* Pulse outline */}
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  borderWidth: 2,
                  borderColor: '#137fec',
                  transform: [{ scale }],
                  opacity,
                }}
              />

              {/* Main button */}
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#137fec',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#137fec',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  elevation: 10,
                  borderWidth: 4,
                  borderColor: isDark ? '#1f2937' : '#ffffff',
                }}
              >
                <Ionicons name="add" size={32} color="#fff" />
              </View>
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
