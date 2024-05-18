
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS, images } from '../constants'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    Dimensions,
    Image,
    ActivityIndicator
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import data from "../data/data.json";
const { width } = Dimensions.get('screen');
import firebase from 'firebase/compat/app';

export default function Home({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState("beaches");
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data[type]);
    const [userData, setUserData] = useState({
        fullName: '',
        age: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        trips: ''
    });

    useEffect(() => {
        const filtered = data[type].filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, type]);

    const handleSearch = (text) => {
        setSearch(text);
    };


    const fetchUserData = async () => {
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    setUserData(userDoc.data());
                    setIsLoading(false);
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
        setIsLoading(true);
        fetchUserData();
    }, []);


    function renderSearchBar() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondaryWhite, height: 48, marginTop: 12, paddingHorizontal: 6, borderRadius: 6 }}>
                <TextInput
                    style={{ flex: 1, height: '100%', marginHorizontal: 12 }}
                    placeholder="Find Destination"
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>
        )
    }


    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    marginTop: 15
                }}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        gap: 8
                    }}
                >
                    <Image
                        source={images.avatar}
                        style={{
                            width: 33,
                            height: 33,
                            borderRadius: 30
                        }}
                    />
                    <Text style={{ fontSize: 15, marginTop: 8 }}>Welcome, <Text style={{ fontWeight: 'bold' }}>{userData.fullName}</Text></Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('LogoutConfirmation')}>
                    <Ionicons
                        name="log-out-outline"
                        size={29}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    function renderTitleHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ ...FONTS.h4 }}>Discover Destination</Text>
            </View>
        )
    }

    function Card({ title, imageSrc, type, setType }) {
        const handlePress = () => {
            setType(title.toLowerCase());
        };

        const showBorder = type === title.toLowerCase();

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    marginTop: 15,

                }}
                onPress={handlePress}
            >
                <ImageBackground
                    style={{
                        height: 120,
                        width: width / 2,
                        marginRight: 10,
                        padding: 10,
                        overflow: 'hidden',
                        borderRadius: 10,
                        borderWidth: 6,

                        ...(showBorder ? {
                            borderColor: '#ced4da',
                        } : {
                            borderColor: '#fff',
                        }
                        ),

                    }}
                    source={imageSrc}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 20,
                            fontWeight: 800,
                            marginTop: 10,
                            textShadowColor: COLORS.secondaryBlack,
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 8,
                        }}
                    >
                        {title}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    function RecommendedCard({ imageSrc, title, location, data, isInterested }) {
        return (

            <TouchableOpacity onPress={() => navigation.navigate("ItemScreen", { place: data, isInterested: isInterested })} style={{ paddingHorizontal: 5, marginBottom: 14 }}>


                <ImageBackground style={{
                    width: width - 55,
                    height: 200,
                    marginRight: 20,
                    borderRadius: 10,
                    overflow: 'hidden',
                    padding: 10,
                }} source={{ uri: imageSrc }}>
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 22,
                            fontWeight: 800,
                            marginTop: 10,
                            textShadowColor: COLORS.secondaryBlack,
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 6,
                        }}>
                        {title}
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name="place" size={22} color={COLORS.primary} />
                                <Text style={{
                                    color: COLORS.white, fontWeight: 700, marginLeft: 5, textShadowColor: COLORS.secondaryBlack,
                                    textShadowOffset: { width: 1, height: 1 },
                                    textShadowRadius: 6,
                                }}>
                                    {location}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        );
    };

    function renderContent() {
        return (
            <View >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row items-center justify-between">
                        <Card
                            key={"beaches"}
                            title="Beaches"
                            imageSrc={images.Beach}
                            type={type}
                            setType={setType}
                        />

                        <Card
                            key={"cities"}
                            title="Cities"
                            imageSrc={images.City}
                            type={type}
                            setType={setType}
                        />

                        <Card
                            key={"historicals"}
                            title="Historicals"
                            imageSrc={images.Historical}
                            type={type}
                            setType={setType}
                        />

                        <Card
                            key={"lakes"}
                            title="Lakes"
                            imageSrc={images.Lake}
                            type={type}
                            setType={setType}
                        />

                        <Card
                            key={"mountains"}
                            title="Mountains"
                            imageSrc={images.Mountain}
                            type={type}
                            setType={setType}
                        />
                        <Card
                            key={"waterfalls"}
                            title="Waterfalls"
                            imageSrc={images.Waterfall}
                            type={type}
                            setType={setType}
                        />
                        <Card
                            key={"parties"}
                            title="Parties"
                            imageSrc={images.Party}
                            type={type}
                            setType={setType}
                        />
                        <Card
                            key={"parks"}
                            title="Parks"
                            imageSrc={images.Park}
                            type={type}
                            setType={setType} />
                        <Card
                            key={"museums"}
                            title="Museums"
                            imageSrc={images.Museum}
                            type={type}
                            setType={setType}
                        />


                        <Card
                            key={"campings"}
                            title="Campings"
                            imageSrc={images.Camping}
                            type={type}
                            setType={setType}
                        />
                        <Card
                            key={"festivals"}
                            title="Festivals"
                            imageSrc={images.Festival}
                            type={type}
                            setType={setType}
                        />

                    </View>
                </ScrollView>
                <Text style={{
                    marginVertical: 15,
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>Places</Text>
                <ScrollView
                    className='h-[380px]'
                >
                    <View className="items-center flex-wrap ">
                        {filteredData.map((item, index) => (
                            <RecommendedCard
                                key={index}
                                imageSrc={
                                    item.image
                                }
                                title={item.name}
                                location={item.location}
                                navigation={navigation}
                                data={item}
                                isInterested={userData.favoritePlaces.includes(item.name)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {isLoading ? (
                <View className='flex-1 justify-center items-center'>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <View className='mx-6'>
                    {renderHeader()}
                    {renderTitleHeader()}
                    {renderSearchBar()}
                    {renderContent()}
                </View>
            )}
        </SafeAreaView>
    )
}
