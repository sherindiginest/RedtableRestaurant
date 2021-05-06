import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
  Image,
  Pressable,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CustomTextInput, CustomButton } from './../components'
import { backgroundImage, logo, email, password } from './../../assets/images'
import { COLORS, HEIGHT, WIDTH } from './../constants'

const otps = [0, 1, 2, 3]

const OtpScreen = (props, context) => {
  const { navigation } = props

  const OTPField = () => {
    return (
      <View
        style={{
          height: WIDTH * 0.15,
          width: WIDTH * 0.15,
          borderRadius: WIDTH * 0.03,
          backgroundColor: COLORS.white,
        }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 25,
            textAlign: 'center',
          }}
          placeholder="*"
          placeholderTextColor={COLORS.placeHolderColor}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{
          flex: 1,
          paddingHorizontal: WIDTH * 0.09,
        }}
        source={backgroundImage}
        resizeMode="cover">
        <View
          style={{
            marginTop: HEIGHT * 0.15,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 25,
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: HEIGHT * 0.01,
            }}>
            {context.t("we_sent_otp_mobile")}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 14,
              paddingHorizontal: WIDTH * 0.02,
              textAlign: 'center',
              marginBottom: HEIGHT * 0.06,
            }}>
            {context.t("please_check_mobile")}
          </Text>

          <View
            style={{
              height: HEIGHT * 0.07,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: HEIGHT * 0.025,
            }}>
            {otps.map((otp, index) => (
              <OTPField index={index} key={index.toString()} />
            ))}
          </View>
          <CustomButton
            title={context.t("next")}
            onPress={() => {
              navigation.replace('Home')
            }}
          />
          <View
            style={{
              height: HEIGHT * 0.076,
              alignSelf: 'stretch',
              borderRadius: HEIGHT * 0.038,
              alignItems: 'center',
              justifyContent: 'center',
              //flexDirection: 'row',
            }}>
            <Text style={{ color: COLORS.white, fontSize: 15 }}>
              {context.t("didnt_receive")}
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {context.t("click_here")}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

OtpScreen.contextTypes = {
  t: PropTypes.func,
}
const mapStateToProps = ({ i18nState }) => {
  return {
    lang: i18nState.lang,
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen)
