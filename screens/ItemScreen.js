import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants';
import firebase from 'firebase/compat/app';

const ItemScreen = ({ navigation, route }) => {
  const favorite = route?.params?.isInterested;
  const [isInterested, setIsInterested] = useState(favorite);
  const place = route?.params?.place;


  const handleInfo = () => {
    const searchTerm = `${place.name} in ${place.location}`;
    const url = `https://www.google.com/search?q=${searchTerm}`;
    Linking.openURL(url);
  };


  const handlePlace = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      try {
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          let favoritePlaces = userDoc.data().favoritePlaces || [];
          if (!favoritePlaces.includes(place.name)) {
            favoritePlaces.push(place.name);
            await userDocRef.update({
              favoritePlaces: favoritePlaces
            });
            Alert.alert('Favorite place added!');
            setIsInterested(true)
          } else {
            Alert.alert('This place is already in your favorites!');
          }
        } else {
          console.log('User document not found');
        }
      } catch (error) {
        console.error('Error updating favorite place:', error);
      }
    } else {
      console.log('User not logged in');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7, objectFit: 'cover' }} source={{
        uri: place.image
      }}>
        <View style={style.header}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={43}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: '70%',
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.white,
              marginBottom: 20,
              textShadowColor: COLORS.secondaryBlack,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 8,
            }}>
            {place.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <TouchableOpacity style={style.iconContainer} onPress={handlePlace}>
          <Ionicons name={isInterested ? 'heart' : 'heart-outline'} color={COLORS.primary} size={30} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10 }}>
          <MaterialIcons name="place" size={28} color={COLORS.primary} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.secondaryGray,
            }}>
            {place.location}
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
          About the trip
        </Text>
        <Text style={{ marginTop: 20, lineHeight: 22 }}>{place.description.length > 200 ? place.description = place.description.substring(0, 200) + "..." : place.description}</Text>

        <View style={{ flexDirection: 'col', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 6 }}>
            <MaterialIcons name="phone" size={28} color={COLORS.primary} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.secondaryGray,
              }}>
              {place.phone}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <MaterialIcons name="mail" size={28} color={COLORS.primary} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.secondaryGray,
              }}>
              {place.email}
            </Text>
          </View>
        </View>
      </View>
      <View style={style.footer}>
        <TouchableOpacity style={style.bookNowBtn} onPress={handleInfo}>
          <Text
            style={{ color: COLORS.primary, fontSize: 16, fontWeight: '800', padding: 6, textTransform: 'uppercase' }}>
            Information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.bookNowBtn} onPress={() => navigation.navigate('TripPlan', { title: place.name })}>
          <Text
            style={{ color: COLORS.primary, fontSize: 16, fontWeight: '800', padding: 6, textTransform: 'uppercase' }}>
            Plan This Trip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    marginHorizontal: 22,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6

  },

  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default ItemScreen;