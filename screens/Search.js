import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../utils/index';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { addSearch } from '../store/searchSlice';

const baseURL = `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q`;

export default function Search({ navigation }) {

    useEffect(() => {
        setIsLoading(false);
    }, [])

    const dispatch = useDispatch();
    const previousSearches = useSelector(state => state.search.searches);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const locationFetch = async () => {
        try {
            let { status } = await Location.requestBackgroundPermissionsAsync();

            if (status !== 'granted') {
                return alert('Access to location is needed.');
            };

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;
            navigation.navigate('Home', { lat: latitude, lon: longitude });
        } catch (error) {
            alert(error.message);
        }
    };

    const cityFetch = async () => {
        try {
            setIsLoading(true);
            const cityURL = `${baseURL}=${text}`;
            const response = await fetch(cityURL);
            const result = await response.json();
            const { city, state_code, country } = result.results[0].components;
            const latitude = result.results[0].geometry.lat;
            const longitude = result.results[0].geometry.lng;
            dispatch(addSearch({ city, state: state_code, country, lat: latitude, lon: longitude }));
            navigation.navigate('Home', { lat: result.results[0].geometry.lat, lon: result.results[0].geometry.lng});
        } catch (error) {
            alert(error.message);
        };
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={{ paddingVertical: 10, fontSize: 20 }}>Type your location here:</Text>
            <View style={{ paddingTop: 10 }}>
                <TextInput style={styles.input} placeholder="Oi" value={text} onChangeText={setText} />
            </View>
            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{...styles.button, backgroundColor: colors.PRIMARY_COLOR }} onPress={cityFetch}>
                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.button, backgroundColor: colors.PRIMARY_COLOR }} onPress={locationFetch}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={25} color='#fff' />
                </TouchableOpacity>
            </View>
            <Text style={{ paddingTop: 20, fontSize: 25, fontWeight: 'bold' }}>Previous Searches</Text>
            <View style={styles.searches}>
                {previousSearches && previousSearches.slice(0,3).map(city => (
                    <View key={Math.random()*10} style={styles.search}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 3, backgroundColor: colors.PRIMARY_COLOR }}></View>
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{city.city}</Text>
                                <Text style={{ fontSize: 18 }}>{city.state}, {city.country}</Text>
                            </View>
                        </View>
                        <Ionicons name="arrow-forward-outline" size={30} color={colors.PRIMARY_COLOR} onPress={() => {
                            navigation.navigate('Home', { lat: city.lat, lon: city.lon });
                        }} />
                    </View>
                ))}                
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
        borderRadius: 10,
        marginTop: 10,
    }
});
