import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS, images } from '../constants';
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from '@expo/vector-icons'
const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1, objectFit: 'cover' }}
        source={images.hero}>
        <View style={style.details}>
          <Text style={{
            color: COLORS.white, fontSize: 35, fontWeight: '900',
            textShadowColor: COLORS.primary,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 8,
          }}>
            Explore Your Dream Destination!
          </Text>
          <Text style={{
            color: COLORS.white, lineHeight: 25, marginTop: 15, fontWeight: '500', textShadowColor: COLORS.primary,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 8,
          }}>
            Explore stunning destinations, plan seamlessly, and uncover hidden gems worldwide. Let's turn your travel dreams into unforgettable experiences.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="mt-20 mx-auto w-24 h-24 border-l-2 border-r-2 border-t-4 rounded-full items-center justify-center"
            style={{ borderColor: COLORS.primary }}
          >
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              className="w-20 h-20 items-center justify-center rounded-full"
              style={{ backgroundColor: COLORS.primary }}
            >
              <MaterialIcons
                name="arrow-forward"
                size={60}
                color={COLORS.white}
                style={{ marginRight: 5, fontWeight: 'bold' }}
              />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 30,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Welcome;