import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { isEmpty, has } from "lodash"
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AlertAction, profileAction } from "./../redux/actions"
import { CustomTextInput, CustomButton } from './../components';
import { backgroundImage, logo, email, password, eye } from './../../assets/images';
import { COLORS, HEIGHT, STYLES, WIDTH, Axios, API, validateEmail } from './../constants';

const LoginScreen = (props, context) => {
  const { navigation, lang, setProfileData, setAddressList, setCartList } = props;
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setloading] = useState(false)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()
  const setData = (field, value) => {
    form[field] = value
    setForm({ ...form })
  }

  const handleLogin = async () => {
    if (validate()) {
      setloading(true)
      await Axios.post(API.login, form)
        .then(async (response) => {
          if (has(response, "success") && response.success) {
            const { api_token } = response.data
            setProfileData(response.data)
            await AsyncStorage.setItem('api_token', api_token)
            Axios.get(API.addresses(), { params: { api_token, "search": `user_id:${response?.data?.id}` } })
              .then(async (res) => {
                if (has(res, "success") && res.success) {
                  setAddressList(res.data)
                }
              }).catch((error) => { })
            Axios.get(API.carts(), { params: { api_token } }).then(async (response) => {
              if (has(response, "success") && response.success) {
                setCartList(response.data)
              }
            }).catch((error) => { })
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
    const { email, password } = form
    const error = {}
    if (isEmpty(email)) {
      error.email = "Please enter the email id"
    }
    if (!isEmpty(email) && !validateEmail(email)) {
      error.email = "Invalid email id"
    }
    if (isEmpty(password)) {
      error.password = "Please enter the password"
    }
    setErrors({ ...error })
    console.log(error);
    return isEmpty(error)
  }

  return (<View style={{ flex: 1 }}>
    <StatusBar backgroundColor={COLORS.statusbar} />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null} >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ backgroundColor: COLORS.primary }}>
          <ImageBackground
            style={{
              height: HEIGHT * 0.91,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingHorizontal: WIDTH * 0.07,
            }}
            source={backgroundImage}
            resizeMode="cover">
            <Image
              style={{ width: WIDTH * 0.6, height: HEIGHT * 0.3 }}
              source={logo}
              resizeMode="contain"
            />
            <CustomTextInput
              image={email}
              placeholder={context.t('email')}
              onChangeText={(text) => setData("email", text.trim())}
              keyboardType="email-address"
              returnKeyType="next"
              nextRef={passwordRef}
              error={errors?.email}
            />
            <CustomTextInput
              image={password}
              placeholder={context.t('password')}
              currentRef={passwordRef}
              secureEntry
              secureEntryIcon={eye}
              onChangeText={(text) => setData("password", text.trim())}
              onSubmitAction={() => handleLogin()}
              error={errors?.password}
            />
            <View style={[{ alignSelf: 'stretch', }, STYLES.alignItems(lang == 'ar' ? 'en' : 'ar'),]}>
              <Pressable
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={[{ color: COLORS.white, fontSize: 15 }, STYLES.fontMedium()]}>
                  {`${context.t('forgot_password')}?`}
                </Text>
              </Pressable>
            </View>
            <CustomButton
              title={context.t('login')}
              onPress={() => {
                handleLogin()
                //navigation.navigate('OtpScreen');
              }}
              loading={loading}
            />
            <Pressable style={[{
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
                {`${context.t('dont_have_account')} `}
              </Text>
              <Pressable onPress={() => navigation.navigate('SignupScreen')}>
                <Text
                  style={[{
                    color: COLORS.primary,
                    fontSize: 15,
                  }, STYLES.fontBold()]}>
                  {`${context.t('register_here')} `}
                </Text>
              </Pressable>
            </Pressable>
          </ImageBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </View>);
};

LoginScreen.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = ({ i18nState }) => {
  return {
    lang: i18nState.lang,
  };
};

const mapDispatchToProps = {
  setProfileData: (userData) => profileAction.setProfileData(userData),
  setAddressList: (address) => profileAction.setAddressList(address),
  setCartList: (cart) => profileAction.setCartList(cart)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
