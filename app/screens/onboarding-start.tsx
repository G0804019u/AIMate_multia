import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import ThemedText from '@/components/ThemedText';

export default function OnboardingStart() {
  const insets = useSafeAreaInsets();

  return (
    <View className=" flex h-full flex-1 justify-between bg-background">
      <View className="relative mb-44 w-full  flex-1 flex-col items-start justify-center">
        <Image
          source={require('@/assets/img/onboarding.png')}
          style={{ objectFit: 'contain' }}
          className="w-screen "
        />
      </View>

      <View className="px-6 pb-6">
        <ThemedText className="mt-auto font-outfit-bold text-4xl">Welcome, John</ThemedText>
        <ThemedText className="mt-2 text-base text-subtext">
          We're excited to have you join us! Let's get your account set up with a few quick steps.
        </ThemedText>
      </View>
      <View className="px-6 pb-2" style={{ paddingBottom: insets.bottom }}>
        <Button
          size="large"
          className="bg-highlight"
          textClassName="text-invert"
          rounded="full"
          title="Let's go"
          href="/screens/onboarding"
        />
      </View>
    </View>
  );
}
