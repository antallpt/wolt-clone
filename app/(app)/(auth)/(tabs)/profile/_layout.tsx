import { Colors } from '@/constants/theme'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: Colors.background } }}>
            <Stack.Screen name='index' options={{
                title: 'Profile',
                headerLargeTitle: true,
                headerTransparent: true
            }} />
        </Stack>
    )
}

export default Layout