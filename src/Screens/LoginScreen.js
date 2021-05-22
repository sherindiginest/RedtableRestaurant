import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {CustomTextInput, CustomButton} from './../components';
import {backgroundImage, logo, email, password} from './../../assets/images';
import {COLORS, HEIGHT, STYLES, WIDTH} from './../constants';

const LoginScreen = (props, context) => {
  const {navigation, lang} = props;

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: WIDTH * 0.07,
        }}
        source={backgroundImage}
        resizeMode="cover">
        <Image
          style={{width: WIDTH * 0.6, height: HEIGHT * 0.3}}
          source={logo}
          resizeMode="contain"
        />
        <CustomTextInput
          image={email}
          placeholder={context.t('email')}
          onChangeText={(text) => {}}
        />
        <CustomTextInput
          image={password}
          placeholder={context.t('password')}
          onChangeText={() => {}}
        />
        <View
          style={[
            {
              alignSelf: 'stretch',
            },
            STYLES.alignItems(lang == 'ar' ? 'en' : 'ar'),
          ]}>
          <Pressable
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={{color: COLORS.white, fontSize: 21}}>
              {`${context.t('forgot_password')}?`}
            </Text>
          </Pressable>
        </View>
        <CustomButton
          title={context.t('login')}
          onPress={() => {
            navigation.navigate('OtpScreen');
          }}
        />
        <Pressable
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
          <Text style={{color: COLORS.white, fontSize: 15}}>
            {`${context.t('dont_have_account')} `}
          </Text>
          <Pressable onPress={() => navigation.navigate('SignupScreen')}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {`${context.t('register_here')} `}
            </Text>
          </Pressable>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

LoginScreen.contextTypes = {
  t: PropTypes.func,
};
const mapStateToProps = ({i18nState}) => {
  return {
    lang: i18nState.lang,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
