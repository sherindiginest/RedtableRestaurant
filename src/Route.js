import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { store } from "./../App"

import {
  SplashScreen,
  LoginScreen,
  LanguageSwitchScreen,
  SignupScreen,
  OtpScreen,
  ForgotPasswordScreen,
  CheckOutScreen,
  SettingsScreen,
  EditProfileScreen,
  ManageAddressScreen,
  ChangePasswordScreen,
  OffersScreen
} from './screens'

import { BottomTabs, DrawerMenu } from './components'

const SettingStack = createStackNavigator()

const Settings = () => {
  return (
    <SettingStack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="SettingsScreen">
      <SettingStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <SettingStack.Screen name="ManageAddressScreen" component={ManageAddressScreen} />
      <SettingStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </SettingStack.Navigator>
  )
}

const HomeStack = createDrawerNavigator()

const Home = () => {
  const { lang = "en" } = store.getState().i18nState
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerType="back"
      drawerPosition={lang == "en" ? "left" : "right"}
      initialRouteName="Bottom"
      drawerContent={(props) => <DrawerMenu {...props} />}>
      <HomeStack.Screen name="Bottom" component={BottomTabs} />
      <HomeStack.Screen name="OffersScreen" component={OffersScreen} />
      <HomeStack.Screen name="Settings" component={Settings} />
    </HomeStack.Navigator>
  )
}

const RouteStack = createStackNavigator()

const Route = () => {
  return (
    <NavigationContainer>
      <RouteStack.Navigator screenOptions={{ headerShown: false, animationTypeForReplace: 'pop' }}
        initialRouteName="SplashScreen">
        <RouteStack.Screen name="SplashScreen" component={SplashScreen} />
        <RouteStack.Screen name="LanguageSwitchScreen" component={LanguageSwitchScreen} />
        <RouteStack.Screen name="LoginScreen" component={LoginScreen} />
        <RouteStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <RouteStack.Screen name="SignupScreen" component={SignupScreen} />
        <RouteStack.Screen name="OtpScreen" component={OtpScreen} />
        <RouteStack.Screen name="Home" component={Home} />
        <RouteStack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      </RouteStack.Navigator>
    </NavigationContainer>
  )
}

export default Route
