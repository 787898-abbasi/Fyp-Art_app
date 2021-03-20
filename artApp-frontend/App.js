import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signin from './src/Screens/shared/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './src/Screens/shared/Signup';
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as ProductProvider } from './src/context/productContext';
import { Provider as OrderProvider } from './src/context/orderContext';
import { navigationRef } from './src/rootNavigation';
import ProductScreen from './src/Screens/buyer/ProductScreen';
import UploadScreen from './src/Screens/artist/UploadScreen';
import UploadForm from './src/Screens/artist/UploadForm';
import OrderScreen from './src/Screens/artist/OrderScreen';
import OrderDetailScreen from './src/Screens/buyer/OrderDetailScreen';
import CartScreen from './src/Screens/buyer/CartScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <OrderProvider>
      <ProductProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Signin} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="Upload" component={UploadScreen} />
              <Stack.Screen name="UploadForm" component={UploadForm} />
              <Stack.Screen name="Order" component={OrderScreen} />
              <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ProductProvider>
    </OrderProvider>
  );
}
