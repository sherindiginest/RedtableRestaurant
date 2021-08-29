import React, { useEffect, useState } from 'react';
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

import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants';
import { backgroundImage, bahrain, logo, saudi } from '../../assets/images';
import { SetLanguageAction } from '../redux/actions';
import { CustomButton } from '../components';

const LanguageSwitchScreen = (props, context) => {
  const { navigation } = props;
  const [country, setCountry] = useState("saudi_arabia")

  const countryChange = async (country) => {
    await AsyncStorage.setItem('country', country)
    //props.setLang(lang);
    setCountry(country)
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
            width: WIDTH * 0.4,
            height: HEIGHT * 0.32,
            marginTop: HEIGHT * 0.05,
          }}
          source={logo}
          resizeMode="contain"
        />
        <Text style={[{ color: COLORS.white, textAlign: 'center', fontSize: 15, }, STYLES.fontBold()]}>
          {context.t('choose_your_country')}
        </Text>

        <View style={{ alignSelf: 'stretch', height: HEIGHT * 0.2, marginTop: HEIGHT * 0.04, borderRadius: HEIGHT * 0.04, backgroundColor: `${COLORS.white}20` }}>
          <Pressable onPress={() => countryChange('saudi_arabia')} style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row" }}>
            <View style={{ width: WIDTH * 0.5, flexDirection: "row", alignItems: 'center', }}>
              <Image style={{ width: WIDTH * 0.12, height: HEIGHT * 0.05, }}
                source={saudi}
                resizeMode="contain"
              />
              <Text
                style={[{ color: COLORS.white, fontSize: 15, marginLeft: WIDTH * 0.05 }, STYLES.fontBold()]}>
                {context.t('saudi_arabia')}
              </Text>
            </View>
            <View style={{
              width: WIDTH * 0.06, alignItems: 'center', justifyContent: 'center',
              height: WIDTH * 0.06, borderWidth: 2, borderRadius: WIDTH * 0.03, borderColor: COLORS.primary, backgroundColor: COLORS.white
            }}>
              {country == "saudi_arabia" && <View style={{ width: WIDTH * 0.035, height: WIDTH * 0.035, borderRadius: WIDTH * 0.0175, backgroundColor: COLORS.primary }} />}
            </View>
          </Pressable>
          <View style={{ borderBottomWidth: 1, borderColor: COLORS.primary, marginHorizontal: WIDTH * 0.1 }} />
          <Pressable onPress={() => countryChange('bahrain')} style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row" }}>
            <View style={{ width: WIDTH * 0.5, flexDirection: "row", alignItems: 'center', }}>
              <Image style={{ width: WIDTH * 0.12, height: HEIGHT * 0.05, }}
                source={bahrain}
                resizeMode="contain"
              />
              <Text
                style={[{ color: COLORS.white, fontSize: 15, marginLeft: WIDTH * 0.05 }, STYLES.fontBold()]}>
                {context.t('bahrain')}
              </Text>
            </View>
            <View style={{
              width: WIDTH * 0.06, alignItems: 'center', justifyContent: 'center',
              height: WIDTH * 0.06, borderWidth: 2, borderRadius: WIDTH * 0.03, borderColor: COLORS.primary, backgroundColor: COLORS.white
            }}>
              {country == "bahrain" && <View style={{ width: WIDTH * 0.035, height: WIDTH * 0.035, borderRadius: WIDTH * 0.0175, backgroundColor: COLORS.primary }} />}
            </View>
          </Pressable>
        </View>
        <CustomButton
          title={context.t('next')}
          onPress={() => {
            navigation.replace('LoginScreen');
          }}
          style={{ marginTop: HEIGHT * 0.04, width: WIDTH * 0.6, alignSelf: "center", }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitchScreen);
