import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Share,
  Dimensions,
  Easing,
  Platform,
} from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColors } from '../contexts/ThemeColors';

import ActionSheetThemed from '@/components/ActionSheetThemed';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import ThemedScroller from '@/components/ThemeScroller';
import ImageCarousel from '@/components/ImageCarousel';

import { CardScroller } from '@/components/CardScroller';
import Switch from '@/components/forms/Switch';
import Divider from '@/components/layout/Divider';
import Section from '@/components/layout/Section';
import Card from '@/components/Card';
import useShadow, { shadowPresets } from '@/utils/useShadow';
import Favorite from '@/components/Favorite';
import ShowRating from '@/components/ShowRating';
import Icon, { IconName } from '@/components/Icon';
import AnimatedView from '@/components/AnimatedView';

const service = {
  id: 1,
  title: 'Professional Logo Design Package',
  description:
    'I will create a modern, versatile logo for your brand with unlimited revisions until you are 100% satisfied. This package includes multiple concepts and all source files for print and digital use.',
  price: '$85',
  features: {
    revisions: 'Unlimited',
    deliveryDays: '3-5 days',
    concepts: '3 initial concepts',
    sourceFiles: 'Included (AI, Figma)',
  },
  ratings: {
    overall: 4.9,
    communication: 4.8,
    quality: 5.0,
    value: 4.7,
    reviews: 82,
  },
  provider: {
    id: 101,
    name: 'Alex Thompson',
    avatar: require('@/assets/img/user-3.jpg'),
    location: 'San Francisco, CA',
    joinedDate: 'January 2022',
  },
  images: [
    require('@/assets/img/service-1.jpg'),
    require('@/assets/img/service-2.jpg'),
    require('@/assets/img/service-3.jpg'),
    require('@/assets/img/service-4.jpg'),
  ],
};

const reviewsData = [
  {
    rating: 5,
    description:
      'Absolutely amazing work! Alex delivered the perfect logo for my business. The communication was excellent throughout the process.',
    date: 'May 15, 2023',
    username: 'Sarah M.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    rating: 5,
    description:
      'Incredible attention to detail. I received multiple concepts and all were great. The final design exceeded my expectations!',
    date: 'April 3, 2023',
    username: 'Michael T.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    rating: 4,
    description:
      'Great quality work and very responsive. Would definitely recommend and use again for future projects.',
    date: 'March 22, 2023',
    username: 'Jessica K.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    rating: 5,
    description:
      'Fantastic service! The logo perfectly captures my brand identity. Very professional and accommodating with revisions.',
    date: 'February 18, 2023',
    username: 'David R.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
];

const recommendedServices = [
  {
    id: 2,
    title: 'Website Development',
    price: '$250',
    image: require('@/assets/img/service-1.jpg'),
  },
  {
    id: 3,
    title: 'Social Media Graphics',
    price: '$65',
    image: require('@/assets/img/service-3.jpg'),
  },
  {
    id: 4,
    title: 'Brand Identity Package',
    price: '$150',
    image: require('@/assets/img/service-4.jpg'),
  },
  {
    id: 5,
    title: 'Custom Illustrations',
    price: '$95',
    image: require('@/assets/img/service-2.jpg'),
  },
];

const ServiceDetail = () => {
  const [expressDelivery, setExpressDelivery] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();

  const totalPrice = expressDelivery
    ? `$${(parseFloat(service.price.replace('$', '')) + 24).toFixed(2)}`
    : service.price;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this awesome service: ${service.title}\nPrice: ${service.price}`,
        title: service.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOrder = () => {
    actionSheetRef.current?.show();
  };

  const rightComponents = [
    <Favorite productName={service.title} size={25} isWhite />,
    <HeaderIcon icon="Share2" onPress={handleShare} isWhite href="0" />,
  ];

  return (
    <>
      <StatusBar style="light" />
      <Header variant="transparent" title="" rightComponents={rightComponents} showBackButton />
      <ThemedScroller className="bg-background !px-0">
        <ImageCarousel images={service.images} height={500} paginationStyle="dots" />

        <View className="p-global">
          <View className="py-global">
            <ThemedText className="text-3xl font-semibold">{service.title}</ThemedText>
            <ThemedText className="mt-2 text-lg font-normal">{service.price}</ThemedText>
          </View>

          <ThemedText className="mb-6 text-base">{service.description}</ThemedText>

          <View className="mb-4 mt-4 flex-row items-center rounded-2xl bg-secondary p-4">
            <Avatar
              size="md"
              src={service.provider.avatar}
              className="mr-4"
              link="/screens/user-profile"
            />
            <View className="ml-0">
              <ThemedText className="text-base font-semibold">{service.provider.name}</ThemedText>
              <View className="flex-row items-center">
                <Icon name="MapPin" size={12} className="mr-1" />
                <ThemedText className="text-xs text-subtext">
                  {service.provider.location}
                </ThemedText>
              </View>
            </View>
          </View>

          <Section title="Features" titleSize="lg" className="mb-6 mt-2">
            <View className="mt-3 rounded-2xl bg-secondary p-4">
              <FeatureItem icon="Repeat" label="Revisions" value={service.features.revisions} />
              <FeatureItem
                icon="Clock"
                label="Delivery Time"
                value={service.features.deliveryDays}
              />
              <FeatureItem
                icon="Layers"
                label="Initial Concepts"
                value={service.features.concepts}
              />
              <FeatureItem
                icon="FileText"
                label="Source Files"
                value={service.features.sourceFiles}
              />
            </View>
          </Section>

          <Divider className="my-4" />
          <View className="flex-row items-center justify-between">
            <Switch
              icon="Zap"
              label="Express Delivery (24-48 hours)"
              description="Get your design with priority support"
              value={expressDelivery}
              onChange={setExpressDelivery}
              className="flex-1 py-3"
            />
            <ThemedText className="ml-2 font-medium">+$24</ThemedText>
          </View>

          <Divider className="my-4" />

          <Section
            title="Reviews"
            titleSize="lg"
            subtitle={`${service.ratings.reviews} reviews`}
            className="mb-6">
            <View className="mt-4 rounded-2xl bg-secondary p-4">
              <View className="mb-4 flex-row items-center">
                <ShowRating rating={service.ratings.overall} size="lg" />
                <ThemedText className="ml-2 text-subtext">({service.ratings.reviews})</ThemedText>
              </View>

              <View className="space-y-2">
                <RatingItem label="Communication" rating={service.ratings.communication} />
                <RatingItem label="Quality of Service" rating={service.ratings.quality} />
                <RatingItem label="Value for Money" rating={service.ratings.value} />
              </View>
            </View>

            <ThemedText className="mb-3 mt-6 text-lg font-semibold">Client Reviews</ThemedText>
            <CardScroller className="mt-1" space={10}>
              {reviewsData.map((review, index) => (
                <View key={index} className="w-[280px] rounded-2xl bg-secondary p-4">
                  <View className="mb-2 flex-row items-center">
                    <Image
                      source={{ uri: review.avatar }}
                      className="mr-2 h-10 w-10 rounded-full"
                    />
                    <View>
                      <ThemedText className="font-medium">{review.username}</ThemedText>
                      <ThemedText className="text-xs text-subtext">{review.date}</ThemedText>
                    </View>
                  </View>
                  <ShowRating rating={review.rating} size="sm" className="mb-2" />
                  <ThemedText className="text-sm">{review.description}</ThemedText>
                </View>
              ))}
            </CardScroller>
          </Section>

          <Divider className="my-4" />

          <Section title="You might also like" titleSize="lg" className="mb-20">
            <CardScroller className="mt-1" space={10}>
              {recommendedServices.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  rounded="lg"
                  image={item.image}
                  imageHeight={120}
                  href={`/screens/product-detail?id=${item.id}`}
                  width={150}
                  description={item.price}
                />
              ))}
            </CardScroller>
          </Section>
        </View>
      </ThemedScroller>

      <BottomOrderBar />

      <ActionSheetThemed
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View className="px-4 pb-8 pt-4">
          <ThemedText className="mb-4 text-lg font-bold">Confirm Your Order</ThemedText>
          <View className="mb-6 flex-row items-center">
            <Image source={service.images[0]} className="h-20 w-20 rounded-2xl bg-secondary" />
            <View className="ml-3">
              <ThemedText className="font-bold">{service.title}</ThemedText>
              <ThemedText className="text-subtext">
                {totalPrice} {expressDelivery && '(includes express delivery)'}
              </ThemedText>
            </View>
          </View>

          <View className="w-full flex-row gap-2">
            <Button
              title="Cancel"
              rounded="full"
              className="bg-background/40 flex-1"
              textClassName="text-text"
              onPress={() => actionSheetRef.current?.hide()}
            />
            <Button
              className="flex-1 bg-highlight"
              rounded="full"
              textClassName="text-white"
              title="Proceed to Checkout"
              onPress={() => {
                actionSheetRef.current?.hide();
                router.push('/screens/checkout');
              }}
            />
          </View>
        </View>
      </ActionSheetThemed>
    </>
  );
};

const INITIAL_HEIGHT = 78;
const EXPANDED_HEIGHT = 240;
const CONTAINER_PADDING = 32; // p-4 on each side of outer wrapper
const BLUR_PADDING = 32; // px-4 on each side of blur view
const FULL_BUTTON_WIDTH = Dimensions.get('window').width - CONTAINER_PADDING - BLUR_PADDING;
const SHRUNK_BUTTON_WIDTH = 56;

type BarState = 'idle' | 'loading' | 'added' | 'dismissing';

const BottomOrderBar = () => {
  const [barState, setBarState] = useState<BarState>('idle');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const heightAnim = useRef(new Animated.Value(INITIAL_HEIGHT)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;
  const buttonWidthAnim = useRef(new Animated.Value(FULL_BUTTON_WIDTH * 0.45)).current;
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const colors = useThemeColors();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const buttonTextAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (barState === 'loading') {
      spinAnim.setValue(0);
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [barState]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const idleSlideX = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const buttonTextSlideY = buttonTextAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 0],
  });

  const handleBookNow = () => {
    setBarState('loading');
    // Shrink button to spinner size
    Animated.timing(buttonWidthAnim, {
      toValue: SHRUNK_BUTTON_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start();

    loadingTimeoutRef.current = setTimeout(() => {
      // Fade out thumbnail and text
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setBarState('added');
        buttonTextAnim.setValue(0);
        // Expand container height + expand button to full + fade in message + fade in button text
        Animated.parallel([
          Animated.spring(heightAnim, {
            toValue: EXPANDED_HEIGHT,
            useNativeDriver: false,
            friction: 10,
            tension: 80,
          }),
          Animated.timing(messageAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(buttonWidthAnim, {
            toValue: FULL_BUTTON_WIDTH,
            useNativeDriver: false,
            friction: 8,
            tension: 60,
          }),
          Animated.timing(buttonTextAnim, {
            toValue: 1,
            duration: 300,
            delay: 150,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 1000);
  };

  const handleDismiss = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setBarState('dismissing');
    // Fade out button text, then animate everything back
    Animated.timing(buttonTextAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.parallel([
        Animated.timing(messageAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(heightAnim, {
          toValue: INITIAL_HEIGHT,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(buttonWidthAnim, {
          toValue: FULL_BUTTON_WIDTH * 0.45,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setBarState('idle');
        Animated.timing(buttonTextAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  const handleCheckout = () => {
    router.push('/screens/checkout');
  };

  return (
    <AnimatedView
      className="absolute bottom-0 left-0 right-0 p-4"
      animation="slideInBottom"
      duration={500}
      delay={400}>
      <View className="relative overflow-hidden rounded-[40px] border border-border">
        <View
          className={`absolute bottom-0 left-0 h-full w-full bg-secondary ${Platform.OS === 'ios' ? 'opacity-0' : ''}`}
        />
        <Animated.View style={{ height: heightAnim }}>
          <BlurView
            intensity={40}
            tint="dark"
            className="relative justify-center rounded-[40px] px-4 py-4"
            style={{
              paddingHorizontal: 16,
              borderRadius: 40,
              position: 'relative',
              justifyContent: 'center',
              paddingVertical: 16,
              ...shadowPresets.card,
              flex: 1,
            }}>
            {/* Idle / Loading row */}
            <Animated.View
              style={{ opacity: fadeAnim, transform: [{ translateX: idleSlideX }] }}
              className="flex-row items-center"
              pointerEvents={barState === 'added' || barState === 'dismissing' ? 'none' : 'auto'}>
              <Image
                source={require('@/assets/img/user-3.jpg')}
                className="ml-2 mr-4 h-14 w-14 rounded-2xl"
              />
              <View className="flex-1">
                <ThemedText className="text-xs opacity-60">Service total</ThemedText>
                <ThemedText className="text-2xl font-bold">$100</ThemedText>
              </View>
            </Animated.View>

            {/* Added to cart message */}
            {(barState === 'added' || barState === 'dismissing') && (
              <Animated.View
                style={{ opacity: messageAnim }}
                className="absolute bottom-0 left-0 right-0 top-0 pb-20">
                <View className="h-full w-full flex-row  items-center justify-center">
                  <View className="flex-col items-center pt-10">
                    <LottieView
                      source={require('@/assets/lottie/check.json')}
                      autoPlay
                      loop={false}
                      style={{ width: 100, height: 100 }}
                      colorFilters={[
                        { keypath: 'Shape Layer 3', color: colors.text },
                        { keypath: 'Shape Layer 2', color: colors.text },
                      ]}
                    />
                  </View>
                  <Pressable
                    onPress={handleDismiss}
                    className="absolute right-5 top-4 rounded-full border border-text px-4 py-2">
                    <ThemedText className="text-sm font-semibold">Cancel</ThemedText>
                  </Pressable>
                </View>
              </Animated.View>
            )}

            {/* Animated button - persists across states */}
            <Animated.View
              style={{ width: buttonWidthAnim }}
              className={`absolute right-4 ${barState === 'added' || barState === 'dismissing' ? 'bottom-4' : 'self-center'}`}>
              <Pressable
                onPress={
                  barState === 'added' || barState === 'dismissing' ? handleCheckout : handleBookNow
                }
                disabled={barState === 'dismissing'}
                className="h-14 items-center justify-center rounded-full bg-text p-4">
                {barState === 'loading' ? (
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Icon name="Loader2" size={20} color={colors.invert} />
                  </Animated.View>
                ) : (
                  <Animated.Text
                    style={{
                      opacity: buttonTextAnim,
                      transform: [{ translateY: buttonTextSlideY }],
                    }}
                    numberOfLines={1}
                    className="whitespace-nowrap text-sm font-semibold text-invert">
                    {barState === 'added' || barState === 'dismissing'
                      ? 'Go to checkout'
                      : 'Book Now'}
                  </Animated.Text>
                )}
              </Pressable>
              {/*<Button
                                title={barState === 'added' ? 'Go to checkout' : 'Book Now'}
                                loading={barState === 'loading'}
                                className='bg-primary'
                                textClassName='text-invert'
                                size='large'
                                rounded='full'
                                iconEnd={barState === 'added' ? 'ArrowRight' : undefined}
                                onPress={barState === 'added' ? handleCheckout : handleBookNow}
                                disabled={barState === 'loading'}
                            />*/}
            </Animated.View>
          </BlurView>
        </Animated.View>
      </View>
    </AnimatedView>
  );
};

// Feature Item Component
interface FeatureItemProps {
  icon: IconName;
  label: string;
  value: string;
}

const FeatureItem = ({ icon, label, value }: FeatureItemProps) => (
  <View className="flex-row items-center py-4">
    <Icon name={icon} size={18} className="mr-3" />
    <ThemedText className="flex-1">{label}</ThemedText>
    <ThemedText className="font-medium">{value}</ThemedText>
  </View>
);

// Rating Item Component
interface RatingItemProps {
  label: string;
  rating: number;
}

const RatingItem = ({ label, rating }: RatingItemProps) => (
  <View className="flex-row items-center justify-between py-2">
    <ThemedText className="text-sm">{label}</ThemedText>
    <View className="flex-row items-center">
      <ShowRating rating={rating} size="sm" />
    </View>
  </View>
);

export default ServiceDetail;
