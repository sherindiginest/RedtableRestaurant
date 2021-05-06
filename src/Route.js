import React from 'react'
import { View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { store } from "./../App"
import { email, cart, home, location, tabmenu, orders } from './../assets/images'

import {
  SplashScreen,
  LoginScreen,
  LanguageSwitchScreen,
  SignupScreen,
  OtpScreen,
  ForgotPasswordScreen,
  HomeScreen,
  OurRestaurantsScreen,
  SetLocationScreen,
  MyOrdersScreen,
  CartScreen,
  RestaurantDetailsScreen,
  CheckOutScreen
} from './Screens'

import { HEIGHT, WIDTH, COLORS } from './constants'
import { DrawerMenu } from './components'

const TABBAR_HEIGHT = HEIGHT * 0.08
const TABBAR_WIDTH = WIDTH / 5

const TabBarButton = (props) => {
  const { color, style, icon, isCenterTab = false, focused } = props
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
          style={{ tintColor: COLORS.white }}
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
        { ...style },
      ]}>
      <Image source={icon} style={{ tintColor: color }} resizeMode="contain" />
    </View>
  )
}

const BottomTabsStack = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <BottomTabsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarButton
              {...props}
              style={{ borderTopLeftRadius: TABBAR_HEIGHT }}
              icon={home}
            />
          ),
        }}
      />
      <BottomTabsStack.Screen
        name="OurRestaurantsScreen"
        component={OurRestaurantsScreen}
        options={{
          tabBarIcon: (props) => <TabBarButton {...props} icon={tabmenu} />,
        }}
      />
      <BottomTabsStack.Screen
        name="SetLocationScreen"
        component={SetLocationScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarButton {...props} icon={location} isCenterTab />
          ),
        }}
      />
      <BottomTabsStack.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
        options={{
          tabBarIcon: (props) => <TabBarButton {...props} icon={orders} />,
        }}
      />
      <BottomTabsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarButton
              {...props}
              icon={cart}
              style={{ borderTopRightRadius: TABBAR_HEIGHT }}
            />
          ),
          tabBarBadge: 2,
        }}
      />
    </BottomTabsStack.Navigator>
  )
}


const HomeStack = createDrawerNavigator()

const Home = () => {
  const { lang = "en" } = store.getState().i18nState
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerPosition={lang == "en" ? "left" : "right"}
      initialRouteName="Bottom"
      drawerContent={(props) => <DrawerMenu {...props} />}>
      <HomeStack.Screen name="Bottom" component={BottomTabs} />
      <HomeStack.Screen name="RestaurantDetailsScreen" component={RestaurantDetailsScreen} />
      <HomeStack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      {/* <HomeStack.Screen name="LoginScreen" component={LoginScreen} /> */}
    </HomeStack.Navigator>
  )
}

const RouteStack = createStackNavigator()

const Route = () => {
  return (
    <NavigationContainer>
      <RouteStack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}
        initialRouteName="Home">
        <RouteStack.Screen name="SplashScreen" component={SplashScreen} />
        <RouteStack.Screen
          name="LanguageSwitchScreen"
          component={LanguageSwitchScreen}
        />
        <RouteStack.Screen name="LoginScreen" component={LoginScreen} />
        <RouteStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <RouteStack.Screen name="SignupScreen" component={SignupScreen} />
        <RouteStack.Screen name="OtpScreen" component={OtpScreen} />
        <RouteStack.Screen name="Home" component={Home} />
      </RouteStack.Navigator>
    </NavigationContainer>
  )
}

export default Route
