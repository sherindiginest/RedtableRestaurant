import React, { useEffect } from 'react'
import { View, SafeAreaView, Text, LogBox } from 'react-native'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'
import { messaging, notifications } from 'react-native-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Route from './src/Route'
import configureStore from './src/redux/store'
import { translations } from './src/constants/translations'
import { COLORS, navigate } from './src/constants'
import { ChooseAddress, Loader, CustomAlert, AddAddressModal } from './src/components'
import { profileAction } from './src/redux/actions';
LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component", "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation"])
let store = configureStore()

const App = () => {

  useEffect(() => {
    notifications().getInitialNotification().then((notificationOpen) => {
      if (notificationOpen) {
        const { data } = notificationOpen.notification
        data.item = JSON.parse(data.item)
        store.dispatch(profileAction.setNotificationData(data))
      }
    });
    onNotification()
  }, []);

  const onNotification = async () => {

    notifications().onNotification(notification => {
      if (Platform.OS === 'android') {

        const channelId = new notifications.Android.Channel(
          'Default',
          'Default',
          notifications.Android.Importance.High
        );

        notifications().android.createChannel(channelId);

        let notification_to_be_displayed = new notifications.Notification({
          data: notification._android._notification._data,
          sound: 'default',
          show_in_foreground: true,
          title: notification.title,
          body: notification.body,
        });

        // if (Platform.OS == 'android') {
        notification_to_be_displayed.android.setPriority(notifications.Android.Priority.High).android.setChannelId('Default').android.setVibrate(1000).android.setSmallIcon('ic_launcher')
        //.android.setBigPicture(notification._android._largeIcon);
        // }
        notifications().displayNotification(notification_to_be_displayed);

      } else if (Platform.OS === 'ios') {

        const localNotification = new notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData(notification.data)
          .setSound("default")
          .ios.setBadge(notification.ios.badge);

        notifications().displayNotification(localNotification).catch(err => console.log(err));
      }
    })
    await notifications().onNotificationOpened((notificationOpen) => {
      if (notificationOpen) {
        const { data } = notificationOpen.notification
        data.item = JSON.parse(data.item)
        notificationAction(data)
        //store.dispatch(profileAction.setNotificationData(data))
      }
    })
  }

  const notificationAction = async (data) => {
    const api_token = await AsyncStorage.getItem("api_token")
    if (api_token != null) {
      const navPath = {
        coupon: { screen: "OffersScreen" },
        restaurant: { screen: "Bottom", params: { screen: "HomeTab", params: { screen: "RestaurantDetailsScreen", params: { item: data?.item } } } },
        myorder: { screen: "Bottom", params: { screen: "MyOrdersScreen" } }
      }
      navigate('Home', navPath[data.type])
      notifications().removeAllDeliveredNotifications()
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
