import React from 'react';
import {View, Text, ImageBackground, StatusBar, Image} from 'react-native';

import {backgroundImage, logo} from './../../assets/images';
import {COLORS} from './../constants';

const SplashScreen = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.statusbar} />
      <ImageBackground
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source={backgroundImage}
        resizeMode="cover">
        <Image source={logo} resizeMode="contain" />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
