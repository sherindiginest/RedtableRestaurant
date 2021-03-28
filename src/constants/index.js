import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const WIDTH = width;
const HEIGHT = height;

const COLORS = {
  primary: '#FF0000',
  statusbar: '#E8262E',
  textInputBorder: '#00000044',
  textInputBackground: '#FFFFFF33',
  white: '#FFFFFF',
  buttonYellow: '#FFB300',
  buttondark: '#00000056',
  activeTabColor: '#5663FF',
  inactiveTabColor: '#6E7FAA',
  borderColor: '#CA3D3D30',
};

export {COLORS, WIDTH, HEIGHT};
