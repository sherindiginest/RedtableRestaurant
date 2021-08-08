import React from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AlertAction, profileAction, SetLanguageAction } from './../redux/actions';
import { HEIGHT, COLORS, WIDTH, STYLES } from './../constants';
import { logo, email, shop, offers, myorders, settings, language, logout, location, locationoutline } from './../../assets/images';



const DrawerMenu = (props, context) => {

  const { navigation, setLang, lang, userData } = props
  const dispatch = useDispatch()

  const MENULIST = [
    {
      label: 'Discover',
      icon: shop,
      onPress: () => {
        navigation.navigate("Bottom")
      }
    },
    {
      label: 'Coupons',
      icon: offers,
      onPress: () => {
        navigation.navigate("OffersScreen")
      }
    },
    {
      label: 'Settings',
      icon: settings,
      onPress: () => {
        navigation.navigate("Settings")
      }
    },
    {
      label: "Order type",
      icon: locationoutline,
      onPress: async () => {
        dispatch(AlertAction.handleAlert({
          visible: true,
          title: "Order Type",
          message: "Please choose one method to continue",
          buttons: [{
            title: "Delivery",
            onPress: () => {
              dispatch(profileAction.setPickupMode("delivery"))
              dispatch(AlertAction.handleAlert({ visible: false, }))
            }
          }, {
            title: "Pickup",
            onPress: () => {
              dispatch(profileAction.setPickupMode("pickup"))
              dispatch(AlertAction.handleAlert({ visible: false, }))
            }
          }]
        }))
        navigation.closeDrawer()
      }
    },
    {
      label: context.t('language'),
      icon: language,
      onPress: async () => {
        const ln = lang == "ar" ? "en" : "ar"
        setLang(ln)
        await AsyncStorage.setItem('lang', ln)
        navigation.closeDrawer()
      }
    },
    {
      label: 'Logout',
      icon: logout,
      onPress: async () => {
        navigation.replace("SplashScreen")
        await AsyncStorage.removeItem("api_token")
        dispatch({ type: "LOGOUT" })
        navigation.closeDrawer()
      }
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[{
          height: HEIGHT * 0.15,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: COLORS.borderColor,
        }, STYLES.flexDirection(lang)]}>
        <Image
          source={logo}
          resizeMode="contain"
          style={{ height: HEIGHT * 0.1, width: WIDTH * 0.2, marginLeft: WIDTH * 0.05 }}
        />
        <View style={[STYLES.alignItems(lang), { width: WIDTH * 0.4, }]}>
          <Text>{userData?.name}</Text>
          <Text numberOfLines={1}>{userData?.email}</Text>
          <Text>{userData?.phone}</Text>
        </View>
      </View>
      <FlatList
        style={{ marginTop: HEIGHT * 0.02 }}
        keyExtractor={(item) => item.label}
        data={MENULIST}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => item.onPress && item?.onPress()}
            style={[{
              height: HEIGHT * 0.07,
              backgroundColor: index == 0 ? COLORS.borderColor : COLORS.white
            }, STYLES.flexDirection(lang)]}>
            <View
              style={{
                width: WIDTH * 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={item.icon}
                //style={{width: WIDTH * 0.07, height: WIDTH * 0.07}}
                resizeMode="contain"
              />
            </View>
            <View style={[{ flex: 1, justifyContent: 'center', }, STYLES.alignItems(lang)]}>
              <Text style={{ color: index == 0 ? COLORS.addToCartButton : COLORS.black }}>{item.label}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

DrawerMenu.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { ProfileReducer, i18nState } = state
  return {
    lang: i18nState.lang,
    userData: ProfileReducer.userData
  };
};

const mapDispatchToProps = {
  setLang: SetLanguageAction.setLang,
  setProfileData: (userData) => profileAction.setProfileData(userData),
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
