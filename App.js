import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './screens/Search';
import Home from './screens/Home';

export default function App() {

  const Stacks = createNativeStackNavigator();
  const StacksScreens = () => (
    <Stacks.Navigator initialRouteName="Search">
      <Stacks.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stacks.Screen name="Search" component={Search} />
    </Stacks.Navigator>
  );
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StacksScreens />
        </NavigationContainer>
      </Provider>
    );
};
