import React from 'react';
import Home from './components/HomeComponent' 
import { TabNavigation } from './components/TabNavigation';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const store = ConfigureStore()
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}
