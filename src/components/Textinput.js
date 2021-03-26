import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';



export default function Textinput() {
  return (
    <View style={{ width: wp('75%') }}>
  
    <TextInput
     style={{  margin: hp('1%'),
     paddingLeft:'10%',
     borderRadius: 75,
     borderColor: 'white',
     borderWidth: 1,
     textAlign: 'left',
     backgroundColor: '#FFFFFF50',
     height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
      placeholder="Username"
      placeholderTextColor="white" 
      //underlineColorAndroid="white"
      onChangeText={this.handleUserName}
      value={this.state.UserName}
    />
    </View>
  );
}