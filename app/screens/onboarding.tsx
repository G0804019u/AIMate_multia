import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import useThemeColors from '@/app/contexts/ThemeColors';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import Icon, { IconName } from '@/components/Icon';
import MultiStep, { Step } from '@/components/MultiStep';
import ShowRating from '@/components/ShowRating';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';
import Selectable from '@/components/forms/Selectable';
import Section from '@/components/layout/Section';

interface OnboardingData {
  profession: string;
  availability: string[];
  rateType: string;
  rateAmount: string;
  profileImage?: string;
  coverImage?: string;
  location?: string;
  description?: string;
}

const professionOptions: { label: string; icon: IconName; value: string }[] = [
  { label: 'Web Developer', icon: 'Code', value: 'web' },
  { label: 'Mobile Developer', icon: 'Phone', value: 'mobile' },
  { label: 'UI/UX Designer', icon: 'Palette', value: 'ui-ux' },
  { label: 'Graphic Designer', icon: 'Image', value: 'graphic' },
  { label: 'Logo Designer', icon: 'PenTool', value: 'logo' },
  { label: 'Motion Designer', icon: 'Video', value: 'motion' },
];

const availabilityOptions: { label: string; icon: IconName }[] = [
  { label: 'Full Time', icon: 'Clock' },
  { label: 'Part Time', icon: 'Clock' },
  { label: 'Freelance', icon: 'UserPlus' },
  { label: 'Remote', icon: 'Globe' },
];

const rateTypeOptions: { label: string; value: string }[] = [
  { label: 'Hourly Rate', value: 'hourly' },
  { label: 'Daily Rate', value: 'daily' },
  { label: 'Project Rate', value: 'project' },
];

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const ProfessionStep: React.FC<StepProps> = ({ data, updateData }) => (
  <ScrollView className="p-4 px-8">
    <View className="mb-10">
      <ThemedText className="mt-auto text-3xl font-extrabold">Select your profession</ThemedText>
      <ThemedText className="text-base text-subtext">What services do you provide?</ThemedText>
    </View>

    {professionOptions.map((option) => (
      <Selectable
        key={option.value}
        title={option.label}
        icon={option.icon}
        selected={data.profession === option.value}
        onPress={() => updateData({ profession: option.value })}
      />
    ))}
  </ScrollView>
);

const AvailabilityStep: React.FC<StepProps> = ({ data, updateData }) => (
  <ScrollView className="p-4 px-8">
    <View className="mb-10">
      <ThemedText className="mt-auto text-3xl font-extrabold">Availability</ThemedText>
      <ThemedText className="text-base text-subtext">Select all that apply</ThemedText>
    </View>

    <View className="flex-col">
      {availabilityOptions.map((option) => (
        <Selectable
          key={option.label}
          title={option.label}
          icon={option.icon}
          selected={data.availability.includes(option.label)}
          onPress={() => {
            const newAvailability = data.availability.includes(option.label)
              ? data.availability.filter((a) => a !== option.label)
              : [...data.availability, option.label];
            updateData({ availability: newAvailability });
          }}
        />
      ))}
    </View>
  </ScrollView>
);

const RatesStep: React.FC<StepProps> = ({ data, updateData }) => {
  return (
    <ScrollView className="p-4 px-8">
      <View className="mb-10">
        <ThemedText className="mt-auto text-3xl font-extrabold">What are your rates?</ThemedText>
        <ThemedText className="text-base text-subtext">
          How do you charge for your services?
        </ThemedText>
      </View>

      <Section title="Hourly Rate" titleSize="md" padding="sm">
        <Input
          rightIcon="DollarSign"
          containerClassName="mt-1"
          variant="classic"
          placeholder="Enter your hourly rate"
          keyboardType="numeric"
          value={data.rateType === 'hourly' ? data.rateAmount : ''}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            updateData({ rateType: 'hourly', rateAmount: numericText });
          }}
        />
      </Section>

      <Section title="Daily Rate" titleSize="md" padding="sm">
        <Input
          containerClassName="mt-1"
          rightIcon="DollarSign"
          variant="classic"
          placeholder="Enter your daily rate"
          keyboardType="numeric"
          value={data.rateType === 'daily' ? data.rateAmount : ''}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            updateData({ rateType: 'daily', rateAmount: numericText });
          }}
        />
      </Section>

      <Section title="Project Rate" titleSize="md" padding="sm">
        <Input
          rightIcon="DollarSign"
          containerClassName="mt-1"
          variant="classic"
          placeholder="Enter your project rate"
          keyboardType="numeric"
          value={data.rateType === 'project' ? data.rateAmount : ''}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            updateData({ rateType: 'project', rateAmount: numericText });
          }}
        />
      </Section>
    </ScrollView>
  );
};

const ProfileDetailsStep: React.FC<StepProps> = ({ data, updateData }) => {
  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateData({ profileImage: result.assets[0].uri });
    }
  };

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      updateData({ coverImage: result.assets[0].uri });
    }
  };

  return (
    <ScrollView className="p-4 px-8">
      <View className="mb-10">
        <ThemedText className="mt-auto text-3xl font-extrabold">Profile Details</ThemedText>
        <ThemedText className="text-base text-subtext">
          Add information to complete your profile
        </ThemedText>
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <View className="items-center">
          <TouchableOpacity onPress={pickProfileImage} className="relative" activeOpacity={0.9}>
            {data.profileImage ? (
              <Image
                source={{ uri: data.profileImage }}
                className="h-24 w-24 rounded-full border border-background"
              />
            ) : (
              <View className="h-24 w-24 items-center justify-center rounded-full bg-secondary">
                <Icon name="Plus" size={25} className="text-subtext" />
              </View>
            )}
          </TouchableOpacity>
          <ThemedText className="mt-2 text-subtext">Profile picture</ThemedText>
        </View>

        <View className="ml-4 flex-1">
          <TouchableOpacity
            onPress={pickCoverImage}
            className="relative w-full"
            activeOpacity={0.9}>
            {data.coverImage ? (
              <Image
                source={{ uri: data.coverImage }}
                className="h-24 w-full rounded-2xl border border-background"
                resizeMode="cover"
              />
            ) : (
              <View className="h-24 w-full items-center justify-center rounded-2xl bg-secondary">
                <Icon name="Plus" size={25} className="text-subtext" />
              </View>
            )}
          </TouchableOpacity>
          <ThemedText className="mt-2 text-center text-subtext">Cover photo</ThemedText>
        </View>
      </View>

      <Section title="Location" titleSize="md" padding="sm" className="mt-0">
        <Input
          variant="classic"
          containerClassName="mt-1"
          rightIcon="MapPin"
          placeholder="Enter your location"
          value={data.location}
          onChangeText={(text) => updateData({ location: text })}
        />
      </Section>

      <Section title="About" titleSize="md" padding="sm">
        <Input
          variant="classic"
          containerClassName="mt-1"
          placeholder="Write a brief description about yourself"
          value={data.description}
          onChangeText={(text) => updateData({ description: text })}
          isMultiline
        />
      </Section>
    </ScrollView>
  );
};

const SuccessStep: React.FC<StepProps> = ({ data }) => {
  const colors = useThemeColors();

  return (
    <View className="flex-1 p-8">
      <View className="mb-8 items-center">
        <ThemedText className="mb-2 text-3xl font-bold">Profile Created!</ThemedText>
        <ThemedText className="px-4 text-center text-base text-subtext">
          Your profile has been created successfully. Here's how it will look:
        </ThemedText>
      </View>

      <View className="mb-8 w-full overflow-hidden rounded-3xl bg-secondary">
        {/* Cover Image */}
        {data.coverImage ? (
          <Image
            source={{ uri: data.coverImage }}
            className="h-44 w-full rounded-t-xl"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('@/assets/img/banner.jpg')}
            className="h-44 w-full rounded-t-xl"
            resizeMode="cover"
          />
        )}
        <View className="-mt-10 items-start p-6 pt-0">
          {/* Profile Picture */}
          <View className="rounded-full border-4 border-secondary">
            {data.profileImage ? (
              <Image source={{ uri: data.profileImage }} className="h-16 w-16 rounded-full" />
            ) : (
              <Image
                source={require('@/assets/img/thomino.jpg')}
                className="h-16 w-16 rounded-full"
              />
            )}
          </View>

          <View className="w-full flex-row items-center justify-between">
            <ThemedText className="mt-2 text-base font-semibold">Alex Johnson</ThemedText>
            <ShowRating rating={4.9} />
          </View>

          {data.location ? (
            <View className="mt-1 w-full flex-row items-center justify-start opacity-50">
              <Icon name="MapPin" size={12} />
              <ThemedText className="ml-1 text-xs">{data.location}</ThemedText>
            </View>
          ) : (
            <View className="mt-1 w-full flex-row items-center justify-start opacity-50">
              <Icon name="MapPin" size={12} />
              <ThemedText className="ml-1 text-xs">New York, USA</ThemedText>
            </View>
          )}

          {data.description ? (
            <ThemedText className="mt-3 text-sm text-subtext">{data.description}</ThemedText>
          ) : (
            <ThemedText className="mt-3 text-sm text-subtext">
              Professional with expertise in creating high-quality solutions. Available for projects
              and collaborations.
            </ThemedText>
          )}
        </View>
      </View>
    </View>
  );
};

export default function OnboardingScreen() {
  const [data, setData] = useState<OnboardingData>({
    profession: '',
    availability: [],
    rateType: 'hourly',
    rateAmount: '',
    profileImage: '',
    coverImage: '',
    location: '',
    description: '',
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((current) => ({ ...current, ...updates }));
  };

  return (
    <MultiStep
      onComplete={() => {
        // Use the theme-aware navigation to prevent flicker
        router.push({
          pathname: '/screens/user-profile',
          params: {},
        });
      }}
      onClose={() => router.push('/(drawer)/(tabs)/')}
      showStepIndicator={false}>
      <Step title="Profession">
        <ProfessionStep data={data} updateData={updateData} />
      </Step>

      <Step title="Availability">
        <AvailabilityStep data={data} updateData={updateData} />
      </Step>

      <Step title="Rates">
        <RatesStep data={data} updateData={updateData} />
      </Step>

      <Step title="Profile">
        <ProfileDetailsStep data={data} updateData={updateData} />
      </Step>

      <Step title="Success">
        <SuccessStep data={data} updateData={updateData} />
      </Step>
    </MultiStep>
  );
}
