import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {HEIGHT, COLORS, WIDTH} from '../constants';

const CustomButton = (props) => {
  const {title} = props;
  return (
    <Pressable
      style={{
        height: HEIGHT * 0.08,
        alignSelf: 'stretch',
        borderRadius: HEIGHT * 0.04,
        backgroundColor: COLORS.buttonYellow,
        alignItems: 'center',
        justifyContent: 'center',
        //flexDirection: 'row',
      }}>
      <Text style={{color: COLORS.white, fontSize: 18}}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
