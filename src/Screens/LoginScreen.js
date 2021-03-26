import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';

import {CustomTextInput, CustomButton} from './../components';
import {backgroundImage, logo, email, password} from './../../assets/images';
import {COLORS, HEIGHT, WIDTH} from './../constants';

const LoginScreen = () => {
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
          style={{width: WIDTH * 0.6, height: HEIGHT * 0.32}}
          source={logo}
          resizeMode="contain"
        />
        <CustomTextInput
          image={email}
          placeholder={'Email'}
          onChangeText={(text) => {}}
        />
        <CustomTextInput
          image={password}
          placeholder={'Password'}
          onChangeText={() => {}}
        />
        <View
          style={{
            alignSelf: 'stretch',
            alignItems: 'flex-end',
          }}>
          <Pressable>
            <Text style={{color: COLORS.white, fontSize: 21}}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <CustomButton title="LOGIN" />
        <Pressable
          style={{
            height: HEIGHT * 0.08,
            alignSelf: 'stretch',
            borderRadius: HEIGHT * 0.04,
            backgroundColor: COLORS.buttondark,
            alignItems: 'center',
            justifyContent: 'center',
            //flexDirection: 'row',
          }}>
          <Text style={{color: COLORS.white, fontSize: 15}}>
            {`Don't Have A Account? `}
            <Text
              style={{color: COLORS.primary, fontSize: 15, fontWeight: 'bold'}}>
              REGISTER HERE!
            </Text>
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
