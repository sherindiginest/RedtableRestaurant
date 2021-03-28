import React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {email, cart, home, location, tabmenu, orders} from './../assets/images';

import {
  SplashScreen,
  LoginScreen,
  LanguageSwitchScreen,
  SignupScreen,
} from './Screens';
import {HEIGHT, WIDTH, COLORS} from './constants';
import {DrawerMenu} from './components';

const TABBAR_HEIGHT = HEIGHT * 0.08;
const TABBAR_WIDTH = WIDTH / 5;

const TabBarButton = (props) => {
  const {color, style, icon, isCenterTab = false, focused} = props;
  return isCenterTab ? (
    <View
      style={[
        {
          height: TABBAR_HEIGHT,
          width: TABBAR_WIDTH,
        },
      ]}>
      <View
        style={{
          top: -TABBAR_HEIGHT * 0.2,
          borderRadius: TABBAR_HEIGHT,
          backgroundColor: focused ? COLORS.activeTabColor : COLORS.primary,
          width: TABBAR_HEIGHT,
          height: TABBAR_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={icon}
          style={{tintColor: COLORS.white}}
          resizeMode="contain"
        />
      </View>
    </View>
  ) : (
    <View
      style={[
        {
          height: TABBAR_HEIGHT,
          width: TABBAR_WIDTH,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        },
        {...style},
      ]}>
      <Image source={icon} style={{tintColor: color}} resizeMode="contain" />
    </View>
  );
};

const BottomTabsStack = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTabsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Tab1"
      tabBarOptions={{
        activeTintColor: COLORS.activeTabColor,
        inactiveTintColor: COLORS.inactiveTabColor,
        style: {
          height: TABBAR_HEIGHT,
          borderTopRightRadius: TABBAR_HEIGHT,
          borderTopLeftRadius: TABBAR_HEIGHT,
          position: 'absolute',
        },
        showLabel: false,
      }}>
      <BottomTabsStack.Screen
        name="Home"
        component={SplashScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarButton
              {...props}
              style={{borderTopLeftRadius: TABBAR_HEIGHT}}
              icon={home}
            />
          ),
        }}
      />
      <BottomTabsStack.Screen
        name="Tab2"
        component={LoginScreen}
        options={{
          tabBarIcon: (props) => <TabBarButton {...props} icon={tabmenu} />,
        }}
      />
      <BottomTabsStack.Screen
        name="Tab3"
        component={LanguageSwitchScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarButton {...props} icon={location} isCenterTab />
          ),
        }}
      />
      <BottomTabsStack.Screen
        name="Tab4"
        component={SignupScreen}
        options={{
          tabBarIcon: (props) => <TabBarButton {...props} icon={orders} />,
        }}
      />
      <BottomTabsStack.Screen
        name="Tab5"
        component={SplashScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarButton
              {...props}
              icon={cart}
              style={{borderTopRightRadius: TABBAR_HEIGHT}}
            />
          ),
          tabBarBadge: 2,
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
      initialRouteName="SplashScreen"
      drawerContent={(props) => <DrawerMenu {...props} />}>
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
        <RouteStack.Screen
          name="LanguageSwitchScreen"
          component={LanguageSwitchScreen}
        />
        <RouteStack.Screen name="SignupScreen" component={SignupScreen} />
        <RouteStack.Screen name="Home" component={Home} />
      </RouteStack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
