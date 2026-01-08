import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarLabelStyle: {
                fontSize: 9,
                fontWeight: '600'
            }
        }}>
            <Tabs.Screen name='restaurants' options={{
                title: 'Restaurants',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name='restaurant' color={color} size={size} />
                )
            }} />
            <Tabs.Screen name='discovery' options={{
                title: 'Discovery',
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? 'compass' : 'compass-outline'} color={color} size={size} />
                )
            }} />
            <Tabs.Screen name='stores' options={{
                title: 'Stores', headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? 'storefront' : 'storefront-outline'} color={color} size={size} />
                )
            }} />
            <Tabs.Screen name='search' options={{
                title: 'Search',
                tabBarIcon: ({ color, size, focused }) => (
                    <FontAwesome5 name={focused ? 'search' : 'search'} color={color} size={size} />
                )
            }} />
            <Tabs.Screen name='profile' options={{
                title: 'Profile', headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name={'person'} color={color} size={size} />
                )
            }} />
        </Tabs>
    )
}

export default Layout