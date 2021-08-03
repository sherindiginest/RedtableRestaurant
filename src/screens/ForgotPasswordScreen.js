import React, { useState } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Pressable, } from 'react-native';
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has } from "lodash"

import { CustomTextInput, CustomButton } from './../components';
import { backgroundImage, logo, email as emailLogo, backarrow } from './../../assets/images';
import { API, Axios, COLORS, HEIGHT, STYLES, validateEmail, WIDTH } from './../constants';
import { AlertAction } from '../redux/actions';

const ForgotPasswordScreen = (props, context) => {
  const { navigation, lang } = props;
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setloading] = useState(false)


  const handleForgot = async () => {
    if (validate()) {
      setloading(true)
      await Axios.post(API.passwordForgot, { email }).then(async (response) => {
        if (has(response, "success") && response.success) {
          dispatch(AlertAction.handleAlert({
            visible: true,
            title: "Success",
            message: "Reset mail sended successfully, Please check the mail",
            buttons: [{
              title: "Okay",
              onPress: () => {
                dispatch(AlertAction.handleAlert({ visible: false, }))
                navigation.goBack()
              }
            }]
          }))
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
              navigation.goBack()
            }
          }]
        }))
        setloading(false)
      })
    }
  }

  const validate = () => {
    const error = {}
    if (isEmpty(email)) {
      error.email = "Please enter the email id"
    }
    if (!isEmpty(email) && !validateEmail(email)) {
      error.email = "Invalid email id"
    }
    setErrors({ ...error })
    return isEmpty(error)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground style={{ height: HEIGHT, paddingHorizontal: WIDTH * 0.07, }} source={backgroundImage} resizeMode="cover">
        <View style={[{ height: HEIGHT * 0.07, alignItems: 'center', marginTop: HEIGHT * 0.04, }, STYLES.flexDirection(lang)]}>
          <Pressable onPress={() => { navigation.goBack() }} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: WIDTH * 0.07, height: HEIGHT * 0.05, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }} source={backarrow} resizeMode="contain" />
          </Pressable>
          <Text style={[{ color: COLORS.white, fontSize: 15, paddingHorizontal: WIDTH * 0.02, }, STYLES.fontBold()]}> {context.t("forgot_password")}
          </Text>
        </View>
        <View style={{ height: HEIGHT * 0.3, justifyContent: 'space-between', marginTop: HEIGHT * 0.15 }}>
          <Text style={[{ color: COLORS.white, fontSize: 15, paddingHorizontal: WIDTH * 0.02, textAlign: 'center', lineHeight: 20 }, STYLES.fontMedium()]}>{context.t("password_reset_text")}
          </Text>
          <CustomTextInput
            image={emailLogo}
            placeholder={context.t('email')}
            onChangeText={(text) => setEmail(text.trim())}
            keyboardType="email-address"
            error={errors?.email}
            onSubmitAction={() => handleForgot()}
          />
          <CustomButton title={context.t('send')} onPress={() => { handleForgot() }}
            loading={loading}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

ForgotPasswordScreen.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = ({ i18nState }) => {
  return {
    lang: i18nState.lang,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
