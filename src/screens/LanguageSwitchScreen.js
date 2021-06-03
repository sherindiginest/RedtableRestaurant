import React from 'react';
import {
  StatusBar,
  Image,
  Pressable,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS, HEIGHT, STYLES, WIDTH } from './../constants';
import { backgroundImage, logo } from './../../assets/images';
import { SetLanguageAction } from './../redux/actions';

const LanguageSwitchScreen = (props, context) => {
  const { navigation } = props;

  const setLanguage = async (lang) => {
    await AsyncStorage.setItem('lang', lang)
    props.setLang(lang);
    navigation.replace('LoginScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: WIDTH * 0.07,
        }}
        source={backgroundImage}
        resizeMode="cover">
        <Image
          style={{
            width: WIDTH * 0.6,
            height: HEIGHT * 0.32,
            marginTop: HEIGHT * 0.03,
          }}
          source={logo}
          resizeMode="contain"
        />
        <Text style={[{ color: COLORS.white, textAlign: 'center', fontSize: 15, }, STYLES.fontBold()]}>
          {context.t('choose_your_language')}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
            height: HEIGHT * 0.08,
            marginTop: HEIGHT * 0.04,
          }}>
          <Pressable
            onPress={() => setLanguage('en')}
            style={{
              flex: 1,
              borderTopLeftRadius: HEIGHT * 0.04,
              borderBottomLeftRadius: HEIGHT * 0.04,
              backgroundColor: COLORS.buttonYellow,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[{ color: COLORS.white, fontSize: 15, }, STYLES.fontBold()]}>
              {context.t('english')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLanguage('ar')}
            style={{
              flex: 1,
              borderTopRightRadius: HEIGHT * 0.04,
              borderBottomRightRadius: HEIGHT * 0.04,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[{ color: COLORS.black, fontSize: 15 }, STYLES.fontBold()]}>
              {context.t('arabic')}
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View >
  );
};

LanguageSwitchScreen.contextTypes = {
  t: PropTypes.func,
};
const mapStateToProps = ({ i18nState, loadingReducer }) => {
  return {
    lang: i18nState.lang,
    loading: loadingReducer.loading,
  };
};
const mapDispatchToProps = {
  setLang: SetLanguageAction.setLang,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSwitchScreen);
