import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { scrollTo, useAnimatedReaction, useAnimatedRef, useSharedValue } from 'react-native-reanimated';

const iconDataSets = {
    set1: [
        { emoji: '🍕', color: '#FFE5CC' },
        { emoji: '🍔', color: '#F4D03F' },
        { emoji: '🍟', color: '#F8D7DA' },
        { emoji: '🌮', color: '#D5EDDA' },
        { emoji: '🍗', color: '#FADBD8' },
    ],
    set2: [
        { emoji: '🎮', color: '#D1ECF1' },
        { emoji: '🎧', color: '#E2E3E5' },
        { emoji: '☕', color: '#F4D03F' },
        { emoji: '🍿', color: '#FFE5CC' },
        { emoji: '🥤', color: '#F8D7DA' },
    ],
    set3: [
        { emoji: '🍰', color: '#FADBD8' },
        { emoji: '🍦', color: '#D1ECF1' },
        { emoji: '🍪', color: '#FFE5CC' },
        { emoji: '🎲', color: '#D5EDDA' },
        { emoji: '🕹️', color: '#E2E3E5' },
    ],
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; // pixels per second
const GAP = 10; // gap between items from styles
const PADDING_VERTICAL = 20; // padding from container styles
const REPEAT_COUNT = 200; // Number of times to repeat the icon set for infinite scroll

interface SmoothInfiniteScrollProps {
    scrollDirection?: 'up' | 'down';
    iconSet?: 'set1' | 'set2' | 'set3';
    startOffset?: number; // Offset in pixels to shift the starting position
}

const SmoothInfiniteScroll = ({
    scrollDirection = 'down',
    iconSet = 'set1',
    startOffset = 0,
}: SmoothInfiniteScrollProps) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    // Create an infinite array by repeating the icon data many times
    const infiniteItems = useMemo(() => {
        const iconData = iconDataSets[iconSet];
        const items: typeof iconData = [];
        for (let i = 0; i < REPEAT_COUNT; i++) {
            items.push(...iconData);
        }
        return items;
    }, [iconSet]);

    // Calculate total content height
    const iconData = iconDataSets[iconSet];
    const oneSetHeight = iconData.length * ITEM_HEIGHT + (iconData.length - 1) * GAP;
    const totalContentHeight = PADDING_VERTICAL + REPEAT_COUNT * oneSetHeight;

    // Start position: beginning for down, middle for up (to allow scrolling up)
    // Add startOffset to allow different starting positions for each row
    const baseInitialScrollY = scrollDirection === 'down'
        ? PADDING_VERTICAL
        : totalContentHeight / 2;
    const initialScrollY = baseInitialScrollY + startOffset;

    const scrollY = useSharedValue(initialScrollY);

    useEffect(() => {
        // Reset to initial position when direction changes
        scrollY.value = initialScrollY;

        const interval = setInterval(() => {
            const increment = (SCROLL_SPEED / 60) * (scrollDirection === 'up' ? -1 : 1);
            scrollY.value += increment;
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [scrollDirection, initialScrollY]);

    // React to scrollY changes and update the scroll position
    useAnimatedReaction(
        () => scrollY.value,
        (y) => {
            // Update scroll position continuously - no resets, no clamping, just pure infinite scroll
            scrollTo(scrollRef, 0, y, false);
        }
    );

    return (
        <Animated.ScrollView
            contentContainerStyle={styles.container}
            ref={scrollRef}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}>
            {infiniteItems.map((item, idx) => (
                <View key={idx} style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
                </View>
            ))}
        </Animated.ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: 10,
        paddingVertical: 20,
    },
    iconContainer: {
        width: 160,
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 5,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    }
})

export default SmoothInfiniteScroll