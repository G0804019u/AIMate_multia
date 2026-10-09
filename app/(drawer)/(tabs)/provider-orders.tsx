import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { CardScroller } from '@/components/CardScroller';
import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import List from '@/components/layout/List';
import Section from '@/components/layout/Section';
type OrderStatus = 'all' | 'pending' | 'completed' | 'canceled';

interface MarketplaceOrder {
  id: number;
  serviceName: string;
  customerName: string;
  customerAvatar: string;
  date: string;
  status: 'pending' | 'completed' | 'canceled';
  totalPaid: string;
}

const ProviderOrdersScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('all');

  const orders: MarketplaceOrder[] = [
    {
      id: 1,
      serviceName: 'Custom Logo Design',
      customerName: 'Alex Thompson',
      customerAvatar: require('@/assets/img/user-3.jpg'),
      date: 'Oct 15, 2023',
      status: 'completed',
      totalPaid: '$85.00',
    },
    {
      id: 2,
      serviceName: 'Website Development',
      customerName: 'Sarah Miller',
      customerAvatar: require('@/assets/img/user-2.jpg'),
      date: 'Nov 3, 2023',
      status: 'pending',
      totalPaid: '$250.00',
    },
    {
      id: 3,
      serviceName: 'Social Media Graphics',
      customerName: 'Michael Chen',
      customerAvatar: require('@/assets/img/user-1.jpg'),
      date: 'Sep 20, 2023',
      status: 'canceled',
      totalPaid: '$65.00',
    },
    {
      id: 4,
      serviceName: 'UI/UX Design for Mobile',
      customerName: 'Jamie Wilson',
      customerAvatar: require('@/assets/img/user-4.jpg'),
      date: 'Dec 5, 2023',
      status: 'completed',
      totalPaid: '$175.00',
    },
    {
      id: 5,
      serviceName: 'Custom Illustration',
      customerName: 'Alex Thompson',
      customerAvatar: require('@/assets/img/thomino.jpg'),
      date: 'Jan 10, 2024',
      status: 'pending',
      totalPaid: '$95.00',
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
        <ThemedScroller className="px-4">
          <Section
            titleSize="3xl"
            className="mb-12 mt-20"
            title="Your Orders"
            subtitle={`${filteredOrders.length} orders`}
          />

          <CardScroller className="mb-6" space={5}>
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

          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ThemedScroller>
      </AnimatedView>
    </View>
  );
};

export const OrderCard = ({ order }: { order: MarketplaceOrder }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  return (
    <Link key={order.id} href={`/screens/order-detail?id=${order.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View className="mb-3 rounded-2xl bg-secondary p-5">
          {/* Top row - Service name and status */}
          <View className="mb-1 flex-row items-center justify-between">
            <ThemedText className="mr-2 flex-1 text-lg font-semibold">
              {order.serviceName}
            </ThemedText>
            <View className="flex-row items-center">
              <View className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(order.status)}`} />
            </View>
          </View>

          {/* Middle row - Date */}
          <View className="mb-2 flex-row items-center">
            <Icon name="Calendar" size={12} className="mr-1 opacity-60" />
            <ThemedText className="text-sm opacity-60">{order.date}</ThemedText>
          </View>

          {/* Bottom row - Customer info and price */}
          <View className="mt-10 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Avatar src={order.customerAvatar} size="xxs" />
              <ThemedText className="ml-2 text-sm">{order.customerName}</ThemedText>
            </View>
            <View className="flex-row items-center">
              <ThemedText className="text-base font-bold">{order.totalPaid}</ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProviderOrdersScreen;
