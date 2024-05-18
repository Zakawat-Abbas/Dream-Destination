import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { images, FONTS } from '../constants'
import firebase from 'firebase/compat/app';
import CustomButton from '../components/CustomButton'

const LogoutConfirmation = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.log('Logout failed:', error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 22,
                    }}
                >
                    <Image
                        source={images.success}
                        resizeMode="contain"
                        style={{
                            marginBottom: 40,
                        }}
                    />
                    <Text
                        style={{
                            ...FONTS.body3,
                            textAlign: 'center',
                            marginVertical: 8,
                        }}
                    >
                        Are you sure you want to logout?
                    </Text>
                    <View style={{
                        width: '90%',
                        marginTop: 8,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <CustomButton label="YES" onPress={handleLogout} />
                        <CustomButton label="NO" onPress={() => navigation.navigate('BottomTabNavigation')} />

                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default LogoutConfirmation
