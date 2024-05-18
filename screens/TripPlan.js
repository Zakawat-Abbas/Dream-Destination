import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../constants';
import CustomButton from '../components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';

const TripPlan = ({ navigation, route }) => {
    const { title } = route.params;
    const [destination, setDestination] = useState(title);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const validateDates = (startDateString, endDateString) => {
        const partsStart = startDateString.split('-');
        const partsEnd = endDateString.split('-');

        if (partsStart.length !== 3 || partsEnd.length !== 3) {
            return false;
        }

        const startDate = new Date(parseInt(partsStart[2]), parseInt(partsStart[1]) - 1, parseInt(partsStart[0]));
        const endDate = new Date(parseInt(partsEnd[2]), parseInt(partsEnd[1]) - 1, parseInt(partsEnd[0]));

        const today = new Date();

        return startDate >= today && endDate >= today;
    }

    const handlePlanTrip = async () => {
        if (!currentUser) {
            alert('Please login to save trips');
            return;
        }

        if (!validateDates(startDate, endDate)) {
            alert('Date should not be in past and start date should be greater than end date');
            return;
        }

        const db = firebase.firestore();
        const tripsRef = db.collection('trips');

        const snapshot = await tripsRef
            .where('destination', '==', destination)
            .where('userId', '==', currentUser.uid)
            .get();

        if (snapshot.empty) {
            tripsRef.add({
                destination: destination,
                startDate: startDate,
                endDate: endDate,
                userId: currentUser.uid,
            })
                .then(() => {
                    Alert.alert('Trip Saved');
                })
                .catch((error) => {
                    console.error('Error saving trip: ', error);
                });
        } else {
            alert('Duplicate trip found. Please choose a different destination.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
            <View style={{ paddingHorizontal: 35 }}>
                <Text style={{ fontSize: 28, fontWeight: '500', color: COLORS.black, marginBottom: 30, marginTop: 120 }}>
                    Trip Plan
                </Text>

                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 1, padding: 15, marginBottom: 10, borderRadius: 8 }}
                    placeholder="Destination"
                    value={destination}
                    onChangeText={text => setDestination(text)}
                />
                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 1, padding: 15, marginBottom: 10, borderRadius: 8 }}
                    placeholder="Start Date (DD-MM-YYYY)"
                    value={startDate}
                    onChangeText={text => setStartDate(text)}
                />
                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 1, padding: 15, marginBottom: 10, borderRadius: 8 }}
                    placeholder="End Date (DD-MM-YYYY)"
                    value={endDate}
                    onChangeText={text => setEndDate(text)}
                />
                <CustomButton label="Save Trip" onPress={handlePlanTrip} />
            </View>
        </SafeAreaView>
    );
};

export default TripPlan;


