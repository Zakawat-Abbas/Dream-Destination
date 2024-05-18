import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const ResetPassword = ({ navigation }) => {
    const [formState, setFormState] = useState({
        inputValues: {
            email: '',
        },
        inputValidities: {
            email: false,
        },
        errorMessage: ''
    });

    const inputChangedHandler = (inputIdentifier, inputValue) => {
        setFormState(prevState => ({
            ...prevState,
            inputValues: {
                ...prevState.inputValues,
                [inputIdentifier]: inputValue
            }
        }));
    };

    const sendResetPasswordEmail = async () => {
        try {
            const { email } = formState.inputValues;
            if (email) {
                await firebase.auth().sendPasswordResetEmail(email);
                console.log('Password reset email sent successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Please enter your email address.');
            }
        } catch (error) {
            setFormState(prevState => ({
                ...prevState,
                errorMessage: error.message
            }));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{
                            width: 150,
                            height: 150,
                            tintColor: COLORS.primary,
                            marginBottom: 20
                        }}
                    />
                </View>

                <Text style={{ fontSize: 28, fontWeight: '500', color: COLORS.black, marginBottom: 30 }}>
                    Reset Your Password
                </Text>

                <InputField
                    id="email"
                    onInputChanged={inputChangedHandler}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    icon={
                        <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
                    }
                />

                <CustomButton label="SEND" onPress={sendResetPasswordEmail} />

                {formState.errorMessage ? (
                    <Text style={{ color: 'red', marginVertical: 10, textAlign: 'center' }}>{formState.errorMessage}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Remember Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ResetPassword;
