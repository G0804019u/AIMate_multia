import { LinearGradient } from 'expo-linear-gradient';
import { router, Link } from 'expo-router';
import React from 'react';
import { View, Image, TouchableOpacity, Text, Share } from 'react-native';

import Avatar from '@/components/Avatar';
import Favorite from '@/components/Favorite';
import Header, { HeaderIcon } from '@/components/Header';
import Icon, { IconName } from '@/components/Icon';
import ShowRating from '@/components/ShowRating';
import ThemeTabs, { ThemeTab } from '@/components/ThemeTabs';
import ThemedText from '@/components/ThemedText';
import Divider from '@/components/layout/Divider';
import List from '@/components/layout/List';
import Section from '@/components/layout/Section';
export default function UserProfileScreen() {
  // Mock user data
  const user = {
    id: 1,
    name: 'Alex Johnson',
    location: 'New York, USA',
    rating: 4.9,
    reviewCount: 78,
    bio: 'Full-stack web developer with 6+ years of experience specializing in React and Node.js. I build responsive, scalable web applications with a focus on performance and modern UX/UI principles.',
    features: {
      experience: '6+ years',
      projects: '85+ completed',
      response: '1 hour',
      languages: 'JavaScript, TypeScript, Python',
    },
    specialties: ['React', 'Node.js', 'MongoDB', 'AWS', 'Next.js'],
    services: [
      {
        id: 1,
        title: 'Custom Website Development',
        price: '$2,500',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
        rating: 4.8,
      },
      {
        id: 2,
        title: 'Web App Development',
        price: '$4,800',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
        rating: 4.9,
      },
      {
        id: 3,
        title: 'Frontend Optimization',
        price: '$1,200',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
        rating: 4.7,
      },
      {
        id: 4,
        title: 'API Development & Integration',
        price: '$1,800',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        rating: 4.9,
      },
      {
        id: 5,
        title: 'E-commerce Solutions',
        price: '$3,500',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
        rating: 4.6,
      },
    ],
    reviews: [
      {
        id: 1,
        user: 'Jamie Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        content:
          'Alex built an amazing web app for our startup. Clean code, excellent communication, and delivered on time!',
        date: '2 weeks ago',
      },
      {
        id: 2,
        user: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 5,
        content:
          'Incredibly talented developer who solved complex problems with elegant solutions. Will hire again!',
        date: '1 month ago',
      },
      {
        id: 3,
        user: 'Sarah Miller',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        rating: 4,
        content:
          'Great work on our e-commerce site. Performance is excellent and the UI is beautiful.',
        date: '2 months ago',
      },
    ],
  };

  // Profile header component
  const ProfileHeader = () => (
    <View>
      <View className="relative h-56 overflow-hidden rounded-3xl px-global">
        <Image
          source={require('@/assets/img/banner.jpg')}
          className="h-full w-full rounded-2xl"
          resizeMode="cover"
        />
      </View>

      <View className="-mt-12 mb-4 px-10">
        <View className="flex-row items-end">
          <Avatar
            src={require('@/assets/img/user-3.jpg')}
            size="xxl"
            border
            className="border-8 border-secondary"
          />
          <View className="flex-1 pb-2 pl-4">
            <View className="flex-row items-center justify-end">
              <ShowRating rating={user.rating} />
              <ThemedText className="ml-1 font-normal opacity-50">
                ({user.reviewCount} reviews)
              </ThemedText>
            </View>
          </View>
        </View>

        <ThemedText className="mt-2 text-2xl font-bold">{user.name}</ThemedText>
        <View className="mt-1 flex-row items-center">
          <Icon name="MapPin" size={16} />
          <ThemedText className="ml-1 text-subtext">{user.location}</ThemedText>
        </View>
      </View>
    </View>
  );

  const ServiceCard = (props: any) => {
    return (
      <Link asChild href="/screens/product-detail">
        <TouchableOpacity
          activeOpacity={0.8}
          className="mb-4 flex w-full flex-row overflow-hidden rounded-2xl bg-secondary">
          <View className="relative h-[140px] w-1/3">
            <Image source={{ uri: props.image }} className="h-full w-full" />
            <LinearGradient
              dither={false}
              colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: 12,
              }}>
              <Favorite isWhite size={20} />
            </LinearGradient>
          </View>
          <View className="flex-1 justify-between p-4">
            <View className="flex-1 justify-start">
              <ThemedText className="text-base">{props.title}</ThemedText>
            </View>
            <View className="flex-1 flex-row items-end justify-between">
              <ShowRating size="sm" rating={props.rating} />
              <ThemedText className="text-sm font-semibold"> {props.price}</ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  // Feature item component for the About tab
  const FeatureItem = ({
    icon,
    label,
    value,
  }: {
    icon: IconName;
    label: string;
    value: string;
  }) => (
    <View className="flex-row items-center border-b border-border py-5">
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-state">
        <Icon name={icon} size={18} />
      </View>
      <View className="flex-1">
        <ThemedText className="text-subtext">{label}</ThemedText>
        <ThemedText className="font-semibold">{value}</ThemedText>
      </View>
    </View>
  );

  // Render reviews as a list
  const renderReviews = () => (
    <List variant="divided" className="px-4 py-4" spacing={16}>
      {user.reviews.map((review) => (
        <View key={review.id} className=" rounded-2xl bg-secondary p-6">
          <View className="mb-2 flex-row items-center">
            <Image source={{ uri: review.avatar }} className="h-8 w-8 rounded-full" />
            <View className="ml-2 flex-1">
              <View className="flex-1 flex-row items-center justify-between">
                <ThemedText className="font-bold">{review.user}</ThemedText>
                <ThemedText className="ml-2 text-xs text-subtext">{review.date}</ThemedText>
              </View>
              <View className="flex-row">
                <ShowRating size="sm" rating={review.rating} />
              </View>
            </View>
          </View>
          <ThemedText className="mt-4 leading-normal">{review.content}</ThemedText>
        </View>
      ))}
    </List>
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this provider: ${user.name}`,
        title: user.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header
        showBackButton
        onBackPress={() => router.back()}
        rightComponents={[
          <HeaderIcon icon="Share2" onPress={handleShare} href="0" />,
          <HeaderIcon icon="MessageCircle" href="/screens/chat/user" />,
        ]}
      />
      <ThemeTabs headerComponent={<ProfileHeader />} type="fixed">
        <ThemeTab name="About">
          <View className="px-8 py-4">
            <Section titleSize="md" title="Bio" className="">
              <View className="mt-2">
                <ThemedText className="text-sm">{user.bio}</ThemedText>
              </View>
            </Section>
            <Divider className="my-8" />
            <Section title="Provider Details" titleSize="md" className="mb-8">
              <View className="mt-3 rounded-2xl bg-background">
                <FeatureItem icon="Clock" label="Experience" value={user.features.experience} />
                <FeatureItem icon="CheckCircle" label="Projects" value={user.features.projects} />
                <FeatureItem
                  icon="MessageCircle"
                  label="Response Time"
                  value={user.features.response}
                />
                <FeatureItem icon="Globe" label="Languages" value={user.features.languages} />
              </View>
            </Section>
            <Section titleSize="md" title="Specialties" className="mb-4">
              <View className="mt-6 flex-row flex-wrap">
                {user.specialties.map((specialty, index) => (
                  <View key={index} className="mb-2 mr-2 rounded-full bg-secondary px-4 py-2">
                    <ThemedText className="text-sm font-medium">{specialty}</ThemedText>
                  </View>
                ))}
              </View>
            </Section>
          </View>
        </ThemeTab>

        <ThemeTab name="Services">
          <View className="p-4">
            {user.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                price={service.price}
                image={service.image}
                rating={service.rating}
              />
            ))}
          </View>
        </ThemeTab>

        <ThemeTab name="Reviews">{renderReviews()}</ThemeTab>
      </ThemeTabs>
    </View>
  );
}
