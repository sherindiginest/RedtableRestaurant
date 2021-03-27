import React, {Component} from 'react';
import {
  View,
  Text,
  Picker,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Platform,
  TextInput,
  AsyncStorage,
  Switch,
  ImageBackground,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Dialog, {
  DialogFooter,
  ScaleAnimation,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomTextInput, CustomButton} from './../components';
import {backgroundImage, logo, email, password} from './../../assets/images';
import {COLORS, HEIGHT, WIDTH} from './../constants';

const SignupScreen = () => {
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
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '20%',
          }}>
           <Image
          style={{width: WIDTH * 0.6, height: HEIGHT * 0.32}}
          source={logo}
          resizeMode="contain"
        />
        </View>
        {/* <ScrollView> */}
          {/* <View
            style={{
              marginLeft: wp('3%'),
              marginRight: wp('3%'),
              marginTop: hp('10%'),
            }}> */}
            {/* FirstName */}
            <CustomTextInput
                  image={email}
                  placeholder={'Name'}
                  onChangeText={(text) => {}}
            />

            {/* Text field for Email Id */}
            <CustomTextInput
                  image={email}
                  placeholder={'Email'}
                  onChangeText={(text) => {}}
            />

            {/* Text field Mobile Number */}
            <CustomTextInput
                  image={email}
                  placeholder={'Phone Number'}
                  onChangeText={(text) => {}}
            />

            {/* .......................... Password.......................... */}
            <CustomTextInput
          image={password}
          placeholder={'Password'}
          onChangeText={() => {}}
        />

            {/* ..........................Submit Button........................... */}
            


            <CustomButton title="REGISTER" />
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
            {`Already Have A Account? `}
            <Text
              style={{color: 'green', fontSize: 15, fontWeight: 'bold'}}>
              LOGIN
            </Text>
          </Text>
        </Pressable>




              
          
            
           
          {/* </View> */}
        {/* </ScrollView> */}
      </ImageBackground>
    </View>
  );
}
const styless = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    height: 50,
    margin: 15,
    width: '90%',
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#FFFFFF50',
  },
});
export default SignupScreen;