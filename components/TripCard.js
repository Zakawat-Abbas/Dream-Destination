import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const TripCard = ({ trip, onDelete }) => {
    const handleDelete = () => {
        onDelete(trip.id);
    };
    return (
        <View className="bg-gray-100 rounded p-4 mx-6 my-4 mb-2 flex-row justify-between items-center">
            <View>
                <Text className="font-bold text-lg mb-1">{trip.destination}</Text>
                <Text>{`Start Date: ${trip.startDate}`}</Text>
                <Text>{`End Date: ${trip.endDate}`}</Text>
            </View>
            <TouchableOpacity onPress={handleDelete}>
                <MaterialIcons name="delete" size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );
};

export default TripCard;
