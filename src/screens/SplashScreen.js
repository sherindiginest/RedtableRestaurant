import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect, useDispatch } from 'react-redux';
import { isEmpty, has, isNull } from "lodash"
import { messaging, notifications } from 'react-native-firebase';

import { profileAction, SetLanguageAction } from "./../redux/actions"
import { backgroundImage, logo } from './../../assets/images';
import { COLORS, Axios, API, } from './../constants';

const SplashScreen = (props) => {
  const { navigation, setProfileData, setLang, setAddressList, setCartList, notificationData, setNotificationData } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    getProfileData()
  }, []);

  const getToken = async () => {
    try {
      let dToken = null;
      let enabled = await messaging().hasPermission();
      if (Platform.OS == "ios" && !enabled) {
        enabled = await messaging().requestPermission()
        enabled && (dToken = await messaging().getToken())
      } else {
        dToken = await messaging().getToken()
      }
      console.log("FCM => ", dToken);
      return dToken
    } catch (e) {
      //this.getToken();
      console.warn(e.message);
    }
  }

  const getProfileData = async () => {
    const firebase_token = await getToken()
    const api_token = await AsyncStorage.getItem("api_token")
    const order_type = await AsyncStorage.getItem("pickupMode")
    order_type != null && dispatch(profileAction.setPickupMode(order_type))
    let route = 'LoginScreen'
    if (!isEmpty(api_token)) {
      await Axios.get(API.userProfile, { params: { api_token, firebase_token } })
        .then(async (response) => {
          if (has(response, "success") && response.success) {
            console.log(JSON.stringify(response));
            setProfileData(response.data)
            route = "Home"
            await Axios.get(API.addresses(), { params: { api_token, "search": `user_id:${response?.data?.id}` } })
              .then(async (res) => {
                if (has(res, "success") && res.success) {
                  setAddressList(res.data)
                }
              }).catch((error) => { })
            await Axios.get(API.carts(), { params: { api_token } })
              .then(async (res1) => {
                if (has(res1, "success") && res1.success) {
                  setCartList(res1.data)
                }
              }).catch((error) => { console.log("error ==>", error); })
          }
        }).catch((error) => {
          console.log("error ==>", error);
        })
    }

    setTimeout(() => {
      getLanguage(route)
    }, 1500);
  }

  const getLanguage = async (route) => {
    const lang = await AsyncStorage.getItem("lang")
    if (isEmpty(lang)) {
      navigation.replace("LanguageSwitchScreen")
    } else {
      setLang(lang)
      //navigation.popToTop()
      if (!isEmpty(notificationData)) {
        notificationAction(notificationData)
      } else {
        navigation.replace(route)
      }
    }
  }

  const notificationAction = (data) => {
    const navPath = {
      coupon: { screen: "OffersScreen" },
      restaurant: { screen: "Bottom", params: { screen: "HomeTab", params: { screen: "RestaurantDetailsScreen", item: data?.item } } },
      myorder: { screen: "Bottom", params: { screen: "MyOrdersScreen" } }
    }
    navigate('Home', navPath[data.type])
    setNotificationData()
    notifications().removeAllDeliveredNotifications()
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        source={backgroundImage}
        resizeMode="cover">
        <Image source={logo} resizeMode="contain" />
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
  return {
    lang: i18nState.lang,
    notificationData: ProfileReducer.notificationData
  };
};

const mapDispatchToProps = {
  setProfileData: (userData) => profileAction.setProfileData(userData),
  setAddressList: (address) => profileAction.setAddressList(address),
  setCartList: (cart) => profileAction.setCartList(cart),
  setLang: SetLanguageAction.setLang,
  setNotificationData: profileAction.setNotificationData()
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
