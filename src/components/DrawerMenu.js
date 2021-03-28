import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import {HEIGHT, COLORS, WIDTH} from './../constants';
import {logo, email} from './../../assets/images';

const MENULIST = [
  {
    label: 'Discover',
    icon: email,
  },
  {
    label: 'Offers',
    icon: email,
  },
  {
    label: 'My Orders',
    icon: email,
  },
];

const DrawerMenu = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: HEIGHT * 0.15,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: COLORS.borderColor,
        }}>
        <Image
          source={logo}
          resizeMode="contain"
          style={{height: HEIGHT * 0.1, width: WIDTH * 0.3, borderWidth: 1}}
        />
        <View>
          <Text>Ezio Auditore</Text>
          <Text>ezio@gmail.com</Text>
        </View>
      </View>
      <FlatList
        style={{marginTop: HEIGHT * 0.02}}
        keyExtractor={(item) => item.label}
        data={MENULIST}
        renderItem={({item}) => (
          <View
            style={{
              height: HEIGHT * 0.07,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: WIDTH * 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={item.icon}
                //style={{width: WIDTH * 0.07, height: WIDTH * 0.07}}
                resizeMode="contain"
              />
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text>{item.label}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DrawerMenu;
