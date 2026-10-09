import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, Platform } from 'react-native';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { CardScroller } from '@/components/CardScroller';
import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';
import { shadowPresets } from '@/utils/useShadow';

type OrderStatus = 'all' | 'pending' | 'completed' | 'canceled';

interface MarketplaceOrder {
  id: number;
  serviceName: string;
  providerName: string;
  providerAvatar: string;
  date: string;
  status: 'pending' | 'completed' | 'canceled';
  totalPaid: string;
  image: any;
}

const OrdersScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('all');

  const orders: MarketplaceOrder[] = [
    {
      id: 1,
      serviceName: 'Custom Logo Design',
      providerName: 'Alex Thompson',
      providerAvatar: require('@/assets/img/user-3.jpg'),
      date: 'Oct 15, 2023',
      status: 'completed',
      totalPaid: '$85.00',
      image: require('@/assets/img/service-2.jpg'),
    },
    {
      id: 2,
      serviceName: 'Website Development',
      providerName: 'Sarah Miller',
      providerAvatar: require('@/assets/img/user-2.jpg'),
      date: 'Nov 3, 2023',
      status: 'pending',
      totalPaid: '$250.00',
      image: require('@/assets/img/service-1.jpg'),
    },
    {
      id: 3,
      serviceName: 'Social Media Graphics',
      providerName: 'Michael Chen',
      providerAvatar: require('@/assets/img/user-1.jpg'),
      date: 'Sep 20, 2023',
      status: 'canceled',
      totalPaid: '$65.00',
      image: require('@/assets/img/service-3.jpg'),
    },
    {
      id: 4,
      serviceName: 'UI/UX Design for Mobile',
      providerName: 'Jamie Wilson',
      providerAvatar: require('@/assets/img/user-4.jpg'),
      date: 'Dec 5, 2023',
      status: 'completed',
      totalPaid: '$175.00',
      image: require('@/assets/img/service-4.jpg'),
    },
    {
      id: 5,
      serviceName: 'Custom Illustration',
      providerName: 'Alex Thompson',
      providerAvatar: require('@/assets/img/thomino.jpg'),
      date: 'Jan 10, 2024',
      status: 'pending',
      totalPaid: '$95.00',
      image: require('@/assets/img/service-3.jpg'),
    },
  ];

  const filteredOrders =
    selectedStatus === 'all' ? orders : orders.filter((order) => order.status === selectedStatus);

  // Count orders by status
  const pendingCount = orders.filter((order) => order.status === 'pending').length;
  const completedCount = orders.filter((order) => order.status === 'completed').length;
  const canceledCount = orders.filter((order) => order.status === 'canceled').length;

  return (
    <View className="flex-1 bg-background">
      <AnimatedView animation="scaleIn" className="flex-1">
        <Header />
        <ThemedScroller>
          <Section
            titleSize="3xl"
            className="my-16"
            title="Your Orders"
            subtitle={`${filteredOrders.length} orders`}
          />

          <CardScroller className="mb-4" space={5}>
            <Chip
              label="All"
              isSelected={selectedStatus === 'all'}
              onPress={() => setSelectedStatus('all')}
            />
            <Chip
              label={`Pending (${pendingCount})`}
              isSelected={selectedStatus === 'pending'}
              onPress={() => setSelectedStatus('pending')}
            />
            <Chip
              label={`Completed (${completedCount})`}
              isSelected={selectedStatus === 'completed'}
              onPress={() => setSelectedStatus('completed')}
            />
            <Chip
              label={`Canceled (${canceledCount})`}
              isSelected={selectedStatus === 'canceled'}
              onPress={() => setSelectedStatus('canceled')}
            />
          </CardScroller>

          <View className="flex-row flex-wrap justify-between">
            {filteredOrders.map((order) => (
              <Link key={order.id} href={`/screens/order-detail?id=${order.id}`} asChild>
                <Pressable
                  style={{ ...shadowPresets.card }}
                  className="mb-4 w-full rounded-2xl bg-secondary">
                  <View className="relative">
                    <Image source={order.image} className="h-40 w-full rounded-t-2xl" />

                    <View
                      className={`absolute right-2 top-2 rounded-full px-2 py-1 ${
                        order.status === 'completed'
                          ? 'bg-green-500/90'
                          : order.status === 'pending'
                            ? 'bg-yellow-500/90'
                            : 'bg-red-500/90'
                      }`}>
                      <ThemedText className="text-xs text-white">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </ThemedText>
                    </View>
                  </View>

                  <View className="-mt-9 items-start p-6 pt-0">
                    <View className="rounded-full border-4 border-secondary">
                      <Avatar src={order.providerAvatar} size="lg" />
                    </View>

                    <View className="mt-1 w-full flex-row items-center justify-between">
                      <ThemedText className="text-base font-semibold">
                        {order.serviceName}
                      </ThemedText>
                    </View>

                    <View className="mt-0 w-full flex-row items-center justify-start opacity-60">
                      <ThemedText className="text-xs">{order.providerName}</ThemedText>
                    </View>

                    <View className="mt-6 w-full flex-row items-center justify-between">
                      <ThemedText className="text-xs ">{order.date}</ThemedText>
                      <ThemedText className="text-sm font-bold">{order.totalPaid}</ThemedText>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        </ThemedScroller>
      </AnimatedView>
    </View>
  );
};

export default OrdersScreen;
