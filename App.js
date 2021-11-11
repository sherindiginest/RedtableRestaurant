import React, { useEffect } from 'react'
import { View, SafeAreaView, Text, LogBox, NativeModules } from 'react-native'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'
import messaging from '@react-native-firebase/messaging';
//import { notifications } from 'react-native-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { has } from "lodash"

import Route from './src/Route'
import configureStore from './src/redux/store'
import { translations } from './src/constants/translations'
import { COLORS, navigate } from './src/constants'
import { ChooseAddress, Loader, CustomAlert, AddAddressModal } from './src/components'
LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component", "VirtualizedLists should never be nested"])
let store = configureStore()
import Reactotron from 'reactotron-react-native'
import notifee from '@notifee/react-native';
import reactotron from 'reactotron-react-native';

/*let scriptHostname;
if (__DEV__) {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({host: scriptHostname}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!*/

const App = () => {

  useEffect(() => {
    onNotification()
  }, []);

  const onNotification = async () => {
    //messaging().requestPermission();
    messaging().onMessage(async remoteMessage => {
      reactotron.log(remoteMessage);
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'default',
      });

      reactotron.log({channelId})

      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
        },
      });
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });


    messaging().onNotificationOpenedApp(async remoteMessage => {
      if(remoteMessage){
        const { data } = remoteMessage
        if (has(_data, "restaurant")) {
          _data.restaurant = JSON.parse(_data.restaurant)
        }
        notificationAction(_data)
      }
    })

  }

  const notificationAction = async (data) => {
    const api_token = await AsyncStorage.getItem("api_token")
    if (api_token != null) {
      const navPath = {
        coupon: { screen: "OffersScreen" },
        restaurant: { screen: "Bottom", params: { screen: "HomeTab", params: { screen: "RestaurantDetailsScreen", params: { item: data?.restaurant } } } },
        order: { screen: "Bottom", params: { screen: "MyOrdersScreen" } }
      }
      navigate('Home', navPath[data.type])
      //notifications().removeAllDeliveredNotifications()
      //messaging().not
    }
  }

  return (
    <Provider store={store}>
      <I18n translations={translations} initialLang="en">
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.statusbar }}>
          <Route />
        </SafeAreaView>
        <Loader />
        <ChooseAddress />
        <CustomAlert />
        <AddAddressModal />
      </I18n>
    </Provider>
  )
}

export { App, store }
