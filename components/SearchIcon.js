import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/index';

export default function SearchIcon({ navigation }) {
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={() => navigation.push('Search')} name='search-outline' size={24} color={colors.PRIMARY_COLOR} />
        </View>
    );
};

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -20,
            },
            android: {
                top: 35,
            }
        }),
        right: 200,
    }
});