import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

import { HEIGHT, COLORS, WIDTH, STYLES } from '../constants';

const CustomButton = (props) => {
  const { title, style, onPress = () => { }, loading = false } = props;
  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      style={[
        {
          height: HEIGHT * 0.076,
          alignSelf: 'stretch',
          borderRadius: HEIGHT * 0.038,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center',
          //flexDirection: 'row',
        },
        { ...style },
      ]}>
      {loading ? <ActivityIndicator color={COLORS.white} size="large" /> : <Text style={[{ color: COLORS.white, fontSize: 15 }, STYLES.fontMedium()]}>{title}</Text>}
    </Pressable>
  );
};

export default CustomButton;
