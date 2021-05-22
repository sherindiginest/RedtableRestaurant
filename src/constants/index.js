import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')
const WIDTH = width
const HEIGHT = height

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
  green: '#11FF00',
  greendark: '#40FC11',
  green1: "#4CD964",
  green2: "#21B73A",
  placeHolderColor: '#B6B7B7',
  black: '#000000',
  borderColor1: "#EFE5E5",
  //placeHolderColor: "#767676"
  addToCartButton: "#FF5763",
  titleColor: "#767676",
  title1: "#23222A",
  borderColor2: "#707070",
  backgroundColor: "#F2F2F2"
}

const STYLES = {
  flexDirection: (lang) => {
    return { flexDirection: `row${lang == 'ar' ? '-reverse' : ''}` }
  },
  justifyContent: (lang) => {
    return { justifyContent: `flex-${lang == 'ar' ? 'end' : 'start'}` }
  },
  alignItems: (lang) => {
    return { alignItems: `flex-${lang == 'ar' ? 'end' : 'start'}` }
  },
  textAlign: (lang) => {
    return { textAlign: lang == 'ar' ? 'right' : 'left' }
  },
}

export { COLORS, WIDTH, HEIGHT, STYLES }
