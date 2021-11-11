
import React, { Component } from 'react';
import { View,ImageBackground, Text, Image, TouchableOpacity, StyleSheet,BackHandler
  ,Platform,  TextInput, AsyncStorage,Switch ,Button} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      UserName: '',
      Password: '',
      AppID: '',
      Invalid: '',
      errors: '',
      rememberMe:false,
      accesslevel: '',
      Success: false,
      Token: '',
      Email: '',
      User_id: '',
      Role_id:'',
      CompanyId:'',
      islogged:false,
      Name:'',
      Dob:'',
      Gender:'',
      Phone:'',
      Image:'',
      //r:false
     
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }



 

  handleUserName = (text) => {      //username function declaration
    this.setState({ UserName: text })
  }

  handlePassword = (text) => {      //Password function declaration
    //var temp2 = Base64.encode(this.state.Password);   //declaring a variable to encode the user password
    this.setState({ Password: text })
  }

 //login button function
 async signup()
 {
   
  this.props.navigation.navigate('Signup')
 }
 
 forgotpassword()
 {
  this.props.navigation.navigate('ForgotPassword')
 }

 componentDidMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  AsyncStorage.setItem('ScreenName','Login')
       AsyncStorage.getItem('isLoggedIn').then((value) => {
   if(value && value === 'YES') {
     
    this.props.navigation.navigate('DrawerNavigator')

   }
 })
}
async handleBackButtonClick() {
  var screenName=await AsyncStorage.getItem("ScreenName");  
  if(screenName=="Login" )
  {  
      
    BackHandler.exitApp();
  }
  
 
  return true;
}
 async Login()
 { 
  this.props.navigation.navigate('DrawerNavigator')
//alert(0)
//   let response = await fetch('https://mastermindias.smartipz.com/token/user_api/login', {   
// method: 'POST',
// headers: {
  
//   //'Authorization':'123456',
//   //'API Key':'required',
//   'X-API-KEY':'123456', 
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
  
  
 
// },

// body: JSON.stringify({
//   email: this.state.UserName,
//   password: this.state.Password
  
// })

// })



// let responseJson = await response.json();
//      let result = JSON.stringify(responseJson)
     
     
//      //alert(JSON.stringify(responseJson))
//      //alert(responseJson.student_details.name)
// if (responseJson.message == 'Login failed.')
// {   //this will shows error if username or password incorrect
    


// this.setState({
//   errors: 'Invalid Username or Password',
//   UserName: '',
//   Password: '',
// })
// }
// else {
   
//  this.setState({
//    Success: true,
//    Token: responseJson.jwt,
//    Email: responseJson.email,
//    Name:responseJson.student_details.name,
//    Gender:responseJson.student_details.gender,
//    Dob:responseJson.student_details.dob,
//    Phone:responseJson.student_details.phone,
//    Image:responseJson.student_details.image,
  
//  })

// }
}
  

signup(){
  this.props.navigation.navigate('Signup')
}
  
  //// here starts UI Components

  render() {
    if (this.state.Success == true) {
      //AsyncStorage.clear();
      AsyncStorage.setItem('Tokenkey', this.state.Token.toString())
      AsyncStorage.setItem('Email', this.state.Email.toString())
      AsyncStorage.setItem('Name', this.state.Name.toString())
      AsyncStorage.setItem('Gender', this.state.Gender.toString())
      AsyncStorage.setItem('Dob', this.state.Dob.toString())
      AsyncStorage.setItem('Phone', this.state.Phone.toString())
      AsyncStorage.setItem('Image', this.state.Image.toString())
      //this.props.navigation.navigate('Home')
      this.props.navigation.navigate('DrawerNavigator')
    //alert(this.state.Name)
    }
   
    return (


      <View style={{backgroundColor:'white',height:hp('100%')}}>
 {/* <ImageBackground source={require('../../..//assets/Images/ecom4.jpeg')} style={{
    //flex: 1,
    resizeMode: "cover",
    //justifyContent: "center",
    height: hp('100%'),
    //width: wp('100%'),
  }}> */}
  <ImageBackground source={require('../../../assets/images/img3.png')} style={{
   //flex: 0,
   opacity:.9,
    resizeMode: "cover",
    justifyContent: "center",
    height: hp('100%'),
    width:wp('100%')
  }}>
    <View style={{justifyContent: "center",
            alignContent:'center',
            alignItems:'center',
           // width:'50%',
            height:'20%',
            }}>
        <Image
          style={{
            resizeMode: 'center',
            justifyContent: "center",
            alignContent:'center',
            alignItems:'center',
            width:'50%',
            
            //marginBottom: hp('5%'),
            //marginLeft:'1%',
            //marginVertical:'5%',
            //marginTop:hp('-20%'),

          }}
          source={require('../../../assets/images/img1.png')}
        />
</View>

        <View style={styles.containerss}>

          <View style={styles.SectionStyle}>
            {/* <Image
              source={require('../../..//assets/Images/mail.png')}
              style={styles.ImageStyle}
            /> */}
            <View>
            <Fontisto  name="email" color="white" size={26} />
            </View>
            
<View style={{ width: wp('75%') }}>
  
            <TextInput
             style={{  margin: hp('1%'),
             paddingLeft:'10%',
             borderRadius: 75,
             borderColor: 'white',
             borderWidth: 1,
             textAlign: 'left',
             backgroundColor: '#FFFFFF50',
             height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
              placeholder="Username"
              placeholderTextColor="white" 
              //underlineColorAndroid="white"
              onChangeText={this.handleUserName}
              value={this.state.UserName}
            />
            </View>
          </View>



          <View style={styles.SectionStyle}>
            {/* <Image
              source={require('../../..//assets/Images/plock.png')}
              style={styles.ImageStyle}
            /> */}
<View>
            <SimpleLineIcons  name="lock" color="white" size={26} />
            </View>

             <View style={{ width: wp('75%') }}>
            <TextInput
              secureTextEntry
              style={{  margin: hp('1%'),
              paddingLeft:'10%',
              borderRadius: 75,
              borderColor: 'white',
              borderWidth: 1,
              textAlign: 'left',
              backgroundColor: '#FFFFFF50',
              height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
              placeholder="Password"
              placeholderTextColor="white" 
              //underlineColorAndroid="white"
              onChangeText={this.handlePassword}
              value={this.state.Password}
            />
            </View>
          </View>


          

        </View>
        <View style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center',marginTop:hp('2%'),marginBottom: hp('1%'), }}>
          <Text style={{color:'red'}}>{this.state.errors}</Text>
        </View>

        <View style={{  marginTop: '2%',  
    width: wp('100%'),
    height: hp('2%'),
    //justifyContent: 'center',
    //alignItems: 'center',
    marginBottom: hp('1%') }}>
                <TouchableOpacity onPress={() => this.forgotpassword()}>
                    <Text style={{ textAlign: 'right',marginRight:'5%', color: "white", fontSize: 23}}>
                       Forgot Password?
                 </Text>
                </TouchableOpacity>
            </View>


            <View style={{paddingTop:"10%"}}>
                 <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%')
  }}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'yellow',
                                                opacity:.6,
                                                width: wp('75%'),
                                                height: hp('6%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.Login()}
                  >
                         <Text style={{
    fontSize: hp('3%'),
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }}> Login</Text>
                     </TouchableOpacity>
                 </View>
                 </View>

                 <View style={{paddingTop:"15%"}}>
                 <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%')
  }}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'black',
                                                opacity:.5,
                                                width: wp('75%'),
                                                height: hp('6%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.signup()}
                  >
                    <View style={{flexDirection:'row'}}>
  <View>
  <Text style={{color:'white'}}>Don't Have A Account?{' '}</Text>
    </View>                    

                    <View>
                       <Text style={{
    color: 'red',
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',}}>REGISTER HERE</Text>
                    </View>
                        
                         </View>
                     </TouchableOpacity>
                 </View>
                 </View>
        {/* <View style={{
          marginLeft:'10%',
    width:"80%", 
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:'3%',
  }} >
                  <View  style={styles.rowButtonWrap} >
                    <Button 
                    onPress={() => this.signup()}
                       title="SIGNUP"
                  
                       color="grey"
                       
                    />
                  </View>
              
                  <View style={styles.rowButtonWrap} >
                    <Button 
                      onPress={() => this.login()}
                      title="LOGIN"
                      color="red" 
                    />
                  </View>  
                </View> */}


        {/* <View style={{ flexDirection: 'row', marginTop: hp('-45%'), flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <View style={styles.loginstyle}>
            <TouchableOpacity onPress={() => this.login()}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 20 }}>
                LOGIN
            </Text>
            </TouchableOpacity>
          </View>



          <View style={styles.signupstyle}>
            <TouchableOpacity onPress={() => this.signup()}>        
              <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 20, marginTop: -2 }} >
                SIGN UP
            </Text>
            </TouchableOpacity>
            

          </View>

        </View> */}
        
       
                {/* </ImageBackground> */}
                </ImageBackground>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  containerss: {
    marginTop: hp('1%'),
    marginLeft: 59,
    marginRight: 50,
    marginBottom:hp('1%')
  },


  SectionStyle: {
    flexDirection: 'row',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',

    height: 40,
    margin: 15,

  },

  ImageStyle: {
    padding: 9,
    margin: 7,
    height: 1,
    width: 10,
    position: 'absolute',
    marginLeft: 5, backgroundColor: 'white'
  },


  loginstyle: {
    // justifyContent:'flex-end',
    margin: 10,
    color: 'white',
    // marginLeft: '15%',
    textAlign: 'center',
    // alignItems:'center',

    padding: 10,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    width: 120,

    transform: [
      { scaleX: 1 }
    ]

  },


  signupstyle: {
    color: 'black',
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: 'red',
    textAlign: 'center',
    padding: 10,
    height: 40,
    width: 120,
    backgroundColor: 'white',
    borderRadius: 20,

    margin: 10,

    transform: [
      { scaleX: 1 }
    ]
  },

  rowButtonContainer:{
    width:"90%", 
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:20
  },

  rowButtonWrap:{
    width:"45%"
  },
});