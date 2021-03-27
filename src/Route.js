import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SplashScreen, LoginScreen} from './Screens';
import {HEIGHT, WIDTH, COLORS} from './constants';

const TabBarButton = (props) => {
  console.log(props);
  return (
    <View
      style={{
        borderWidth: 1,
        height: HEIGHT * 0.07,
        width: WIDTH / 5,
        backgroundColor: COLORS.white,
      }}></View>
  );
};

const BottomTabsStack = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTabsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Tab1"
      tabBarOptions={{
        tabStyle: {height: 70, borderTopRightRadius: 35, overflow: 'hidden'},
        style: {
          height: HEIGHT * 0.07,
          borderTopRightRadius: HEIGHT * 0.07,
          borderTopLeftRadius: HEIGHT * 0.07,
        },
      }}>
      <BottomTabsStack.Screen
        name="Tab1"
        component={SplashScreen}
        options={{
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      <BottomTabsStack.Screen
        name="Tab2"
        component={SplashScreen}
        options={{
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      <BottomTabsStack.Screen
        name="Tab3"
        component={LoginScreen}
        options={{
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      <BottomTabsStack.Screen
        name="Tab4"
        component={SplashScreen}
        options={{
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      <BottomTabsStack.Screen
        name="Tab5"
        component={LoginScreen}
        options={{
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
    </BottomTabsStack.Navigator>
  );
};

const BottomStack = createStackNavigator();

const Bottom = () => {
  return (
    <BottomStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <BottomStack.Screen name="SplashScreen" component={BottomTabs} />
      <BottomStack.Screen name="LoginScreen" component={LoginScreen} />
    </BottomStack.Navigator>
  );
};

const HomeStack = createDrawerNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <HomeStack.Screen name="SplashScreen" component={Bottom} />
      <HomeStack.Screen name="LoginScreen" component={LoginScreen} />
    </HomeStack.Navigator>
  );
};

const RouteStack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <RouteStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <RouteStack.Screen name="SplashScreen" component={SplashScreen} />
        <RouteStack.Screen name="LoginScreen" component={LoginScreen} />
        <RouteStack.Screen name="Home" component={Home} />
      </RouteStack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
