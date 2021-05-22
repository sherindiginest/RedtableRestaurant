import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CustomTextInput, CustomButton } from './../components'
import {
  backgroundImage,
  logo,
  email,
  password,
  user,
  phone,
  eye
} from './../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from './../constants'

const SignupScreen = (props, context) => {
  const { navigation, lang } = props
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          paddingHorizontal: WIDTH * 0.07,
        }}
        source={backgroundImage}
        resizeMode="cover">
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: HEIGHT * 0.3,
            marginTop: HEIGHT * 0.03,
          }}>
          <Image
            style={{
              width: WIDTH * 0.6,
              height: HEIGHT * 0.3,
            }}
            source={logo}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <CustomTextInput
              style={{ marginBottom: HEIGHT * 0.01 }}
              image={user}
              placeholder={context.t('name')}
              onChangeText={(text) => { }}
            />
            <CustomTextInput
              style={{ marginBottom: HEIGHT * 0.01 }}
              image={email}
              placeholder={context.t('email')}
              onChangeText={(text) => { }}
            />
            <CustomTextInput
              style={{ marginBottom: HEIGHT * 0.01 }}
              image={phone}
              placeholder={context.t('phone_number')}
              onChangeText={(text) => { }}
            />
            <CustomTextInput
              secureEntry
              secureEntryIcon={eye}
              style={{ marginBottom: HEIGHT * 0.01 }}
              image={password}
              placeholder={context.t('password')}
              onChangeText={() => { }}
            />
            <CustomButton
              onPress={() => navigation.navigate('OtpScreen')}
              title={context.t('register')}
              style={{
                marginTop: HEIGHT * 0.02,
                marginBottom: HEIGHT * 0.03,
              }}
            />
            <View
              style={[
                {
                  height: HEIGHT * 0.076,
                  alignSelf: 'stretch',
                  borderRadius: HEIGHT * 0.038,
                  backgroundColor: COLORS.buttondark,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                STYLES.flexDirection(lang),
              ]}>
              <Text style={{ color: COLORS.white, fontSize: 15 }}>
                {`${context.t('already_have_account')} `}
              </Text>
              <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {`${context.t('login')} `}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  )
}

SignupScreen.contextTypes = {
  t: PropTypes.func,
}
const mapStateToProps = ({ i18nState }) => {
  return {
    lang: i18nState.lang,
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
