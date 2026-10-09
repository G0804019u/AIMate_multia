import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { LineChart, BarChart } from 'react-native-chart-kit';

import useThemeColors from '@/app/contexts/ThemeColors';
import ActionSheetThemed from '@/components/ActionSheetThemed';
import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import { CardScroller } from '@/components/CardScroller';
import CustomCard from '@/components/CustomCard';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import List from '@/components/layout/List';
import ListItem from '@/components/layout/ListItem';
import Section from '@/components/layout/Section';

const Analytics = () => {
  const colors = useThemeColors();
  const screenWidth = Dimensions.get('window').width;
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState({ value: 0, x: 0, y: 0 });
  // Mock data for charts
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [23000, 20000, 22000, 19000, 18000, 21000, 22000],
      },
    ],
  };

  const visitsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1000, 800, 600, 1000, 900, 1200, 1100],
      },
    ],
  };

  const ChartCard = ({
    title,
    data,
    color,
    chartType = 'line',
  }: {
    title: string;
    data: any;
    color: string;
    chartType?: 'line' | 'bar';
  }) => (
    <CustomCard rounded="2xl" className=" mt-4 bg-secondary pt-4">
      <ThemedText className="text-lg font-semibold">{title}</ThemedText>
      <View className="-ml-[50px]">
        {chartType === 'line' ? (
          <LineChart
            data={data}
            width={screenWidth - 0}
            height={220}
            withVerticalLabels
            withHorizontalLabels={false}
            withDots
            withInnerLines
            withOuterLines
            withVerticalLines={false}
            withShadow
            bezier
            decorator={() => {
              return tooltipVisible ? (
                <View
                  style={[
                    styles.tooltip,
                    {
                      backgroundColor: 'black',
                      left: tooltipData.x - 40,
                      top: tooltipData.y - 50,
                    },
                  ]}>
                  <Text style={styles.tooltipText}>${tooltipData.value}</Text>
                </View>
              ) : null;
            }}
            onDataPointClick={({ value, x, y, getColor }) => {
              // Show tooltip with value
              setTooltipData({ value, x, y });
              setTooltipVisible(true);

              // Hide tooltip after 3 seconds
              setTimeout(() => {
                setTooltipVisible(false);
              }, 3000);
            }}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              decimalPlaces: 0,
              color: (opacity = 1) =>
                `${color}${Math.round(opacity * 255)
                  .toString(16)
                  .padStart(2, '0')}`,
              labelColor: () => colors.text,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: color,
              },
              propsForBackgroundLines: {
                strokeDasharray: '', // Solid grid lines
                stroke: colors.text,
                strokeOpacity: 0.1,
              },
            }}
            style={{
              marginVertical: 0,
              marginHorizontal: 0,
              paddingHorizontal: 0,
            }}
          />
        ) : (
          <BarChart
            data={data}
            width={screenWidth - 0}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            withVerticalLabels
            withHorizontalLabels={false}
            showValuesOnTopOfBars={false}
            showBarTops={false}
            chartConfig={{
              backgroundColor: colors.highlight,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              decimalPlaces: 0,
              color: () => '#0ea5e9',
              fillShadowGradient: '#0ea5e9',
              fillShadowGradientOpacity: 1,
              labelColor: () => colors.text,
              style: {
                borderRadius: 16,
              },
              barPercentage: 1,
              barRadius: 5,
              propsForBackgroundLines: {
                strokeDasharray: '', // Solid grid lines
                stroke: colors.text,
                strokeOpacity: 0.1,
              },
            }}
            style={{
              marginVertical: 0,
              marginHorizontal: 0,
              paddingHorizontal: 0,
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </CustomCard>
  );

  const styles = StyleSheet.create({
    tooltip: {
      position: 'absolute',
      backgroundColor: colors.bg,
      borderRadius: 8,
      color: 'white',
      padding: 8,
      minWidth: 80,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    tooltipText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <View className="flex-1 bg-background">
      <Header
        rightComponents={[
          <Button
            title="Past 7 days"
            variant="outline"
            size="small"
            iconStart="Calendar"
            onPress={() => actionSheetRef.current?.show()}
          />,
        ]}
      />
      <AnimatedView animation="scaleIn" className="flex-1">
        <ThemedScroller>
          <Section
            title="Analytics"
            titleSize="3xl"
            className="mb-14 mt-6"
            subtitle="Welcome back, John Doe"
          />

          {/* Stats Row 1 */}
          <View className="2 mb-6 w-full flex-row">
            <StatCard
              title="Revenue"
              value="$10,923.00"
              trend={{ value: '+20.2%', positive: true }}
            />
            <View className="w-2" />

            <StatCard title="Orders" value="1,240" trend={{ value: '+8.2%', positive: true }} />
          </View>

          <CardScroller title="Top Customers">
            <CustomCard className="w-32 items-center bg-secondary py-6">
              <Avatar src={require('@/assets/img/user-3.jpg')} size="md" className="mb-2" />
              <ThemedText className="text-center text-xs font-semibold">Jason Doe</ThemedText>
            </CustomCard>
            <CustomCard className="w-32 items-center bg-secondary py-6">
              <Avatar src={require('@/assets/img/user-2.jpg')} size="md" className="mb-2" />
              <ThemedText className="text-center text-xs font-semibold">Cate Who</ThemedText>
            </CustomCard>
            <CustomCard className="w-32 items-center bg-secondary py-6">
              <Avatar src={require('@/assets/img/user-1.jpg')} size="md" className="mb-2" />
              <ThemedText className="text-center text-xs font-semibold">Jamie Jones</ThemedText>
            </CustomCard>
            <CustomCard className="w-32 items-center bg-secondary py-6">
              <Avatar src={require('@/assets/img/user-4.jpg')} size="md" className="mb-2" />
              <ThemedText className="text-center text-xs font-semibold">Sam Smith</ThemedText>
            </CustomCard>
            <CustomCard className="w-32 items-center bg-secondary py-6">
              <Avatar src={require('@/assets/img/user-3.jpg')} size="md" className="mb-2" />
              <ThemedText className="text-center text-xs font-semibold">Chloe Smoke</ThemedText>
            </CustomCard>
          </CardScroller>

          {/* Charts */}
          <ChartCard title="Revenue Overview" data={salesData} color="#0ea5e9" chartType="bar" />
          <ChartCard title="Visits Overview" data={visitsData} color="#8b5cf6" />

          <Section title="Best Sellers" titleSize="lg" className="mb-10 mt-6">
            <List variant="divided" className="mt-4">
              <ListItem
                href="/screens/product-detail"
                className="py-4"
                leading={
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1547658719-da2b51169166' }}
                    className="h-16 w-16 rounded-2xl"
                  />
                }
                title="Custom Website Development"
                subtitle="32 projects completed"
                trailing={<Icon name="ChevronRight" size={16} />}
              />
              <ListItem
                href="/screens/product-detail"
                className="py-4"
                leading={
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e' }}
                    className="h-16 w-16 rounded-2xl"
                  />
                }
                title="React App Development"
                subtitle="28 projects completed"
                trailing={<Icon name="ChevronRight" size={16} />}
              />
              <ListItem
                href="/screens/product-detail"
                className="py-4"
                leading={
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1559028012-481c04fa702d' }}
                    className="h-16 w-16 rounded-2xl"
                  />
                }
                title="Frontend Optimization"
                subtitle="22 projects completed"
                trailing={<Icon name="ChevronRight" size={16} />}
              />
            </List>
          </Section>
        </ThemedScroller>
      </AnimatedView>

      <ActionSheetThemed
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View className="px-4 pb-8 pt-4">
          <TouchableOpacity className="py-3">
            <ThemedText>7 Days</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <ThemedText>30 Days </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <ThemedText>3 Months </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <ThemedText>1 Year </ThemedText>
          </TouchableOpacity>
        </View>
      </ActionSheetThemed>
    </View>
  );
};

export const StatCard = ({
  title,
  value,
  trend,
}: {
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}) => (
  <CustomCard rounded="2xl" className="flex-1 bg-secondary p-global">
    <View className="flex-row items-start justify-between">
      <View>
        <ThemedText className="text-sm text-subtext">{title}</ThemedText>
        <ThemedText className="text-xl font-bold">{value}</ThemedText>
      </View>
    </View>
    {trend && (
      <View className="mr-auto mt-10 flex-row items-center rounded-full border border-border bg-background px-3 py-1">
        <Icon
          name={trend.positive ? 'TrendingUp' : 'TrendingDown'}
          size={14}
          color={trend.positive ? '#22c55e' : '#ef4444'}
        />
        <ThemedText
          className={`ml-1 text-xs ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.value}
        </ThemedText>
      </View>
    )}
  </CustomCard>
);

export default Analytics;
