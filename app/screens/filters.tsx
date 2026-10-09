import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import ThemeFooter from '@/components/ThemeFooter';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Switch from '@/components/forms/Switch';
import Section from '@/components/layout/Section';

export default function FiltersScreen() {
  const router = useRouter();
  const [price, setPrice] = useState(50);
  const [isSellerOnline, setIsSellerOnline] = useState(false);
  const [offersAIModels, setOffersAIModels] = useState(false);

  const handleApplyFilters = () => {
    // Handle applying filters here
    router.back();
  };

  return (
    <>
      <Header showBackButton title="Filters" />
      <ThemedScroller className="flex-1 bg-background">
        <Section
          className="mb-7 border-b border-border pb-7"
          title="Price"
          subtitle={`Up to $${Math.round(price)} USD`}>
          <Slider
            style={{ width: '100%', height: 40 }}
            value={price}
            minimumValue={100}
            maximumValue={1000}
            onValueChange={setPrice}
            minimumTrackTintColor="#00A6F4"
            maximumTrackTintColor="rgba(0,0,0,0.4)"
            step={10}
          />
        </Section>

        <Section className="mb-7 border-b border-border pb-7" title="Style">
          <View className="mt-2 flex-row flex-wrap gap-2">
            <Chip label="Modern" size="lg" selectable />
            <Chip label="Minimalist" size="lg" selectable />
            <Chip label="Corporate" size="lg" selectable />
            <Chip label="Creative" size="lg" selectable />
            <Chip label="E-commerce" size="lg" selectable />
            <Chip label="Portfolio" size="lg" selectable />
            <Chip label="Blog" size="lg" selectable />
          </View>
        </Section>

        <Section className="mb-7 border-b border-border pb-7" title="Services included">
          <View className="mt-2 flex-row flex-wrap gap-2">
            <Chip label="Responsive Design" size="lg" selectable />
            <Chip label="SEO Optimization" size="lg" selectable />
            <Chip label="Content Creation" size="lg" selectable />
            <Chip label="Hosting Setup" size="lg" selectable />
            <Chip label="Custom Features" size="lg" selectable />
            <Chip label="Maintenance" size="lg" selectable />
            <Chip label="Analytics" size="lg" selectable />
          </View>
        </Section>

        <Section className="mb-7 border-b border-border pb-7" title="Language">
          <View className="mt-2 flex-row flex-wrap gap-2">
            <Chip label="JavaScript" size="lg" selectable />
            <Chip label="React" size="lg" selectable />
            <Chip label="WordPress" size="lg" selectable />
            <Chip label="PHP" size="lg" selectable />
            <Chip label="Python" size="lg" selectable />
            <Chip label="Ruby" size="lg" selectable />
            <Chip label="HTML/CSS" size="lg" selectable />
          </View>
        </Section>

        <Section className="mb-7 border-b border-border pb-7" title="Seller level">
          <View className="mt-2 flex-row flex-wrap gap-2">
            <Chip label="Beginner" size="lg" selectable />
            <Chip label="Intermediate" size="lg" selectable />
            <Chip label="Expert" size="lg" selectable />
            <Chip label="Top Rated" size="lg" selectable />
          </View>
        </Section>

        <Section className="mb-7 border-b border-border pb-7" title="Delivery time">
          <View className="mt-2 flex-row flex-wrap gap-2">
            <Chip label="1 day" size="lg" selectable />
            <Chip label="Up to 3 days" size="lg" selectable />
            <Chip label="Up to 7 days" size="lg" selectable />
            <Chip label="Up to 14 days" size="lg" selectable />
            <Chip label="30+ days" size="lg" selectable />
          </View>
        </Section>

        <Section className="mb-7 border-b border-border pb-7" title="Additional Options">
          <View className="mt-4 space-y-4">
            <Switch
              value={isSellerOnline}
              onChange={setIsSellerOnline}
              label="Seller is currently online"
            />
            <Switch value={offersAIModels} onChange={setOffersAIModels} label="Offers AI models" />
          </View>
        </Section>
      </ThemedScroller>
      <ThemeFooter>
        <Button title="Apply Filters" rounded="full" size="large" onPress={handleApplyFilters} />
      </ThemeFooter>
    </>
  );
}
