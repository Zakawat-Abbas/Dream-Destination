import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    Ionicons,
} from '@expo/vector-icons'
import React from 'react'
import { COLORS } from '../constants'
import { Home, MyPlan, Profile, CoTravelerPage } from '../screens'

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 65,
        background: COLORS.white,
        paddingVertical: 5
    },
}


const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (

                            <Ionicons
                                name={
                                    focused
                                        ? 'home'
                                        : 'home-outline'}
                                size={28}
                                color={COLORS.primary}
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="MyPlans"
                component={MyPlan}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? 'clipboard'
                                        : 'clipboard-outline'}
                                size={28}
                                color={COLORS.primary}
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="CoTravler"
                component={CoTravelerPage}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? 'people'
                                        : 'people-outline'}
                                size={31}
                                color={COLORS.primary}
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? 'person'
                                        : 'person-outline'}
                                size={28}
                                color={COLORS.primary}
                            />
                        )
                    },
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNavigation
