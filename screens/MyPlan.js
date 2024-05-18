import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase/compat/app';
import TripCard from '../components/TripCard';
import { COLORS } from '../constants';

const MyPlan = ({ navigation }) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = firebase.auth().currentUser;

    const fetchData = async () => {
        const db = firebase.firestore();

        db.collection('trips')
            .where('userId', '==', currentUser.uid)
            .onSnapshot((snapshot) => {
                const tripsData = [];
                snapshot.forEach((doc) => {
                    tripsData.push({ id: doc.id, ...doc.data() });
                });
                setTrips(tripsData);
                setLoading(false);
            });

    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const deleteTrip = async (tripId) => {
        try {
            const db = firebase.firestore();
            await db.collection('trips').doc(tripId).delete();
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View className="py-4 px-6 pb-0">
                <Text className="mt-4 text-3xl font-medium text-black">My Trips</Text>
            </View>
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                trips.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-3xl font-bold text-black text-center">
                            No Trips Found 🥺
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={trips}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TripCard trip={item} onDelete={deleteTrip} />
                        )}
                    />
                )
            )}
        </SafeAreaView>
    );
};

export default MyPlan;
