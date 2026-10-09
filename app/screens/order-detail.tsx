import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ShowRating from '@/components/ShowRating';
import ThemedText from '@/components/ThemedText';
import Divider from '@/components/layout/Divider';
import Section from '@/components/layout/Section';

// Order status types
type OrderStatus = 'pending' | 'completed' | 'canceled';

// Service provider interface
interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

// Simplified order service interface
interface OrderService {
  id: string;
  name: string;
  image: any;
  price: string;
  description: string;
  category: string;
}

// Order data structure
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  service: OrderService;
  provider: ServiceProvider;
  subtotal: string;
  serviceFee: string;
  discount?: string;
  tax: string;
  total: string;
  deliveryDate: string;
  paymentMethod: {
    type: 'credit_card' | 'paypal' | 'apple_pay';
    details: string;
  };
  timeline: {
    ordered: string;
    accepted?: string;
    inProgress?: string;
    completed?: string;
    canceled?: string;
  };
}

// Sample orders data
const ordersData: Order[] = [
  {
    id: '1',
    orderNumber: '#SRV-12345',
    date: 'May 12, 2025',
    status: 'pending',
    service: {
      id: 'serv1',
      name: 'Custom Logo Design Package',
      image: require('@/assets/img/service-2.jpg'),
      price: '$85.00',
      description:
        'Professional logo design with unlimited revisions, source files included, and commercial usage rights.',
      category: 'Design',
    },
    provider: {
      id: 'prov1',
      name: 'Alex Thompson',
      avatar: require('@/assets/img/user-3.jpg'),
      rating: 4.8,
    },
    subtotal: '$85.00',
    serviceFee: '$5.00',
    tax: '$9.00',
    total: '$99.00',
    deliveryDate: 'May 22, 2023',
    paymentMethod: {
      type: 'credit_card',
      details: 'Visa •••• 1234',
    },
    timeline: {
      ordered: 'May 12, 2025 09:15 AM',
      accepted: 'May 12, 2025 11:30 AM',
      inProgress: 'May 13, 2025 10:45 AM',
    },
  },
  {
    id: '2',
    orderNumber: '#SRV-12346',
    date: 'Apr 28, 2025',
    status: 'completed',
    service: {
      id: 'serv2',
      name: 'Website Development',
      image: require('@/assets/img/service-1.jpg'),
      price: '$250.00',
      description:
        'Professional website design and development, mobile responsive, with SEO optimization included.',
      category: 'Development',
    },
    provider: {
      id: 'prov2',
      name: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.9,
    },
    subtotal: '$250.00',
    serviceFee: '$15.00',
    tax: '$26.50',
    total: '$291.50',
    deliveryDate: 'May 15, 2023',
    paymentMethod: {
      type: 'paypal',
      details: 'john.doe@example.com',
    },
    timeline: {
      ordered: 'Apr 28, 2023 14:22 PM',
      accepted: 'Apr 28, 2023 16:35 PM',
      inProgress: 'Apr 30, 2023 09:20 AM',
      completed: 'May 15, 2023 10:30 AM',
    },
  },
  {
    id: '3',
    orderNumber: '#SRV-12347',
    date: 'May 5, 2025',
    status: 'canceled',
    service: {
      id: 'serv3',
      name: 'Social Media Graphics Package',
      image: require('@/assets/img/service-3.jpg'),
      price: '$65.00',
      description:
        '10 custom social media graphics for multiple platforms, including Instagram, Facebook, and Twitter.',
      category: 'Design',
    },
    provider: {
      id: 'prov3',
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.7,
    },
    subtotal: '$65.00',
    serviceFee: '$3.50',
    tax: '$6.85',
    total: '$75.35',
    deliveryDate: 'May 15, 2023',
    paymentMethod: {
      type: 'credit_card',
      details: 'Mastercard •••• 5678',
    },
    timeline: {
      ordered: 'May 5, 2023 16:43 PM',
      accepted: 'May 6, 2023 08:15 AM',
      canceled: 'May 7, 2023 11:20 AM',
    },
  },
];

// Get status color and icon
const getStatusDetails = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return {
        color: 'text-white',
        bgColor: 'bg-yellow-500',
        label: 'Pending',
      };
    case 'completed':
      return {
        color: 'text-white',
        bgColor: 'bg-green-500',
        label: 'Completed',
      };
    case 'canceled':
      return {
        color: 'text-white',
        bgColor: 'bg-red-500',
        label: 'Canceled',
      };
    default:
      return {
        color: 'text-white',
        bgColor: 'bg-gray-500',
        label: 'Unknown',
      };
  }
};

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the order by id
  const order = useMemo(() => {
    return ordersData.find((order) => order.id === id);
  }, [id]);

  if (!order) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Order Details" showBackButton />
        <View className="flex-1 items-center justify-center px-6">
          <Icon name="FileX" size={64} className="mb-4 text-secondary" />
          <ThemedText className="mb-2 text-xl font-bold">Order not found</ThemedText>
          <ThemedText className="text-center text-subtext">
            The service order you're looking for doesn't exist or has been deleted.
          </ThemedText>
        </View>
      </View>
    );
  }

  const statusDetails = getStatusDetails(order.status);

  return (
    <View className="flex-1 bg-background">
      <Header showBackButton title="Order Details" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}>
        <AnimatedView animation="fadeIn" duration={400} delay={100}>
          {/* Order header */}
          <View className="px-global pb-6 pt-4">
            <View className="mb-2 flex-row items-center justify-between">
              <View>
                <ThemedText className="text-base">{order.orderNumber}</ThemedText>
                <ThemedText className="text-xl font-bold">{order.date}</ThemedText>
              </View>
              <View
                className={`flex-row items-center rounded-full px-3 py-1 ${statusDetails.bgColor}`}>
                <ThemedText className={`text-sm font-medium ${statusDetails.color}`}>
                  {statusDetails.label}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Service Provider */}
          <View className="px-global">
            <Section
              title="Service Provider"
              titleSize="lg"
              className="rounded-3xl bg-secondary px-global pt-4">
              <View className="mb-6 mt-4 flex-row items-center">
                <View className="mr-3">
                  <Avatar src={order.provider.avatar} size="lg" link="/screens/user-profile" />
                </View>
                <View className="flex-1">
                  <ThemedText className="text-lg font-semibold">{order.provider.name}</ThemedText>
                  <ShowRating rating={order.provider.rating} size="sm" />
                </View>
              </View>
            </Section>
          </View>

          {/* Service details */}
          <Section title="Service Details" titleSize="xl" className="mt-6 px-global">
            <View className="py-3">
              <Image
                source={order.service.image}
                className="mb-3 h-60 w-full rounded-2xl"
                resizeMode="cover"
              />
              <ThemedText className="text-lg font-semibold">{order.service.name}</ThemedText>
              <ThemedText className="text-sm text-subtext">
                Category: {order.service.category}
              </ThemedText>
              <ThemedText className="mt-3 text-sm">{order.service.description}</ThemedText>
              <View className="mt-3 flex-row items-center justify-between">
                <ThemedText className="text-sm text-subtext">
                  Expected delivery: {order.deliveryDate}
                </ThemedText>
                <ThemedText className="font-bold">{order.service.price}</ThemedText>
              </View>
            </View>
          </Section>

          {/* Order summary */}
          <View className="my-5 px-global">
            <Section
              title="Order Summary"
              titleSize="lg"
              className="rounded-3xl bg-secondary px-global py-4">
              <View className="mt-2 space-y-2">
                <View className="flex-row justify-between">
                  <ThemedText className="text-subtext">Subtotal</ThemedText>
                  <ThemedText>{order.subtotal}</ThemedText>
                </View>

                <View className="my-2 flex-row justify-between">
                  <ThemedText className="text-subtext">Service Fee</ThemedText>
                  <ThemedText>{order.serviceFee}</ThemedText>
                </View>

                {order.discount && (
                  <View className="flex-row justify-between">
                    <ThemedText className="text-subtext">Discount</ThemedText>
                    <ThemedText className="text-green-500">{order.discount}</ThemedText>
                  </View>
                )}

                <View className="flex-row justify-between">
                  <ThemedText className="text-subtext">Tax</ThemedText>
                  <ThemedText>{order.tax}</ThemedText>
                </View>

                <Divider className="my-4" />

                <View className="flex-row justify-between">
                  <ThemedText className="text-base font-bold">Total</ThemedText>
                  <ThemedText className="text-base font-bold">{order.total}</ThemedText>
                </View>
              </View>
            </Section>
          </View>

          {/* Payment method */}
          <Section title="Payment Method" titleSize="lg" className="px-global pt-4">
            <View className="mt-2 flex-row items-center">
              <Icon
                name={
                  order.paymentMethod.type === 'credit_card'
                    ? 'CreditCard'
                    : order.paymentMethod.type === 'paypal'
                      ? 'CreditCard'
                      : 'CreditCard'
                }
                size={20}
                className="mr-2"
              />
              <ThemedText>{order.paymentMethod.details}</ThemedText>
            </View>
          </Section>

          <Divider className="mt-4 h-1 bg-secondary" />

          {/* Order timeline */}
          <Section title="Order Timeline" titleSize="lg" className="px-global pb-4 pt-4">
            <View className="mt-6">
              {/* Ordered */}
              <View className="mb-1 flex-row">
                <View className="mr-3 items-center">
                  <View className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <Icon name="ClipboardCheck" size={16} color="white" />
                  </View>
                  {(order.timeline.accepted ||
                    order.timeline.inProgress ||
                    order.timeline.completed ||
                    order.timeline.canceled) && <View className="mt-1 h-12 w-px bg-subtext" />}
                </View>
                <View>
                  <ThemedText className="font-semibold">Order Placed</ThemedText>
                  <ThemedText className="mt-1 text-sm text-subtext">
                    {order.timeline.ordered}
                  </ThemedText>
                </View>
              </View>

              {/* Accepted */}
              {order.timeline.accepted && (
                <View className="mb-1 flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <Icon name="Check" size={16} color="white" />
                    </View>
                    {(order.timeline.inProgress || order.timeline.completed) && (
                      <View className="mt-1 h-12 w-px bg-subtext" />
                    )}
                  </View>
                  <View>
                    <ThemedText className="font-semibold">Order Accepted</ThemedText>
                    <ThemedText className="mt-1 text-sm text-subtext">
                      {order.timeline.accepted}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* In Progress */}
              {order.timeline.inProgress && (
                <View className="mb-1 flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <Icon name="Clock" size={16} color="white" />
                    </View>
                    {order.timeline.completed && <View className="mt-1 h-12 w-px bg-subtext" />}
                  </View>
                  <View>
                    <ThemedText className="font-semibold">In Progress</ThemedText>
                    <ThemedText className="mt-1 text-sm text-subtext">
                      {order.timeline.inProgress}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* Completed */}
              {order.timeline.completed && (
                <View className="flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <Icon name="CheckCircle" size={16} color="white" />
                    </View>
                  </View>
                  <View>
                    <ThemedText className="font-semibold">Completed</ThemedText>
                    <ThemedText className="mt-1 text-sm text-subtext">
                      {order.timeline.completed}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* Cancelled */}
              {order.timeline.canceled && (
                <View className="flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-red-500">
                      <Icon name="X" size={16} color="white" />
                    </View>
                  </View>
                  <View>
                    <ThemedText className="font-semibold">Order Canceled</ThemedText>
                    <ThemedText className="mt-1 text-sm text-subtext">
                      {order.timeline.canceled}
                    </ThemedText>
                  </View>
                </View>
              )}
            </View>
          </Section>
        </AnimatedView>
      </ScrollView>

      {/* Actions */}
      {order.status !== 'canceled' && (
        <View
          className="border-t border-border px-global py-4"
          style={{ paddingBottom: insets.bottom }}>
          {order.status === 'pending' ? (
            <View className="flex-row gap-global">
              <Button title="Cancel Order" variant="outline" className="flex-1" rounded="full" />
              <Button
                title="Contact Provider"
                href={`/screens/chat/conversation?id=${order.provider.id}`}
                className="flex-1"
                rounded="full"
              />
            </View>
          ) : (
            <Button
              title="Leave a Review"
              href="/screens/review"
              className="w-full"
              rounded="full"
            />
          )}
        </View>
      )}
    </View>
  );
}
