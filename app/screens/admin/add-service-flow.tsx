import { useNavigation } from 'expo-router/react-navigation';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  Alert,
  BackHandler,
  Easing,
  StyleSheet,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';

import useThemeColors from '@/app/contexts/ThemeColors';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import MultiStep, { Step } from '@/components/MultiStep';
import { MultipleImagePicker } from '@/components/MultipleImagePicker';
import ServiceVariantCreator from '@/components/ServiceVariantCreator';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';

const AddServiceFlow = () => {
  const navigation = useNavigation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Define state for form data
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');

  const handleDeleteService = () => {
    Alert.alert('Delete service?', 'Are you sure you want to delete the service?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', onPress: () => navigation.goBack() },
    ]);
  };

  const handleClose = () => {
    Alert.alert(
      'Exit Session',
      'Are you sure you want to go back? Your progress will not be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => navigation.goBack() },
      ]
    );
    return true; // Prevent default back behavior
  };

  const handleComplete = () => {
    console.log('Service Added Successfully');
    navigation.goBack();
  };

  const handleStepChange = (nextStep: number) => {
    setCurrentStepIndex(nextStep);
    return true;
  };

  // Handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentStepIndex > 0) {
        setCurrentStepIndex((prev) => prev - 1);
        return true; // Prevent default back behavior
      } else {
        handleClose();
        return true;
      }
    });
    return () => backHandler.remove();
  }, [currentStepIndex]);

  return (
    <View className="flex-1 bg-background">
      <View className="absolute left-4 top-4 z-10">
        <Pressable
          onPress={handleDeleteService}
          className="h-12 w-12 items-center justify-center rounded-full">
          <Icon name="Trash2" size={25} />
        </Pressable>
      </View>

      <MultiStep
        onComplete={handleComplete}
        onClose={() => navigation.goBack()}
        showHeader
        showStepIndicator
        onStepChange={handleStepChange}>
        <Step title="Category">
          <View className="px-4 pt-6">
            <ThemedText className="mb-6 text-2xl font-medium">Choose service category</ThemedText>
            <PickerBox title="Design" description="Logo, UI/UX, graphics, illustrations" />
            <PickerBox title="Development" description="Web, mobile, software development" />
            <PickerBox title="Marketing" description="Social media, SEO, content marketing" />
            <PickerBox title="Content" description="Writing, video editing, translation" />
          </View>
        </Step>

        <Step title="Basic Information">
          <View className="px-4 pt-6">
            <ThemedText className="text-2xl font-medium">Basic information</ThemedText>
            <ThemedText className="mb-4 text-sm text-subtext">
              Describe your service in few words and add photos
            </ThemedText>

            <MultipleImagePicker />
            <View className="mt-6">
              <Input
                rightIcon="Tag"
                label="Service name"
                value={serviceName}
                onChangeText={setServiceName}
              />
              <Select
                label="Category"
                options={[
                  { label: 'Design', value: 'design' },
                  { label: 'Development', value: 'development' },
                  { label: 'Marketing', value: 'marketing' },
                  { label: 'Content', value: 'content' },
                ]}
                onChange={() => {}}
              />
              <Input
                isMultiline
                label="Description"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
        </Step>

        <Step title="Pricing">
          <View className="px-4 pt-6">
            <ThemedText className="text-2xl font-medium">Pricing</ThemedText>
            <ThemedText className="mb-4 text-sm text-subtext">
              Set a base price for your service
            </ThemedText>
            <Input
              keyboardType="numeric"
              label="Base price"
              value={basePrice}
              onChangeText={setBasePrice}
            />
            <View className="mt-8 flex-row items-center">
              <View className="mr-auto">
                <ThemedText className=" text-xl font-medium">Options</ThemedText>
                <ThemedText className="mb-4 text-sm text-subtext">
                  Package types, duration, delivery time
                </ThemedText>
              </View>
              <Suggestion isOptions />
            </View>
            <ServiceVariantCreator />
            <View className="h-20 w-full" />
          </View>
        </Step>
      </MultiStep>
    </View>
  );
};

interface PickerBoxProps {
  title: string;
  description: string;
}

const PickerBox: React.FC<PickerBoxProps> = ({ title, description }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPress={() => setIsPressed(!isPressed)}
      className={`relative w-full flex-row items-center justify-between rounded-2xl  border p-4 ${isPressed ? ' mb-[8px]  border-2 border-sky-500' : 'mb-[10px] border-border'}`} // Change the icon name based on the state
    >
      <View>
        <ThemedText className="line-clamp-1 text-base font-medium">{title}</ThemedText>
        <ThemedText className={`text-sm `}>{description}</ThemedText>
      </View>
    </Pressable>
  );
};

interface SuggestionProps {
  isOptions?: boolean;
}

export const Suggestion: React.FC<SuggestionProps> = ({ isOptions }) => {
  const colors = useThemeColors();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handlePresentModal = () => {
    actionSheetRef.current?.show();
  };

  return (
    <>
      <Pressable
        onPress={handlePresentModal}
        className="flex h-[40px] w-[40px] flex-row items-center justify-center rounded-full bg-secondary">
        <Icon name="Search" size={20} />
      </Pressable>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: colors.bg,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View className="p-4">
          <ThemedText className="mx-auto mb-4 text-sm font-bold">Suggestions</ThemedText>
          <View className="w-full">
            {isOptions ? (
              <>
                <SuggestionItem
                  hasCheckbox
                  title="Package Type"
                  description="Basic, Standard, Premium"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Delivery Time"
                  description="1 day, 3 days, 7 days, 14 days"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Revisions"
                  description="1 revision, 3 revisions, Unlimited"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Additional Services"
                  description="Source files, Commercial use, Rush delivery"
                />
                <SuggestionItem
                  hasCheckbox
                  title="Number of concepts"
                  description="1, 3, 5, 10 concepts"
                />
              </>
            ) : (
              <>
                <SuggestionItem
                  title="Logo Design Package"
                  description="Professional logo design with multiple concepts and revisions until satisfaction."
                />
                <SuggestionItem
                  title="Website Development"
                  description="Custom website development with responsive design and SEO optimization."
                />
                <SuggestionItem
                  title="Social Media Management"
                  description="Content creation, scheduling, and engagement for your social media accounts."
                />
                <SuggestionItem
                  title="Content Writing"
                  description="High-quality, SEO-optimized content for blogs, websites, and marketing materials."
                />
                <SuggestionItem
                  title="UI/UX Design"
                  description="User-centered interface design for web and mobile applications."
                />
                <SuggestionItem
                  title="Video Editing"
                  description="Professional video editing for marketing, social media, or personal content."
                />
                <SuggestionItem
                  title="SEO Optimization"
                  description="Improve your website's visibility in search engines with targeted optimization."
                />
                <SuggestionItem
                  title="Mobile App Development"
                  description="Custom mobile application development for iOS and Android platforms."
                />
              </>
            )}
          </View>
        </View>
      </ActionSheet>
    </>
  );
};

interface SuggestionItemProps {
  title: string;
  description: string;
  hasCheckbox?: boolean;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  title,
  description,
  hasCheckbox,
}) => {
  return (
    <Pressable
      onPress={() => {}}
      className="flex flex-row items-center border-b border-border py-5">
      <View className="flex-1 pr-4">
        <ThemedText className="text-base font-semibold">{title}</ThemedText>
        <ThemedText numberOfLines={1} className="text-xs text-subtext">
          {description}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default AddServiceFlow;
