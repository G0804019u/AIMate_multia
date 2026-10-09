import { useTheme } from 'app/contexts/ThemeContext';
import React, { useState } from 'react';
import { Pressable, Animated } from 'react-native';

import Icon from './Icon';

interface ThemeToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ value, onChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const [scale] = useState(new Animated.Value(1));
  const [rotate] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);

  const animateIcon = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 45,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setIsAnimating(false));
  };

  const handlePress = () => {
    if (onChange) {
      onChange(!value);
    } else {
      toggleTheme();
    }
    animateIcon();
  };

  const isActive = value !== undefined ? value : isDark;

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={{
          transform: [
            { scale },
            { rotate: rotate.interpolate({ inputRange: [0, 45], outputRange: ['0deg', '45deg'] }) },
          ],
        }}>
        {isActive ? <Icon name="Sun" size={24} /> : <Icon name="Moon" size={24} />}
      </Animated.View>
    </Pressable>
  );
};

export default ThemeToggle;
