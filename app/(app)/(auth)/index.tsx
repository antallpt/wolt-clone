import useUserStore from '@/hooks/use-userstore';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Page = () => {
    const { setIsGuest } = useUserStore();

    return (
        <View>
            <Text>Inside Page</Text>
            <Button title='Go Login' onPress={() => setIsGuest(false)} />
        </View>
    )
}

export default Page