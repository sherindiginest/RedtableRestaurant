import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  ImageBackground,
  ScrollView, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isEmpty, has } from "lodash"

import { AlertAction, profileAction } from "./../redux/actions"
import { CustomTextInput, CustomButton } from './../components'
import { backgroundImage, logo, email, password, user, phone, eye } from './../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH, Axios, API, validateEmail, validatePhone } from './../constants'

const SignupScreen = (props, context) => {
  const { navigation, lang, setProfileData, setAddressList } = props
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const refList = { email: useRef(null), phone: useRef(null), password: useRef(null) }

  const setData = (field, value) => {
    form[field] = value
    setForm({ ...form })
  }

  const handleLogin = async () => {
    if (validate()) {
      setloading(true)
      await Axios.post(API.register, form)
        .then(async (response) => {
          if (has(response, "success") && response.success) {
            setProfileData(response.data)
            await AsyncStorage.setItem('api_token', response?.data?.api_token)
            //navigation.popToTop()
            navigation.replace('Home')
          }
          setloading(false)
        }).catch((error) => {
          dispatch(AlertAction.handleAlert({
            visible: true,
            title: "Error",
            message: error?.message,
            buttons: [{
              title: "Okay",
              onPress: () => {
                dispatch(AlertAction.handleAlert({ visible: false, }))
              }
            }]
          }))
          setloading(false)
        })
    }
  }

  const validate = () => {
    const { name, email, phone, password } = form
    const error = {}
    if (isEmpty(name)) {
      error.name = "Please enter the name"
    }
    if (isEmpty(email)) {
      error.email = "Please enter the email id"
    }
    if (!isEmpty(email) && !validateEmail(email)) {
      error.email = "Invalid email id"
    }
    if (isEmpty(phone)) {
      error.phone = "Please enter the phone"
    }
    if (!isEmpty(phone) && !validatePhone(phone)) {
      error.phone = "Invalid phone number"
    }
    if (isEmpty(password)) {
      error.password = "Please enter the password"
    }
    setErrors({ ...error })
    console.log(error);
    return isEmpty(error)
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null} >
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          <ScrollView style={{ backgroundColor: COLORS.primary, flex: 1 }} showsVerticalScrollIndicator={false}>
            <ImageBackground
              style={{
                height: HEIGHT * 0.91,
                justifyContent: 'space-evenly',
                paddingHorizontal: WIDTH * 0.07,
              }}
              source={backgroundImage}
              resizeMode="cover">
              <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
                  <CustomTextInput
                    outerStyle={{ marginBottom: HEIGHT * 0.01 }}
                    image={user}
                    placeholder={context.t('name')}
                    onChangeText={(text) => setData("name", text)}
                    returnKeyType="next"
                    nextRef={refList.email}
                    error={errors?.name}
                  />
                  <CustomTextInput
                    outerStyle={{ marginBottom: HEIGHT * 0.01 }}
                    image={email}
                    placeholder={context.t('email')}
                    onChangeText={(text) => setData("email", text.trim())}
                    keyboardType="email-address"
                    returnKeyType="next"
                    currentRef={refList.email}
                    nextRef={refList.phone}
                    error={errors?.email}
                  />
                  <CustomTextInput
                    outerStyle={{ marginBottom: HEIGHT * 0.01 }}
                    image={phone}
                    placeholder={context.t('phone_number')}
                    onChangeText={(text) => setData("phone", text.trim())}
                    keyboardType="number-pad"
                    error={errors?.phone}
                    returnKeyType="next"
                    currentRef={refList.phone}
                    nextRef={refList.password}
                    maxLength={10}
                  />
                  <CustomTextInput
                    secureEntry
                    secureEntryIcon={eye}
                    outerStyle={{ marginBottom: HEIGHT * 0.01 }}
                    image={password}
                    placeholder={context.t('password')}
                    onChangeText={(text) => setData("password", text.trim())}
                    currentRef={refList.password}
                    error={errors?.password}
                    onSubmitAction={() => handleLogin()}
                  />
                  <CustomButton
                    onPress={() => handleLogin()}
                    title={context.t('register')}
                    style={{
                      marginTop: HEIGHT * 0.02,
                      marginBottom: HEIGHT * 0.03,
                    }}
                    loading={loading}
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
                    <Text style={[{ color: COLORS.white, fontSize: 15 }, STYLES.fontRegular()]}>
                      {`${context.t('already_have_account')} `}
                    </Text>
                    <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                      <Text
                        style={[{
                          color: COLORS.green,
                          fontSize: 15,
                        }, STYLES.fontBold()]}>
                        {`${context.t('login')} `}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
              <Pressable style={{ position: "absolute", right: WIDTH * 0.05, top: HEIGHT * 0.025 }}
                onPress={() => navigation.replace('Home')}>
                <Text style={[{ color: COLORS.white, fontSize: 15 }, STYLES.fontMedium()]}>
                  {context.t('continue_as_guest')}
                </Text>
              </Pressable>
            </ImageBackground>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
const mapDispatchToProps = {
  setProfileData: (userData) => profileAction.setProfileData(userData),
  setAddressList: (address) => profileAction.setAddressList(address),
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
