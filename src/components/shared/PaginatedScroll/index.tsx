import React, { ReactNode, useRef } from "react";
import { ScrollView, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

interface PaginatedScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  loading?: boolean;
  threshold?: number;
}

export default function PaginatedScroll({
  children,
  onLoadMore,
  loading = false,
  threshold = 0.7,
}: PaginatedScrollProps) {
  const hasCalledRef = useRef(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const scrollY = contentOffset.y;
    const visibleHeight = layoutMeasurement.height;
    const totalHeight = contentSize.height;

    const scrolledPercentage = (scrollY + visibleHeight) / totalHeight;

    if (
      scrolledPercentage >= threshold &&
      !loading &&
      !hasCalledRef.current
    ) {
      hasCalledRef.current = true;
      onLoadMore();
    }
  };

  const handleScrollEnd = () => {
    hasCalledRef.current = false;
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      onMomentumScrollEnd={handleScrollEnd}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
