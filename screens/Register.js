
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { images, COLORS } from '../constants';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Register = ({ navigation }) => {
    const [formState, setFormState] = useState({
        inputValues: {
            fullName: '',
            email: '',
            password: '',
            phoneNumber: '',
        },
        inputValidities: {
            fullName: false,
            email: false,
            password: false,
            phoneNumber: false,
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

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]+$/;
        return regex.test(phoneNumber);
    };


    const registerHandler = async () => {
        const { fullName, email, password, phoneNumber } = formState.inputValues;

        if (!fullName || !email || !password || !phoneNumber) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            Alert.alert('Validation Error', 'Please enter a valid phone number');
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = firebase.auth().currentUser;
            await firebase.firestore().collection('users').doc(user.uid).set({
                fullName,
                email,
                phoneNumber
            });
            navigation.navigate('Login');
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
                    Register
                </Text>

                <InputField
                    id="fullName"
                    onInputChanged={inputChangedHandler}
                    placeholder="Enter your full name"
                    icon={
                        <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                    }
                />

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
                />

                <InputField
                    id="phoneNumber"
                    onInputChanged={inputChangedHandler}
                    placeholder="Enter your phone number"
                    icon={
                        <Ionicons name="call-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                    }
                />

                <CustomButton label="Register" onPress={registerHandler} />

                {formState.errorMessage ? (
                    <Text style={{ color: 'red', marginVertical: 10, textAlign: 'center' }}>{formState.errorMessage.slice(10)}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: COLORS.primary, fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
