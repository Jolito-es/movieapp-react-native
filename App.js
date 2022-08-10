import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//SCREEN
import Login from './screen/Login'
import Movies from './screen/Movies';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: true
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Movies" component={Movies} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}