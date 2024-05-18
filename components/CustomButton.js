import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

export default function CustomButton({ label, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: COLORS.primary,
                padding: 17,
                borderRadius: 10,
                marginBottom: 20,
                width: '100%',
            }}>
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#fff',
                    textTransform: 'uppercase'
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}