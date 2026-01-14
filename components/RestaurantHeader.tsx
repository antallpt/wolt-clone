import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface RestaurantHeaderProps {
    title: string;
    scrollOffset: SharedValue<number>;
}

const SCROLL_THRESHOLD = 60;

const RestaurantHeader = ({ title, scrollOffset }: RestaurantHeaderProps) => {
    const insets = useSafeAreaInsets();

    const header1Style = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [0, SCROLL_THRESHOLD * 0.6],
            [1, 0],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            scrollOffset.value,
            [0, SCROLL_THRESHOLD * 0.6],
            [1, -10],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }]
        }
    })

    const header2Style = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [SCROLL_THRESHOLD * 0.3, SCROLL_THRESHOLD],
            [0, 1],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            scrollOffset.value,
            [SCROLL_THRESHOLD * 0.3, SCROLL_THRESHOLD],
            [-10, 0],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }]
        }
    })
    const header2_2Style = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [SCROLL_THRESHOLD * 0.5, SCROLL_THRESHOLD],
            [0, 1],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            scrollOffset.value,
            [SCROLL_THRESHOLD * 0.5, SCROLL_THRESHOLD],
            [-10, 0],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }]
        }
    })

    const shadowStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollOffset.value,
            [0, SCROLL_THRESHOLD],
            [0, 1],
            Extrapolation.CLAMP
        );

        return {
            shadowOpacity: opacity * 0.1,
            elevation: opacity * 4
        }
    })

    return (
        <Animated.View style={[styles.headerContainer, shadowStyle, { paddingTop: insets.top }]}>
            {/* Header 1 */}
            <Animated.View style={[styles.header1, header1Style]}>
                <Link href={'/(app)/(auth)/(modal)/location'} asChild>
                    <TouchableOpacity style={styles.locationButton}>
                        <View style={styles.locationButtonIcon}>
                            <Ionicons name='business-outline' size={16} />
                        </View>
                        <Text style={styles.locationText}>Berlin</Text>
                        <Ionicons name='chevron-down' size={16} />
                    </TouchableOpacity>
                </Link>
                <View style={styles.rightIcons}>
                    <Link href={'/(app)/(auth)/(modal)/filter'} asChild>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name='filter' size={20} />
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name='map-outline' size={20} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {/* Header 2 */}
            <Animated.View style={[styles.header2]}>

                <Animated.View style={[styles.centerContent, header2Style]}>
                    <Animated.View style={header2_2Style}>
                        <Text style={styles.titleSmall}>{title}</Text>
                    </Animated.View>
                    <Link href={'/(app)/(auth)/(modal)/location'} asChild>
                        <TouchableOpacity style={styles.locationSmall}>
                            <Text style={styles.locationSmallText}>Berlin</Text>
                            <Ionicons name='chevron-down' size={14} />
                        </TouchableOpacity>
                    </Link>
                </Animated.View>
                <Animated.View style={[styles.rightIcons, header2_2Style]}>
                    <Link href={'/(app)/(auth)/(modal)/filter'} asChild>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name='filter' size={20} />
                        </TouchableOpacity>
                    </Link>

                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.background,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4
    },
    header1: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        gap: 6,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600'
    },
    locationButtonIcon: {
        borderRadius: 20,
        backgroundColor: Colors.light,
        padding: 10
    },
    rightIcons: {
        flexDirection: 'row',
        gap: 8
    },
    iconButton: {
        width: 40,
        height: 40,
        backgroundColor: Colors.light,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 40
    },
    titleSmall: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    locationSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    locationSmallText: {
        fontSize: 12,
        color: Colors.muted
    }
})

export default RestaurantHeader