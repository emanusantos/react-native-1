import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/index';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function Search() {
    return (
        <View style={styles.container}>
            <Text style={{ paddingVertical: 10, fontSize: 20 }}>Type your location here:</Text>
            <View style={{ paddingTop: 10 }}>
                <TextInput style={styles.input} placeholder="Oi" />
            </View>
            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{...styles.button, backgroundColor: colors.PRIMARY_COLOR }} onPress={() => {}}>
                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.button, backgroundColor: colors.PRIMARY_COLOR }} onPress={() => {}}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={25} color='#fff' />
                </TouchableOpacity>
            </View>
            <Text style={{ paddingTop: 20, paddingBottom: 10, fontSize: 25, fontWeight: 'bold' }}>Previous Searches</Text>
            <View style={styles.searches}>
                <View style={styles.search}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 3, backgroundColor: colors.PRIMARY_COLOR }}></View>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>City</Text>
                            <Text style={{ fontSize: 18 }}>CT, Brazil</Text>
                        </View>
                    </View>
                    <Ionicons name="arrow-forward-outline" size={30} color={colors.PRIMARY_COLOR} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        color: '#000',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        backgroundColor: '#fff',
    },
    button: {
        width: 120,
        height: 50,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searches: {
        flex: 1,
    },
    search: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        height: 85,
        backgroundColor: '#EBEBEB', 
        borderRadius: 10
    }
});
