import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';

import useCollapsibleHeader from '@/app/hooks/useCollapsibleHeader';
import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import Card from '@/components/Card';
import { CardScroller } from '@/components/CardScroller';
import CustomCard from '@/components/CustomCard';
import Header, { HeaderIcon } from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';

import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';
import ShowRating from '@/components/ShowRating';
import DrawerButton from '@/components/DrawerButton';
import { shadowPresets } from '@/utils/useShadow';

const HomeScreen = () => {
  const { headerVisible, scrollHandler } = useCollapsibleHeader();
  const rightComponents = [
    <HeaderIcon key="notifications-icon" hasBadge icon="Bell" href="/screens/notifications" />,
  ];
  const middleComponent = [
    <ThemedText key="app-title" className="font-outfit-bold text-2xl">
      Multia<Text className="text-highlight">.</Text>
    </ThemedText>,
  ];
  const leftComponent = [<DrawerButton key="drawer-button" />];

  return (
    <View className="flex-1 bg-background">
      <Header
        leftComponent={leftComponent}
        rightComponents={rightComponents}
        middleComponent={middleComponent}
      />

      <ThemeScroller>
        <AnimatedView animation="scaleIn" className="flex-1">
          <Link href="/search" asChild>
            <Pressable
              style={{
                elevation: 10,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 6.84,
                shadowOffset: { width: 0, height: 4 },
              }}
              className="relative mb-8 mt-3 flex flex-row items-center rounded-full bg-secondary px-5 py-5">
              <Icon name="Search" size={20} />
              <ThemedText className="ml-4 text-text">Search here</ThemedText>
            </Pressable>
          </Link>

          <View>
            <Section title="Popular services" titleSize="lg">
              <CardScroller space={8} className="mt-1">
                <CategorySelect bg="bg-teal-600" icon="MonitorCheck" title="Web design" />
                <CategorySelect bg="bg-sky-600" icon="Feather" title="Logo design" />
                <CategorySelect bg="bg-pink-600" icon="Video" title="Video editing" />
                <CategorySelect bg="bg-lime-600" icon="PenTool" title="Architecture" />
                <CategorySelect bg="bg-purple-600" icon="Facebook" title="Social media" />
                <CategorySelect bg="bg-orange-600" icon="Award" title="Marketing" />
              </CardScroller>
            </Section>

            <CustomCard
              backgroundImage={require('@/assets/img/banner-4.jpg')}
              className="mt-8 w-full"
              rounded="3xl"
              overlayOpacity={0}
              href="/screens/products">
              <View className="flex h-64 w-full flex-col justify-end p-8">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="font-outfit-bold text-2xl text-white">
                      Created with Multia
                    </Text>
                    <Text className="text-sm text-white">Check latest works from our creators</Text>
                  </View>
                </View>
              </View>
            </CustomCard>

            <Section title="Recently viewed" titleSize="lg" className="pt-20">
              <CardScroller space={5} className="mt-1 pb-4">
                <Card
                  title="Have a website for your business"
                  rounded="2xl"
                  href="/screens/product-detail"
                  price="$100"
                  hasShadow
                  width={160}
                  imageHeight={120}
                  image={require('@/assets/img/service-1.jpg')}
                  className="mb-1"
                />
                <Card
                  title="Creating art for your brand"
                  rounded="2xl"
                  href="/screens/product-detail"
                  price="$100"
                  hasShadow
                  width={160}
                  imageHeight={120}
                  image={require('@/assets/img/service-3.jpg')}
                />
                <Card
                  title="Creating a logo for your business"
                  rounded="2xl"
                  href="/screens/product-detail"
                  price="$100"
                  hasShadow
                  width={160}
                  imageHeight={120}
                  image={require('@/assets/img/service-2.jpg')}
                />
                <Card
                  title="Vibrant illustrations for your business"
                  rounded="2xl"
                  href="/screens/product-detail"
                  price="$100"
                  hasShadow
                  width={160}
                  imageHeight={120}
                  image={require('@/assets/img/service-4.jpg')}
                />
              </CardScroller>
            </Section>

            <Section title="Popular users" titleSize="lg" className="mt-6">
              <CardScroller space={5} className="mt-1 pb-4">
                <PopularUsers
                  image={require('@/assets/img/banner.jpg')}
                  avatar={require('@/assets/img/thomino.jpg')}
                  name="John Doe"
                  location="New York"
                  rating={4.5}
                  descfiption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
                <PopularUsers
                  image={require('@/assets/img/banner-4.jpg')}
                  avatar={require('@/assets/img/thomino.jpg')}
                  name="John Doe"
                  location="New York"
                  rating={4.5}
                  descfiption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
                <PopularUsers
                  image={require('@/assets/img/banner-3.jpg')}
                  avatar={require('@/assets/img/thomino.jpg')}
                  name="John Doe"
                  location="New York"
                  rating={4.5}
                  descfiption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
              </CardScroller>
            </Section>

            <Section title="Upcoming events" titleSize="lg" className="mt-10">
              <CardScroller space={5} className="mt-1">
                <View className="w-80">
                  <EventCard
                    image={require('@/assets/img/banner.jpg')}
                    title="Web dev conference"
                    location="New York"
                  />
                  <EventCard
                    image={require('@/assets/img/banner-4.jpg')}
                    title="Figma workshop"
                    location="Barcelona"
                  />
                  <EventCard
                    image={require('@/assets/img/banner-2.jpg')}
                    title="Cursor discovery"
                    location="New York"
                  />
                </View>
                <View className="w-80">
                  <EventCard
                    image={require('@/assets/img/banner-2.jpg')}
                    title="Web dev conference"
                    location="New York"
                  />
                  <EventCard
                    image={require('@/assets/img/banner-3.jpg')}
                    title="Figma workshop"
                    location="New York"
                  />
                  <EventCard
                    image={require('@/assets/img/banner.jpg')}
                    title="Cursor discovery"
                    location="New York"
                  />
                </View>
              </CardScroller>
            </Section>
          </View>
        </AnimatedView>
      </ThemeScroller>
    </View>
  );
};

export const SearchPressable = () => {
  return (
    <Link href="/screens/search-form" asChild>
      <Pressable
        style={{ ...shadowPresets.card }}
        className="relative flex-1 rounded-full bg-secondary px-10 py-3">
        <Icon name="Search" className="absolute left-3 top-2.5 z-50" size={20} />
        <ThemedText className="text-text">Search here</ThemedText>
      </Pressable>
    </Link>
  );
};

const CategorySelect = (props: any) => {
  return (
    <Link href="/screens/products" asChild>
      <Pressable
        className={`items-between relative flex w-28 flex-col justify-between rounded-3xl border border-border py-4  pl-4 `}>
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 12 }}
        />
        <View className="mb-6 flex items-start justify-start">
          <Icon name={props.icon} strokeWidth={1.4} size={22} />
        </View>
        <Text className="mt-2 w-full text-left text-xs font-normal text-text">{props.title}</Text>
      </Pressable>
    </Link>
  );
};

const PopularUsers = (props: any) => {
  return (
    <Link href="/screens/user-profile" asChild>
      <Pressable
        style={{
          ...shadowPresets.card,
        }}
        className="w-80 rounded-2xl bg-secondary">
        <Image source={props.image} className="h-36 w-full rounded-2xl" />
        <View className="-mt-10 items-start p-4 pt-0">
          <View className="rounded-full border-4 border-secondary">
            <Avatar src={props.avatar} size="lg" />
          </View>
          <View className="w-full flex-row items-center justify-between">
            <ThemedText className="mt-2 text-base font-semibold">{props.name}</ThemedText>
            <ShowRating rating={props.rating} />
          </View>
          <View className="w-full flex-row items-center justify-start opacity-50">
            <Icon name="MapPin" size={12} />
            <ThemedText className="ml-1 text-xs">{props.location}</ThemedText>
          </View>
          <ThemedText className="mt-3 text-sm text-subtext">{props.descfiption}</ThemedText>
        </View>
      </Pressable>
    </Link>
  );
};

const EventCard = (props: any) => {
  return (
    <Pressable
      style={{
        ...shadowPresets.card,
      }}
      className="mb-2 flex w-full flex-row items-center rounded-xl bg-secondary p-2">
      <Image source={props.image} className=" h-16 w-16 rounded-xl" />
      <View className="ml-4">
        <ThemedText className="text-sm font-semibold  ">{props.title}</ThemedText>
        <View className="flex-row items-center opacity-50">
          <Icon name="MapPin" size={12} />
          <ThemedText className="ml-1 text-xs">{props.location}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeScreen;
