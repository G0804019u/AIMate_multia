import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Toggle from '@/components/Toggle';
import Input from '@/components/forms/Input';
import Divider from '@/components/layout/Divider';

// Sample addresses data
const initialAddresses = [
  {
    id: '1',
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    isPrimary: true,
  },
  {
    id: '2',
    name: 'John Doe',
    street: '456 Park Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States',
    phone: '+1 (555) 987-6543',
    isPrimary: false,
  },
];

export default function AddressBookScreen() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<(typeof initialAddresses)[0] | null>(null);
  const [isNewAddress, setIsNewAddress] = useState(false);

  // Handle edit address
  const handleEditAddress = (address: (typeof initialAddresses)[0]) => {
    setCurrentAddress(address);
    setIsNewAddress(false);
    setIsModalVisible(true);
  };

  // Handle add new address
  const handleAddAddress = () => {
    setCurrentAddress({
      id: `${Date.now()}`,
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isPrimary: addresses.length === 0, // First address is primary by default
    });
    setIsNewAddress(true);
    setIsModalVisible(true);
  };

  // Handle save address
  const handleSaveAddress = () => {
    if (currentAddress) {
      if (currentAddress.isPrimary) {
        // If setting as primary, update other addresses to not be primary
        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) => ({ ...addr, isPrimary: addr.id === currentAddress.id }))
        );
      } else if (isNewAddress) {
        // Add new address
        setAddresses((prevAddresses) => [...prevAddresses, currentAddress]);
      } else {
        // Update existing address
        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) => (addr.id === currentAddress.id ? currentAddress : addr))
        );
      }
    }
    setIsModalVisible(false);
  };

  // Handle delete address
  const handleDeleteAddress = () => {
    if (currentAddress) {
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== currentAddress.id)
      );
    }
    setIsModalVisible(false);
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Address Book" showBackButton />

      <ScrollView className="flex-1 px-global pt-4">
        <ThemedText className="mb-4 text-xl font-medium">Saved Addresses</ThemedText>

        {addresses.map((address) => (
          <View key={address.id} className="mb-4 rounded-2xl border border-border bg-state p-4">
            {address.isPrimary && (
              <View className="mb-2 self-start rounded-full bg-primary px-2 py-0.5">
                <ThemedText className="text-xs font-medium text-invert">Primary</ThemedText>
              </View>
            )}

            <ThemedText className="font-semibold">{address.name}</ThemedText>
            <ThemedText>{address.street}</ThemedText>
            <ThemedText>{`${address.city}, ${address.state} ${address.zipCode}`}</ThemedText>
            <ThemedText>{address.country}</ThemedText>
            <ThemedText className="mt-1">{address.phone}</ThemedText>

            <TouchableOpacity
              onPress={() => handleEditAddress(address)}
              className="absolute right-3 top-3 p-2">
              <Icon name="Edit" size={18} />
            </TouchableOpacity>
          </View>
        ))}

        <Button
          title="Add New Address"
          iconStart="Plus"
          variant="outline"
          className="mb-6 mt-2"
          onPress={handleAddAddress}
        />
      </ScrollView>

      {/* Edit/Add Address Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide" style={{ height: '100%' }}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-xl bg-background p-4 pt-6">
            <View className="mb-6 flex-row items-center justify-between">
              <ThemedText className="text-xl font-semibold">
                {isNewAddress ? 'Add New Address' : 'Edit Address'}
              </ThemedText>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Icon name="X" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView className="pt-4">
              <Input
                label="Full Name"
                value={currentAddress?.name}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, name: text } : null))
                }
              />

              <Input
                label="Street Address"
                value={currentAddress?.street}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, street: text } : null))
                }
              />

              <Input
                label="City"
                value={currentAddress?.city}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, city: text } : null))
                }
              />

              <Input
                label="State"
                value={currentAddress?.state}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, state: text } : null))
                }
              />

              <Input
                label="ZIP Code"
                value={currentAddress?.zipCode}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, zipCode: text } : null))
                }
              />

              <Input
                label="Country"
                value={currentAddress?.country}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, country: text } : null))
                }
              />

              <Input
                label="Phone Number"
                value={currentAddress?.phone}
                onChangeText={(text) =>
                  setCurrentAddress((prev) => (prev ? { ...prev, phone: text } : null))
                }
              />

              <View className="flex-row items-center justify-between py-4">
                <ThemedText>Set as primary address</ThemedText>
                <Toggle
                  value={currentAddress?.isPrimary || false}
                  onChange={(value: boolean) =>
                    setCurrentAddress((prev) => (prev ? { ...prev, isPrimary: value } : null))
                  }
                />
              </View>

              {!isNewAddress && (
                <>
                  <Divider className="my-4" />
                  <Button
                    title="Delete Address"
                    variant="ghost"
                    className="mb-4 py-2"
                    iconStart="Trash2"
                    onPress={handleDeleteAddress}
                  />
                </>
              )}
            </ScrollView>

            <View className="mt-4 flex-row gap-4">
              <Button
                title="Cancel"
                variant="ghost"
                className="flex-1"
                onPress={() => setIsModalVisible(false)}
              />
              <Button title="Save" className="flex-1" onPress={handleSaveAddress} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
