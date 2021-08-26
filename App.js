import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './utils/index';

const WEATHER_API_KEY = '2d845fbff1c48f4c2e9ec2319190ebad';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');
  
  useEffect(() => {
    load()
  }, [unitSystem])

  const load = async () => {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestBackgroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed.');
        return 
      };

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

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
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{ errorMessage }</Text>
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
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
