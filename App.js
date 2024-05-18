import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    Home,
    Login,
    Register,
    ResetPassword,
    EditProfile,
    ItemScreen,
    LogoutConfirmation,
    Welcome,
    TripPlan
} from './screens'

import { useFonts } from 'expo-font'
import BottomTabNavigation from './navigation/BottomTabNavigation'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {

};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };


const Stack = createNativeStackNavigator()



export default function App() {

    const [fontsLoaded] = useFonts({
        black: require('./assets/fonts/Poppins-Black.ttf'),
        bold: require('./assets/fonts/Poppins-Bold.ttf'),
        medium: require('./assets/fonts/Poppins-Medium.ttf'),
        regular: require('./assets/fonts/Poppins-Regular.ttf'),
        semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    })


    if (!fontsLoaded) {
        return null
    }

    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName={'Welcome'}
            >

                <Stack.Screen
                    name="BottomTabNavigation"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="LogoutConfirmation"
                    component={LogoutConfirmation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ItemScreen"
                    component={ItemScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="TripPlan"
                    component={TripPlan}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
