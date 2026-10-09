import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface ThemeScrollerProps extends ScrollViewProps {
  children: React.ReactNode;
  onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | any;
  contentContainerStyle?: any;
  scrollEventThrottle?: number;
  headerSpace?: boolean;
}

export default function ThemedScroller({
  children,
  className,
  onScroll,
  contentContainerStyle,
  scrollEventThrottle = 16,
  headerSpace = false,
  ...props
}: ThemeScrollerProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: '100%' }}
      bounces={false}
      overScrollMode="never"
      className={`flex-1 bg-background px-global ${className || ''}`}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      contentContainerStyle={[headerSpace && { paddingTop: 70 }, contentContainerStyle]}
      {...props}>
      {children}
      <View className="h-20 w-full" />
    </ScrollView>
  );
}

export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
