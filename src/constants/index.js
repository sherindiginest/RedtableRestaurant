import { Dimensions } from 'react-native'

import Axios from "./axios"
import { API } from "./api"
import { myorders } from '../../assets/images'

const { width, height } = Dimensions.get('screen')
const WIDTH = width
const HEIGHT = height

const COLORS = {
  primary: '#EF2023',
  statusbar: '#EA5D41',
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
  backgroundColor: "#F2F2F2",
  title2: "#222455",
  title3: "#3E3F68",
  arrowColor: "#8A98BA",
  color1: "#8AE378",
  color2: "#D8D8D8",
  color3: "#C1C1C1",
  color4: "#E37878"
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
  alignSelf: (lang) => {
    return { alignSelf: `flex-${lang == 'ar' ? 'end' : 'start'}` }
  },
  textAlign: (lang) => {
    return { textAlign: lang == 'ar' ? 'right' : 'left' }
  },
  fontRegular: () => {
    return { fontFamily: "ProximaNovaAlt-Regular" }
  },
  fontMedium: () => {
    return { fontFamily: "ReneBiederMilliard-Medium" }
  },
  fontBold: () => {
    return { fontFamily: "ReneBiederMilliard-Bold" }
  },
  fontSpecial: () => {
    return { fontFamily: "BerkshireSwash-Regular" }
  }
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/
  return re.test(String(phone).toLowerCase())
}

export { COLORS, WIDTH, HEIGHT, STYLES, Axios, API, validateEmail, validatePhone }


  /* 

  fonts 
  BerkshireSwash-Regular


  ProximaNova-Regular
    ProximaNovaAlt-Regular

  
bold -   ReneBiederMilliard-Bold
 ReneBiederMilliard-ExtraBold

  
 X  ReneBiederMilliard-Hairline

  ReneBiederMilliard-Medium

  ReneBiederMilliard-Heavy

  ReneBiederMilliard-SemiBold
  */