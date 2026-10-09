import React, { forwardRef } from 'react';
import { FlatList, FlatListProps } from 'react-native';

export type ThemedFlatListProps<T> = FlatListProps<T> & {
  className?: string;
};

function ThemedFlatListInner<T>(
  { className, ...props }: ThemedFlatListProps<T>,
  ref: React.Ref<FlatList<T>>
) {
  return (
    <FlatList
      bounces
      overScrollMode="never"
      ref={ref}
      showsVerticalScrollIndicator={false}
      className={`flex-1 bg-background px-global ${className || ''}`}
      {...props}
    />
  );
}

const ThemedFlatList = forwardRef(ThemedFlatListInner) as <T>(
  props: ThemedFlatListProps<T> & { ref?: React.Ref<FlatList<T>> }
) => React.ReactElement;

export default ThemedFlatList;
