import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import Input from '@/components/forms/Input';
import Divider from '@/components/layout/Divider';
import Section from '@/components/layout/Section';

export default function EditProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Header showBackButton rightComponents={[<Button title="Save changes" />]} />
      <ThemedScroller>
        <Section
          titleSize="3xl"
          className="pb-10 pt-4"
          title="Profile Settings"
          subtitle="Manage your account settings"
        />

        <View className="mb-8 mt-6 flex-row items-center">
          <TouchableOpacity onPress={pickImage} className="relative" activeOpacity={0.9}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="h-28 w-28 rounded-full border border-background"
              />
            ) : (
              <View className="h-24 w-24 items-center justify-center rounded-full bg-secondary">
                <Icon name="Plus" size={25} className="text-subtext" />
              </View>
            )}
          </TouchableOpacity>
          <View className="ml-4">
            <Button
              title={profileImage ? 'Change photo' : 'Upload photo'}
              className="text-sm text-subtext"
              onPress={pickImage}
            />

            {profileImage && (
              <Button
                className="mt-2"
                title="Remove photo"
                variant="ghost"
                onPress={() => setProfileImage(null)}
              />
            )}
          </View>
        </View>
        <Section
          titleSize="xl"
          className="pb-8 pt-4"
          title="Personal information"
          subtitle="Manage your personal information"
        />
        <Input label="First Name" value="John" keyboardType="email-address" autoCapitalize="none" />
        <Input
          label="Last Name"
          value="Doe"
          containerClassName="flex-1"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Email"
          keyboardType="email-address"
          value="john.doe@example.com"
          autoCapitalize="none"
        />

        <Divider className="my-4" />

        <Section
          titleSize="xl"
          className="pb-4 pt-4"
          title="Interests"
          subtitle="Choose your interests to personalize your experience"
        />
        <View className="flex-row flex-wrap gap-2">
          <Chip label="Logo design" />
          <Chip label="UI/UX design" />
          <Chip label="Web design" />
          <Chip label="Mobile design" />
          <Chip label="Graphic design" />
          <Chip label="Illustration" />
          <Chip label="Motion design" />
          <Chip label="Product design" />
          <Chip label="Interior design" />
          <Chip label="Fashion design" />
          <Chip label="Architecture design" />
          <Chip label="Industrial design" />
        </View>
      </ThemedScroller>
    </>
  );
}
