import { Link, router } from 'expo-router';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from './Avatar';
import Icon, { IconName } from './Icon';
import ThemedScroller from './ThemeScroller';
import ThemedText from './ThemedText';

import { SearchPressable } from '@/app/(drawer)/(tabs)/index';
import ThemeToggle from '@/components/ThemeToggle';

export default function CustomDrawerContent() {
  const insets = useSafeAreaInsets();
  return (
    <ThemedScroller className="flex-1 bg-background !px-8" style={{ paddingTop: insets.top }}>
      <ThemedText className="mb-8 mt-4 font-outfit-bold    text-2xl">
        Multia<Text className="text-highlight">.</Text>
      </ThemedText>
      <SearchPressable />

      <View className="mb-6 mt-10 flex-col border-b border-border pb-6">
        <NavItem href="/(drawer)/(tabs)/profile" icon="User" label="Profile" />
        <NavItem href="/screens/onboarding-start" icon="Lightbulb" label="Onboarding" />
        <NavItem href="/screens/welcome-new" icon="Package" label="Welcome" />
        <NavItem href="/screens/notification-permission" icon="ShieldCheck" label="Permissions" />
        <NavItem href="/screens/chat/list" icon="MessageCircle" label="Chat" />
        <NavItem href="/screens/login" icon="ArrowLeft" label="Sign out" />
      </View>
      <View className="flex-row items-center justify-between">
        <ThemedText className="text-sm text-subtext">Version 2.0.0</ThemedText>
        <ThemeToggle />
      </View>
    </ThemedScroller>
  );
}

type NavItemProps = {
  href: string;
  icon: IconName;
  label: string;
  className?: string;
  description?: string;
};

export const NavItem = ({ href, icon, label, description }: NavItemProps) => (
  <TouchableOpacity onPress={() => router.push(href)} className="flex-row items-center py-3">
    <View className="h-12 w-12 flex-row items-center justify-center rounded-2xl bg-secondary">
      <Icon name={icon} size={18} className="" />
    </View>
    <View className="ml-4 flex-1 ">
      {label && <ThemedText className="text-lg font-bold text-text">{label}</ThemedText>}
      {description && <ThemedText className="text-xs opacity-50">{description}</ThemedText>}
    </View>
  </TouchableOpacity>
);
