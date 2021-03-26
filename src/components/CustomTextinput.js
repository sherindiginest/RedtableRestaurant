import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';

import {HEIGHT, COLORS, WIDTH} from '../constants';

const CustomTextinput = (props) => {
  const {image, placeholder, onChangeText} = props;
  return (
    <View
      style={{
        borderWidth: 2,
        height: HEIGHT * 0.08,
        alignSelf: 'stretch',
        borderRadius: HEIGHT * 0.04,
        borderColor: COLORS.textInputBorder,
        backgroundColor: COLORS.textInputBackground,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Image
        style={{marginHorizontal: WIDTH * 0.05}}
        source={image}
        resizeMode="contain"
      />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.white}
        style={{flex: 1, fontSize: 19, color: COLORS.white}}
      />
    </View>
  );
};

export default CustomTextinput;
