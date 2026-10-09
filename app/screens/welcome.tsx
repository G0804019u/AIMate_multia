import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, Image, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import useThemeColors from '../contexts/ThemeColors';

import Icon from '@/components/Icon';
import ThemeToggle from '@/components/ThemeToggle';
import ThemedText from '@/components/ThemedText';

const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;

const slides = [
  {
    id: '1',
    title: 'Multia. marketplace template',
    image: require('@/assets/img/onboarding-1.png'),
    description: 'Complete shopping experience',
  },
  {
    id: '2',
    title: 'Elegant design',
    image: require('@/assets/img/onboarding-2.png'),
    description: 'Elegant design for your marketplace app',
  },
  {
    id: '3',
    title: 'Customizable & Fast',
    image: require('@/assets/img/onboarding-3.png'),
    description: 'Easily modify themes and layouts.',
  },
];

export default function OnboardingScreen() {
  const colors = useThemeColors();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();
  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-background">
      <View className="relative flex-1 bg-background">
        <View className="w-full flex-row justify-end px-4 pt-2">
          <ThemeToggle />
        </View>
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={windowWidth} // 👈 Ensures snapping works perfectly
          renderItem={({ item }) => (
            <View style={{ width: windowWidth }} className="items-center justify-center p-6">
              <Image source={item.image} style={{ width: windowWidth, objectFit: 'contain' }} />
              <ThemedText className="mt-4 font-outfit-bold text-2xl">{item.title}</ThemedText>
              <Text className="mt-2 text-center text-subtext">{item.description}</Text>
            </View>
          )}
          ListFooterComponent={() => <View className="h-28 w-full" />}
          keyExtractor={(item) => item.id}
        />

        <View className="mb-20 w-full flex-row  justify-center">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 rounded-full ${index === currentIndex ? 'w-2 bg-highlight' : 'w-2 bg-secondary'}`}
            />
          ))}
        </View>

        {/* Login/Signup Buttons */}
        <View className="mb-global flex w-full flex-col space-y-2 px-6">
          <View className="flex flex-row items-center justify-center gap-2">
            <Pressable
              onPress={() => router.push('/(drawer)/(tabs)')}
              className="flex flex-1 flex-row items-center justify-center rounded-full border border-primary py-4">
              <AntDesign name="google" size={22} color={colors.text} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/screens/signup')}
              className="flex w-1/4 flex-1 flex-row items-center justify-center rounded-full bg-primary py-4">
              <Icon name="Mail" size={20} color={colors.invert} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/(drawer)/(tabs)')}
              className="flex flex-1 flex-row items-center justify-center rounded-full border border-primary py-4">
              <AntDesign name="apple" size={22} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
