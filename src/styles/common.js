import { StyleSheet, StatusBar, Platform,Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from './colors';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  Imagecontainer: {
    flex: 1,
      
    width: wp('100%'),
    height: hp('30%'),

  },

  ComponentContainerStyle: {
    backgroundColor: '#e8e3e3',
    flexDirection: 'row',
    height: hp('8%'),
    borderRadius: 75,
  },

  TextStyle: {
    
    marginLeft: wp('2%'),
    fontFamily: 'Montserrat-Bold'
  },



  TextInputStyle: {
    margin: hp('1%'),
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: 'white',
    height:(Platform.OS==='ios')?hp('6%'):hp("6%")
  },

  PickerStyle: {
    width: wp('95%'),
    height:hp('6%'),
    margin: hp('1%'),
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white'

  },
   
  Headerimage: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "flex-start",
    width: wp('100%'),
    height: hp('30%'),
  },

  Headertext: {

    color: "black",
    fontSize: 30,
    fontFamily: 'Montserrat-bold',
    fontWeight: 'bold',
    textAlign:'center',
    paddingTop:'40%'
  },

  Headertext2: {

    color: "black",
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    textAlign:'center'
    
  },

    

  DatePickerStyle: {
    width: wp('90%'),
    marginLeft: hp('1%'),
    margin: hp('1%'),
    borderRadius: 75,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  SubmitButtonCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%')
  },
    TextInputStyleClass: {

        textAlign: 'center',
        height: 50,
        marginLeft: hp('1%'),
        margin: hp('1%'),
        borderWidth: 1,
        borderRadius: 75,
        borderColor: 'red',
       

    },
  SubmitButton: {
    backgroundColor: 'red',
    width: wp('90%'),
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: hp('1%'),
  },

  SubmitButtonText: {
    fontSize: hp('3%'),
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Radiobuttonstyle: {
    width: wp('27%'),
    marginLeft: hp('1%'),
    margin: hp('1%'),
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#FFFFFF50',
    alignItems: "center"

  },
  RejectedContainerStyle: {
    backgroundColor: '#e8e3e3',
    flexDirection: 'row',
    height: hp('8%'),
    borderRadius: 75,
    width: wp("53%")

  },

  
  ListContainer: {
    backgroundColor: '#e8e3e3',
    height: hp('59%'),
  },
  ListRowContainer: {
    width: wp('91%'),
    borderRadius: 75,
    borderColor: 'red',
    borderWidth: 0.6,
    backgroundColor: 'white',
    marginLeft: "1%",
    margin:3
  },
  ListHeading: {
    width: "40%",
    paddingTop: "3%",
    borderRightWidth: 1,
    borderRightColor: "#e8e3e3"
  },
  ListRowStyle: {
    width: "41%", 
    alignItems: "center",
    justifyContent:"center", 
    borderRightWidth: 1, 
    borderRightColor: "red" 
  },
  ListTextstyle:{
    textAlign: "center",
     color: "white"
  },
  AddButton: {
    backgroundColor: 'red',width: wp('45%'),height: hp('5%'),
    justifyContent: 'center',alignItems: 'center',borderRadius: 10,marginBottom: hp('1%'),
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  },



});
