import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Home} from './containers/Home.jsx';
import{Dashboard} from './containers/Dashboard.jsx';
import{Maintenance} from './containers/Maintenance.jsx';
import{Trip} from './containers/Trip.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Maintenance" component={Maintenance} />
        <Tab.Screen name="Trip" component={Trip} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
