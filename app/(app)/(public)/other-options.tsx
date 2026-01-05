import AppleAuthButton from '@/components/auth/AppleAuthButton'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
import { Colors, Fonts } from '@/constants/theme'
import useUserStore from '@/hooks/use-userstore'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'


const Page = () => {
    const router = useRouter();
    const { setIsGuest } = useUserStore();

    const continueAsGuest = () => {
        setIsGuest(true);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.dismiss()}>
                <Ionicons name='close' size={24} />
            </TouchableOpacity>
            <Text style={styles.title}>Log in or create a Wolt account</Text>

            {/* Login Buttons */}
            <View style={styles.buttonContainer}>
                <Animated.View entering={FadeInDown.delay(50)}>
                    {/* Apple Auth Button */}
                    <AppleAuthButton />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(100)}>
                    {/* Google Auth Button */}
                    <GoogleAuthButton />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(150)}>
                    <TouchableOpacity style={styles.facebookButton}>
                        <Ionicons name='logo-facebook' size={18} color={'#000'} />
                        <Text style={styles.facebookButtonText}> Continue with Facebook</Text>
                    </TouchableOpacity >
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200)}>
                    <TouchableOpacity style={styles.otherButton} onPress={continueAsGuest}>
                        <Text style={styles.otherButtonText}> Continue as guest</Text>
                    </TouchableOpacity >
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
    },
    closeButton: {
        backgroundColor: Colors.light,
        borderRadius: 40,
        padding: 8,
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 30,
        fontFamily: Fonts.brandBlack,
        marginVertical: 22,
    },
    buttonContainer: {
        gap: 12,
        width: '100%'
    },
    otherButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4,
    },
    otherButtonText: {
        color: '#666',
        fontSize: 17,
        fontWeight: '600'
    },
    facebookButton: {
        backgroundColor: Colors.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4,
    },
    facebookButtonText: {
        color: Colors.dark,
        fontSize: 17,
        fontWeight: '600'
    }
})

export default Page