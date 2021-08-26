import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function UnitsPicker({ unitSystem, setUnitSystem }) {
    return (
        <View>
            <Picker selectedValue={unitSystem} onValueChange={(item) => {setUnitSystem(item)}}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}
