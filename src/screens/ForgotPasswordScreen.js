import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {CustomTextInput, CustomButton} from './../components';
import {backgroundImage, logo, email, backarrow} from './../../assets/images';
import {COLORS, HEIGHT, STYLES, WIDTH} from './../constants';

const ForgotPasswordScreen = (props,context) => {
  const {navigation,lang} = props;
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{
          flex: 1,
          paddingHorizontal: WIDTH * 0.07,
        }}
        source={backgroundImage}
        resizeMode="cover">
        <View
          style={[{
            height: HEIGHT * 0.07,
            alignItems: 'center',
            marginTop: HEIGHT * 0.04,
          },STYLES.flexDirection(lang)]}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: WIDTH * 0.1,
                height: HEIGHT * 0.07,
                transform:[{scaleX: lang == "ar" ? -1:1}]
              }}
              source={backarrow}
              resizeMode="contain"
            />
          </Pressable>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 32,
              paddingHorizontal: WIDTH * 0.02,
            }}>
            {context.t("forgot_password")}
          </Text>
        </View>
        <View
          style={{
            height: HEIGHT * 0.3,
            justifyContent: 'space-between',
            marginTop: HEIGHT * 0.14,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              paddingHorizontal: WIDTH * 0.02,
              textAlign: 'center',
            }}>
            {context.t("password_reset_text")}
          </Text>
          <CustomTextInput
            image={email}
            placeholder={context.t('email')}
            onChangeText={(text) => {}}
          />
          <CustomButton
            title={context.t('send')}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

ForgotPasswordScreen.contextTypes = {
  t: PropTypes.func,
};
const mapStateToProps = ({i18nState}) => {
  return {
    lang: i18nState.lang,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
