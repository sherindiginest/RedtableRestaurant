import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function BackgroundImage() {
  return (
    <View >
      <ImageBackground source={require('../../assets/images/s2.png')} style={{
  
   opacity:.9,
    resizeMode: "cover",
    justifyContent: "center",
    height: hp('100%'),
    width:wp('100%')
  }}>
      
      </ImageBackground>
    </View>
  );
}

