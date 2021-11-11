import { Dimensions } from 'react-native'

import Axios from "./axios"
import { API } from "./api"
import { myorders } from '../../assets/images'
import { CommonActions } from '@react-navigation/native';

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
    return { 
      //fontFamily: "ProximaNovaAltRegular" 
      textAlign:  'left' 
    }
  },
  fontMedium: () => {
    return { 
      //fontFamily: "ReneBiederMilliard-Medium" 
      textAlign:  'left'
    }
  },
  fontBold: () => {
    return { 
      //fontFamily: "ReneBiederMilliard-Bold" 
      textAlign:  'left'
    }
  },
  fontSpecial: () => {
    return { 
      //fontFamily: "BerkshireSwash-Regular" 
      textAlign:  'left'
    }
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

const colorArray = () => {
  const clr = [["#FF5673","#FF8C48"],["#832BF6","#FF4665"],["#2DCEF8","#3B40FE"],["#009DC5" , "#21E590"]]
 return clr[Math.floor(Math.random()*clr.length)]
}

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(name, params) {
    _navigator.dispatch(
      CommonActions.navigate({ name, params })
    );
}

export { COLORS, WIDTH, HEIGHT, STYLES, Axios, API, validateEmail, validatePhone,colorArray,setTopLevelNavigator,navigate }


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