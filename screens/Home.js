import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';
import UnitsPicker from '../components/UnitsPicker';
import ReloadIcon from '../components/ReloadIcon';
import SearchIcon from '../components/SearchIcon';
import WeatherDetails from '../components/WeatherDetails';
import { colors } from '../utils/index';

const WEATHER_API_KEY = '2d845fbff1c48f4c2e9ec2319190ebad';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function Home({ navigation, route }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [unitSystem, setUnitSystem] = useState('metric');
    const { lat, lon } = route.params;
  
    useEffect(() => {
        load()
    }, [unitSystem, route.params])

    const load = async () => {
        setCurrentWeather(null);
        setErrorMessage(null);
        try {
            const weatherURL = `${BASE_WEATHER_URL}lat=${lat}&lon=${lon}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
            const response = await fetch(weatherURL);
            const result = await response.json();

            if (response.ok) {
                setCurrentWeather(result);
            } else {
                setErrorMessage(result.message);
            };
        } catch (error) {
        setErrorMessage(error.message);
        }
    };

    if (currentWeather) {
        return (
            <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.main}>
                <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
                <SearchIcon navigation={navigation} />
                <ReloadIcon load={load} />
                <WeatherInfo currentWeather={currentWeather} />
            </View>
            <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem} />
            </View>
        );
      } else if (errorMessage) {
        return (
          <View style={styles.container}>
            <ReloadIcon load={load} />
            <Text style={{textAlign: 'center'}}>{ errorMessage }</Text>
            <StatusBar style="auto" />
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
            <StatusBar style="auto" />
          </View>
        );
      };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    main: {
      justifyContent: 'center',
      flex: 1,
    }
});