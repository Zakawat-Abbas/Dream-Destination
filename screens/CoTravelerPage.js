import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import firebase from 'firebase/compat/app';
import { COLORS } from '../constants';

const CoTravelerPage = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [coTravelers, setCoTravelers] = useState([]);

    useEffect(() => {
        fetchCoTravelers();
    }, []);

    const fetchCoTravelers = async () => {
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const currentUserFavoritePlaces = userDoc.data().favoritePlaces || [];
                    const coTravelersQuerySnapshot = await firebase.firestore().collection('users')
                        .where('favoritePlaces', 'array-contains-any', currentUserFavoritePlaces)
                        .get();
                    const coTravelersData = coTravelersQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCoTravelers(coTravelersData);
                    setLoading(false);
                } else {
                    console.log('User document not found');
                }
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error fetching co-travelers:', error);
            setLoading(false);
        }
    };


    function renderContent() {
        const groupedUsers = {};
        coTravelers.forEach(user => {
            user.favoritePlaces.forEach(place => {
                if (!groupedUsers[place]) {
                    groupedUsers[place] = [];
                }
                groupedUsers[place].push(user);
            });
        });

        return (
            <View>
                {Object.entries(groupedUsers).map(([place, users]) => (
                    users.length > 1 && (
                        <View key={place} style={{ width: '100%', borderRadius: 10, backgroundColor: '#dee2e6', paddingBottom: 6, paddingTop: 0 }}>
                            <View style={{ padding: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Interested Place: </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary }}>{place}</Text>
                            </View>
                            {users.map(user => (
                                <View key={user.id} style={{ paddingHorizontal: 15 }}>
                                    <View

                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 22,
                                            marginRight: 5,
                                            marginBottom: 4
                                        }}>•</Text>
                                        <Text style={{ fontSize: 18 }}>{user.fullName}</Text>
                                        <Text style={{ fontSize: 18, color: COLORS.primary }}> ({user.phoneNumber})</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )
                ))}
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="py-4 px-6 ">
                <Text className="mt-4 text-3xl font-medium text-black">Co Travelers</Text>
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <View style={{ marginHorizontal: 22 }}>
                    {renderContent()}
                </View>
            )}
        </SafeAreaView>
    );
};

export default CoTravelerPage;
