import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';

import AnimatedView from '@/components/AnimatedView';
import Avatar from '@/components/Avatar';
import { CardScroller } from '@/components/CardScroller';
import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

// Mock data for demonstration
const mockChats: ChatUser[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage:
      'Hey, how are you doing? Just checking in to see if you received the files I sent.',
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'The meeting has been rescheduled to tomorrow at 2 PM.',
    timestamp: '1h ago',
    unread: true,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Thanks for your help!',
    timestamp: '2h ago',
    unread: false,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastMessage: 'I just finished the design mockups for your review.',
    timestamp: '3h ago',
    unread: true,
  },
  {
    id: '5',
    name: 'David Lee',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Could you send me the project requirements again?',
    timestamp: '5h ago',
    unread: false,
  },
  {
    id: '6',
    name: 'Emily Chen',
    avatar: 'https://i.pravatar.cc/150?img=6',
    lastMessage: 'Just submitted the final draft of the proposal.',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: '7',
    name: 'Alex Turner',
    avatar: 'https://i.pravatar.cc/150?img=7',
    lastMessage: "Let me know when you're available for a quick call.",
    timestamp: 'Yesterday',
    unread: true,
  },
  {
    id: '8',
    name: 'Olivia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'The client loved your work on the website redesign!',
    timestamp: '2 days ago',
    unread: false,
  },
];

type FilterType = 'all' | 'read' | 'unread';

export default function ChatListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // Filter chats based on selection
  const filteredChats = mockChats.filter((chat) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'read') return !chat.unread;
    if (selectedFilter === 'unread') return chat.unread;
    return true;
  });

  // Count messages by filter type
  const unreadCount = mockChats.filter((chat) => chat.unread).length;
  const readCount = mockChats.filter((chat) => !chat.unread).length;

  const renderChatItem = ({ item }: { item: ChatUser }) => (
    <Link href={`/screens/chat/${item.id}`} asChild>
      <TouchableOpacity
        className={`flex-row items-center border-b border-border p-4 ${item.unread ? '' : ''}`}>
        <Avatar size="md" src={item.avatar} name={item.name} />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <ThemedText className="text-base font-medium">{item.name}</ThemedText>
            <ThemedText className="text-xs text-subtext">{item.timestamp}</ThemedText>
          </View>
          <View className="mt-1 flex-row items-center">
            <ThemedText
              numberOfLines={1}
              className={`flex-1 pr-10 text-sm ${item.unread ? 'font-medium text-text' : 'text-subtext'}`}>
              {item.lastMessage}
            </ThemedText>
            {item.unread && <View className="ml-2 h-2 w-2 rounded-full bg-highlight" />}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <Header title="Chat" />
      <View className="flex-1 bg-background">
        <AnimatedView animation="scaleIn" className="flex-1">
          <View className="px-4 py-0">
            <CardScroller className="mb-2" space={5}>
              <Chip
                label="All"
                isSelected={selectedFilter === 'all'}
                onPress={() => setSelectedFilter('all')}
              />
              <Chip
                label={`Unread (${unreadCount})`}
                isSelected={selectedFilter === 'unread'}
                onPress={() => setSelectedFilter('unread')}
              />
              <Chip
                label={`Read (${readCount})`}
                isSelected={selectedFilter === 'read'}
                onPress={() => setSelectedFilter('read')}
              />
            </CardScroller>
          </View>

          <FlatList
            ListHeaderComponent={<></>}
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </AnimatedView>
      </View>
    </>
  );
}
