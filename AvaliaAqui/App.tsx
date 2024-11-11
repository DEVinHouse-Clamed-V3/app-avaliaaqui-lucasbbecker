import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Products from './screens/Products';
import EvaluationScreen from './screens/EvaluationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Products"
          component={Products}
          options={{ title: 'Produtos disponíveis' }}
          />
          <Stack.Screen 
            name='EvaluationScreen'
            component={EvaluationScreen}
            options={{ title: 'Avaliação' }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}