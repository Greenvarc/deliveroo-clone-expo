import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/HomeScreen';
import RestaurentScreen from './screens/RestaurentScreen';
import { Provider } from 'react-redux';
import { store } from './app/store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack=createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Restaurent' component={RestaurentScreen} />
        <Stack.Screen name='Basket' component={BasketScreen} 
        options={{presentation:"modal",headerShown:false}}
        />
        <Stack.Screen name='Preparing' component={PreparingOrderScreen}
        options={{presentation:"fullScreenModal",headerShown:false}}
        />
        <Stack.Screen name='Delivery' component={DeliveryScreen}
        options={{presentation:"fullScreenModal",headerShown:false}}
        />
        
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

