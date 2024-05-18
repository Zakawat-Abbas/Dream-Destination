import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import {
    MaterialIcons,
    Feather,
} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, images } from '../constants'
import firebase from 'firebase/compat/app';

const Profile = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const fetchUserData = async () => {
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    setUserData(userDoc.data());
                    setLoading(false);
                } else {
                    console.log('User document not found');
                }
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]);

    const removeItem = async (item) => {
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                await firebase.firestore().collection('users').doc(user.uid).update({
                    favoritePlaces: firebase.firestore.FieldValue.arrayRemove(item),
                });
                console.log('Item removed successfully');
                fetchUserData();
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={{
            width: 320,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingTop: 14,
            paddingLeft: 15
        }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >

                <Text style={{
                    fontSize: 22,
                    marginRight: 5,
                    marginBottom: 5,
                    color: COLORS.primary
                }}>•</Text>
                <Text style={{ ...FONTS.h4, fontSize: 16 }}>{item}</Text>

            </View>
            <TouchableOpacity onPress={() => removeItem(item)}>
                <MaterialIcons name="delete" size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );


    function renderProfile() {
        if (loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 22, }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>

            );
        } else {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 22,
                    }}
                >
                    <Image
                        source={images.user}
                        resizeMode="contain"
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: SIZES.padding,
                            tintColor: COLORS.primary,
                        }}
                    />

                    <View>
                        <View style={{ width: "100%", paddingHorizontal: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: SIZES.padding,

                            }}>
                                <MaterialIcons
                                    name="person"
                                    size={22}
                                    color={COLORS.primary}
                                    style={{
                                        marginTop: 18
                                    }}
                                />
                                <Text style={{ fontSize: 22, marginTop: 18, fontWeight: '600' }}> Name: </Text>
                            </View>
                            <Text style={{ fontSize: 18, marginTop: 18 }}>{userData.fullName}</Text>
                        </View>

                        <View style={{ width: "100%", paddingHorizontal: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: SIZES.padding,

                            }}>
                                <MaterialIcons
                                    name="email"
                                    size={22}
                                    color={COLORS.primary}
                                    style={{
                                        marginTop: 18
                                    }}
                                />
                                <Text style={{ fontSize: 22, marginTop: 18, fontWeight: '600' }}> Email: </Text>
                            </View>
                            <Text style={{ fontSize: 18, marginTop: 18 }}>{userData.email}</Text>
                        </View>
                        <View style={{ width: "100%", paddingHorizontal: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: SIZES.padding,

                            }}>
                                <MaterialIcons
                                    name="phone"
                                    size={22}
                                    color={COLORS.primary}
                                    style={{
                                        marginTop: 18
                                    }}
                                />
                                <Text style={{ fontSize: 22, marginTop: 18, fontWeight: '600' }}> Phone: </Text>
                            </View>
                            <Text style={{ fontSize: 18, marginTop: 18 }}>{userData.phoneNumber}</Text>
                        </View>
                        <View style={{ width: "100%", paddingHorizontal: 12, display: 'flex' }}>

                            <View

                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 2
                                }}
                            >
                                <MaterialIcons
                                    name="flight"
                                    size={22}
                                    color={COLORS.primary}
                                    style={{
                                        marginTop: 18
                                    }}
                                />
                                <Text style={{ fontSize: 22, marginTop: 18, fontWeight: '600' }}> Interested Trips: </Text>
                            </View>
                            <FlatList
                                data={
                                    userData.favoritePlaces
                                }
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }


    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <PageContainer >
                <View style={{ marginHorizontal: 12, }}>
                    <View
                        style={{
                            height: 44,
                            // width: 44,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View>
                        </View>
                        <Text style={{ ...FONTS.h4, marginTop: 10 }}>Profile</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditProfile')}
                        >
                            <Feather name="edit" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    {renderProfile()}

                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Profile
