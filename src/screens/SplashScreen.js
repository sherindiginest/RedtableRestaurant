import React, { useEffect } from 'react';
import { View, ImageBackground, StatusBar, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect, useDispatch } from 'react-redux';
import { isEmpty, has } from "lodash"
import { messaging, notifications } from 'react-native-firebase';

import { profileAction, SetLanguageAction } from "./../redux/actions"
import { backgroundImage, logo } from './../../assets/images';
import { COLORS, Axios, API, navigate, } from './../constants';

const SplashScreen = (props) => {
  const { navigation, setProfileData, setLang, setAddressList, setCartList } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    onNotification()
  }, []);

  const onNotification = async () => {
    let notificationOpen = await notifications().getInitialNotification()
    if (notificationOpen) {
      const { _data } = notificationOpen.notification
      if (has(_data, "restaurant")) {
        _data.restaurant = JSON.parse(_data.restaurant)
      }
      return getProfileData(_data)
    }
    getProfileData({})
    return false
  }

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
      dispatch(profileAction.setFCMToken(dToken))
      console.log("FCM => ", dToken);
      return dToken
    } catch (e) {
      //this.getToken();
      console.warn(e.message);
    }
  }

  const getProfileData = async (n_data) => {
    const firebase_token = await getToken()
    const api_token = await AsyncStorage.getItem("api_token")
    const order_type = await AsyncStorage.getItem("pickupMode")
    order_type != null && dispatch(profileAction.setPickupMode(order_type))
    let route = 'LoginScreen'
    if (!isEmpty(api_token)) {
      await Axios.get(API.userProfile, { params: { api_token, firebase_token } })
        .then(async (response) => {
          if (has(response, "success") && response.success) {
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
      getLanguage(route, n_data)
    }, 1500);
  }

  const getLanguage = async (route, n_data) => {
    //const lang = await AsyncStorage.getItem("lang")
    await AsyncStorage.setItem('lang', "en")
    /* if (isEmpty(lang)) {
      navigation.replace("LanguageSwitchScreen")
    } else {
      setLang(lang) */
    //navigation.popToTop()
    if (!isEmpty(n_data)) {
      notificationAction(n_data)
    } else {
      navigation.replace(route)
    }
    //}
  }

  const notificationAction = (data) => {
    const navPath = {
      coupon: { screen: "OffersScreen" },
      restaurant: { screen: "Bottom", params: { screen: "HomeTab", params: { screen: "RestaurantDetailsScreen", params: { item: data?.restaurant } } } },
      order: { screen: "Bottom", params: { screen: "MyOrdersScreen" } }
    }
    navigate('Home', navPath[data.type])
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

const mapStateToProps = ({ i18nState }) => {
  return {
    lang: i18nState.lang,
  };
};

const mapDispatchToProps = {
  setProfileData: (userData) => profileAction.setProfileData(userData),
  setAddressList: (address) => profileAction.setAddressList(address),
  setCartList: (cart) => profileAction.setCartList(cart),
  setLang: SetLanguageAction.setLang
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
