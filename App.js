import React from 'react'
import { View, SafeAreaView, Text, LogBox } from 'react-native'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'

import Route from './src/Route'
import configureStore from './src/redux/store'
import { translations } from './src/constants/translations'
import { COLORS } from './src/constants'
import { ChooseAddress, Loader } from './src/components'
LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component", "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation"])
let store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <I18n translations={translations} initialLang="en">
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.statusbar }}>
          <Route />
        </SafeAreaView>
        <Loader />
        <ChooseAddress />
      </I18n>
    </Provider>
  )
}

export { App, store }
