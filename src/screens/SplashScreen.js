import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import { isEmpty, has, isNull } from "lodash"
import { profileAction, SetLanguageAction } from "./../redux/actions"

import { backgroundImage, logo } from './../../assets/images';
import { COLORS, Axios, API, } from './../constants';
import { log } from 'react-native-reanimated';

const SplashScreen = (props) => {
  const { navigation, setProfileData, setLang, setAddressList, setCartList } = props;
  useEffect(() => {
    getProfileData()
  }, []);

  const getProfileData = async () => {
    const api_token = await AsyncStorage.getItem("api_token")
    let route = 'LoginScreen'
    if (!isEmpty(api_token)) {
      await Axios.get(API.userProfile, { params: { api_token } })
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
          //getLanguage('LoginScreen')
          //error?.message && Alert.alert("Error", error?.message)
        })
    }
    getLanguage(route)
  }

  const getLanguage = async (route) => {
    const lang = await AsyncStorage.getItem("lang")
    if (isEmpty(lang)) {
      navigation.replace("LanguageSwitchScreen")
    } else {
      setLang(lang)
      //navigation.popToTop()
      navigation.replace(route)
    }
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
  setLang: SetLanguageAction.setLang,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
