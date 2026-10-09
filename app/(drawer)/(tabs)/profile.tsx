import { Link } from 'expo-router';
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';

import { useBusinessMode } from '@/app/contexts/BusinesModeContext';
import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import BusinessSwitch from '@/components/BusinessSwitch';
import Header, { HeaderIcon } from '@/components/Header';
import ListLink from '@/components/ListLink';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';

export default function ProfileScreen() {
  const { isBusinessMode } = useBusinessMode();
  return (
    <View className="flex-1 bg-background">
      <Header rightComponents={[<HeaderIcon icon="Settings" href="/screens/settings" />]} />
      <View className="flex-1 bg-background">
        <ThemedScroller>
          <View className="mb-10  flex-col items-center justify-center pt-10">
            <AnimatedView className="" animation="scaleIn" duration={1000}>
              <Avatar src={require('@/assets/img/thomino.jpg')} size="xxl" />
            </AnimatedView>
            <View className="mt-4 flex-1 items-center justify-center">
              <ThemedText className="text-2xl font-bold">Alex Johnson</ThemedText>
              <View className="flex flex-row items-center">
                <ThemedText className="ml-2 text-sm text-subtext">alex@gmail.com</ThemedText>
              </View>
            </View>
          </View>

          {isBusinessMode ? (
            <>
              <AnimatedView className="gap-1 px-3" animation="scaleIn">
                <ListLink
                  showChevron
                  title="Orders"
                  description="View your orders"
                  icon="Calendar"
                  href="/(drawer)/(tabs)/provider-orders"
                />
                <ListLink
                  showChevron
                  title="Analytics"
                  description="View your analytics"
                  icon="ChartBar"
                  href="/(drawer)/(tabs)/analytics"
                />
                <ListLink
                  showChevron
                  title="Customers"
                  description="Manage your customers"
                  icon="Users"
                  href="/screens/admin/customers"
                />
                <ListLink
                  showChevron
                  title="Your services"
                  description="Manage your services"
                  icon="ShoppingBag"
                  href="/screens/admin/services"
                />
                <ListLink
                  showChevron
                  title="View profile"
                  description="View your profile"
                  icon="User"
                  href="/screens/user-profile"
                />
              </AnimatedView>
            </>
          ) : (
            <AnimatedView className="px-2" animation="scaleIn">
              <BecomeProvider />
              <View className="gap-1">
                <ListLink
                  showChevron
                  title="Edit profile"
                  description="Photo, email, password"
                  icon="Edit2"
                  href="/screens/edit-profile"
                />
                <ListLink
                  showChevron
                  title="Your orders"
                  description="View your orders"
                  icon="Calendar"
                  href="/(drawer)/(tabs)/orders"
                />
                <ListLink
                  showChevron
                  title="Become a provider"
                  description="Become a provider"
                  icon="HandCoins"
                  href="/screens/onboarding-start"
                />
              </View>
            </AnimatedView>
          )}
        </ThemedScroller>
        <BusinessSwitch />
      </View>
    </View>
  );
}

export const BecomeProvider = () => {
  return (
    <Link asChild href="/screens/onboarding-start">
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          source={require('@/assets/img/banner-2.jpg')}
          className="mb-4 w-full overflow-hidden rounded-3xl object-cover">
          <View className="w-full p-6">
            <Text className="font-outfit-bold text-xl text-white">Become a provider</Text>
            <Text className="text-sm text-white">Onboarding flow screens</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};
