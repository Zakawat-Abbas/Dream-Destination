

import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import { images, COLORS } from '../constants';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const Login = ({ navigation }) => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        inputValidities: {
            email: false,
            password: false,
        },
        errorMessage: ''
    });

    const inputChangedHandler = (inputIdentifier, inputValue) => {
        setFormState(prevState => ({
            ...prevState,
            [inputIdentifier]: inputValue
        }));
    };

    const loginHandler = async () => {
        try {
            const { email, password } = formState;
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabNavigation' }],
                })
            );
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
                    Login
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

                <InputField
                    id="password"
                    onInputChanged={inputChangedHandler}
                    placeholder="Enter your password"
                    secureTextEntry
                    icon={
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                    }
                    fieldButtonLabel="Forgot?"
                    fieldButtonFunction={() => navigation.navigate('ResetPassword')}
                />

                <CustomButton label="Login" onPress={loginHandler} />

                {formState.errorMessage ? (
                    <Text style={{ color: 'red', marginVertical: 10, textAlign: 'center' }}>{formState.errorMessage.slice(10)}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text>New to the app? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
