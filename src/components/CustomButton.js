import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {HEIGHT, COLORS, WIDTH} from '../constants';

const CustomButton = (props) => {
  const {title, style, onPress = () => {}} = props;
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: HEIGHT * 0.076,
          alignSelf: 'stretch',
          borderRadius: HEIGHT * 0.038,
          backgroundColor: COLORS.buttonYellow,
          alignItems: 'center',
          justifyContent: 'center',
          //flexDirection: 'row',
        },
        {...style},
      ]}>
      <Text style={{color: COLORS.white, fontSize: 18}}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
