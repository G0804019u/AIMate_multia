import { useThemeColors } from 'app/contexts/ThemeColors';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon, { IconName } from './Icon';

import { useTheme } from '@/app/contexts/ThemeContext';

type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponents?: React.ReactNode[];
  backgroundColor?: string;
  textColor?: string;
  leftComponent?: React.ReactNode;
  middleComponent?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  collapsible?: boolean;
  visible?: boolean;
  variant?: 'default' | 'transparent' | 'blurred';
};

const Header: React.FC<HeaderProps> = ({
  title,
  children,
  showBackButton = false,
  onBackPress,
  rightComponents = [],
  backgroundColor,
  textColor,
  leftComponent,
  middleComponent,
  className,
  style,
  collapsible = false,
  visible = true,
  variant = 'default',
}) => {
  const colors = useThemeColors();
  const { isDark } = useTheme();
  const translateY = useRef(new Animated.Value(0)).current;

  const isTransparent = variant === 'transparent';
  const isBlurred = variant === 'blurred';
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!collapsible) return;

    if (visible) {
      translateY.setValue(-70);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 30,
        friction: 50,
        velocity: 3,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: -150,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
        velocity: 2,
      }).start();
    }
  }, [visible, collapsible, translateY]);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const AnimatedView = Animated.createAnimatedComponent(View);

  const containerStyle =
    collapsible || isTransparent || isBlurred
      ? {
          transform: collapsible ? [{ translateY }] : undefined,
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }
      : {};

  if (isBlurred) {
    return (
      <BlurView
        intensity={30}
        tint={isDark ? 'dark' : 'light'}
        style={[
          style,
          containerStyle,
          {
            paddingTop: insets.top,
            backgroundColor: isDark ? 'rgba(23, 23, 23, 0.8)' : 'rgba(255, 255, 255, 0.6)',
          },
        ]}
        className={`z-50 w-full px-global pt-4 ${className}`}>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            {showBackButton && (
              <TouchableOpacity onPress={handleBackPress} className="relative z-50 mr-global">
                <Icon name="ArrowLeft" size={24} color="white" />
              </TouchableOpacity>
            )}

            <View className="relative z-50 flex-row items-center">
              {leftComponent}

              {title && <Text className="text-lg font-bold text-white">{title}</Text>}
            </View>
          </View>

          {middleComponent && (
            <View className="absolute bottom-0 left-0 right-0 top-0 flex-row items-center justify-center">
              {middleComponent}
            </View>
          )}

          <View className="relative z-50 flex-row items-center">
            {rightComponents.map((component, index) => (
              <View key={index} className="ml-6">
                {component}
              </View>
            ))}
          </View>
        </View>
        {children}
      </BlurView>
    );
  }

  if (isTransparent) {
    return (
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={[
          style,
          containerStyle,
          {
            paddingTop: insets.top + 16,
            paddingBottom: 40,
            paddingHorizontal: 16,
            zIndex: 50,
            width: '100%',
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            {showBackButton && (
              <TouchableOpacity onPress={handleBackPress} className="relative z-50 mr-global">
                <Icon name="ArrowLeft" size={24} color="white" />
              </TouchableOpacity>
            )}

            <View className="relative z-50 flex-row items-center">
              {leftComponent}

              {title && <Text className="text-lg font-bold text-white">{title}</Text>}
            </View>
          </View>

          {middleComponent && (
            <View className="absolute bottom-0 left-0 right-0 top-0 flex-row items-center justify-center">
              {middleComponent}
            </View>
          )}

          <View className="relative z-50 flex-row items-center">
            {rightComponents.map((component, index) => (
              <View key={index} className="ml-6">
                {component}
              </View>
            ))}
          </View>
        </View>
        {children}
      </LinearGradient>
    );
  }

  return (
    <AnimatedView
      style={[
        collapsible ? { paddingTop: insets.top } : { paddingTop: insets.top },
        style,
        containerStyle,
      ]}
      className={`relative z-50 w-full flex-row justify-between bg-background px-global ${className}`}>
      {(showBackButton || leftComponent || title) && (
        <View className="flex-1 flex-row items-center">
          {showBackButton && (
            <TouchableOpacity onPress={handleBackPress} className="relative z-50 mr-global py-4">
              <Icon name="ArrowLeft" size={24} color={isTransparent ? 'white' : colors.icon} />
            </TouchableOpacity>
          )}

          {leftComponent ||
            (title && (
              <View className="relative z-50 flex-row items-center py-4  ">
                {leftComponent}

                {title && <Text className="text-lg font-bold text-text">{title}</Text>}
              </View>
            ))}
        </View>
      )}
      {middleComponent && (
        <View className="flex-1 flex-row items-center justify-center py-4 ">{middleComponent}</View>
      )}

      {rightComponents.length > 0 && (
        <View className="relative z-50 flex-1 flex-row items-center justify-end ">
          {rightComponents.map((component, index) => (
            <View key={index} className="ml-6">
              {component}
            </View>
          ))}
        </View>
      )}
      {children}
    </AnimatedView>
  );
};

export default Header;

type HeaderItemProps = {
  href: string;
  icon: IconName;
  className?: string;
  hasBadge?: boolean;
  onPress?: any;
  isWhite?: boolean;
};

export const HeaderIcon = ({
  href,
  icon,
  hasBadge,
  onPress,
  className = '',
  isWhite = false,
}: HeaderItemProps) => (
  <>
    {onPress ? (
      <TouchableOpacity onPress={onPress} className="overflow-visible">
        <View
          className={`relative h-7 w-7 flex-row items-center justify-center overflow-visible ${className}`}>
          {hasBadge && (
            <View className="absolute -right-0 -top-0 z-30 h-4 w-4 rounded-full border-2 border-background bg-red-500" />
          )}
          {isWhite ? <Icon name={icon} size={25} color="white" /> : <Icon name={icon} size={25} />}
        </View>
      </TouchableOpacity>
    ) : (
      <Link href={href} asChild>
        <TouchableOpacity className="overflow-visible">
          <View
            className={`relative h-7 w-7 flex-row items-center justify-center overflow-visible ${className}`}>
            {hasBadge && (
              <View className="absolute -right-[3px] -top-0 z-30 h-4 w-4 rounded-full border-2 border-background bg-red-500" />
            )}
            {isWhite ? (
              <Icon name={icon} size={25} color="white" />
            ) : (
              <Icon name={icon} size={25} />
            )}
          </View>
        </TouchableOpacity>
      </Link>
    )}
  </>
);
