import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, images } from '../constants';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import firebase from 'firebase/compat/app';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const EditProfile = ({ navigation }) => {

    const [formState, setFormState] = useState({
        inputValues: {
            fullName: '',
            phoneNumber: '',
        },
        inputValidities: {
            fullName: false,
            phoneNumber: false,
        }
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

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]+$/;
        return regex.test(phoneNumber);
    };



    const handleUpdateProfile = async () => {
        try {
            const user = firebase.auth().currentUser;
            const { fullName, phoneNumber } = formState.inputValues;

            if (!validatePhoneNumber(phoneNumber)) {
                Alert.alert('Validation Error', 'Please enter a valid phone number.');
                return;
            }

            if (user) {
                const dataToUpdate = {};
                if (fullName) dataToUpdate.fullName = fullName;
                if (phoneNumber) dataToUpdate.phoneNumber = phoneNumber;
                await firebase.firestore().collection('users').doc(user.uid).update(dataToUpdate);
                console.log('Profile updated successfully');
                navigation.goBack();
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 26,
                            marginBottom: 32,
                            paddingHorizontal: 15,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="keyboard-arrow-left" size={43} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
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
                            UPDATE PROFILE
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
                            id="phoneNumber"
                            onInputChanged={inputChangedHandler}
                            placeholder="Enter your phone number"
                            icon={
                                <Ionicons name="call-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                            }
                        />

                        <CustomButton label="UPDATE PROFILE" onPress={handleUpdateProfile} />


                        {formState.errorMessage ? (
                            <Text style={{ color: 'red', marginVertical: 10, textAlign: 'center' }}>{formState.errorMessage.slice(10)}</Text>
                        ) : null}

                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    );
};

export default EditProfile
