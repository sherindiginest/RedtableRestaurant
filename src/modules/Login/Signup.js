
import React, { Component } from 'react';
import { View, Text, Picker, Image, TouchableOpacity, StyleSheet,BackHandler
  ,Platform,  TextInput, AsyncStorage,Switch,ImageBackground } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../../styles/common';
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Dialog, { DialogFooter, ScaleAnimation, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { ScrollView } from 'react-native-gesture-handler';
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
var isalphebet=0, isdigit=0, isspecial=0;
const today = new Date(); 
export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
    FirstName:'',
    LastName: '',
    DateofBirth:'',
    GenderType: [{ "id": 1, "name": "Male" }, { "id": 2, "name": "Female" }],
    GenderName: '',
    ContactNumber1:'',
    Address:'',
    UserName: '',  
    Password: '',
    NewPassword:'',
    ConfirmPassword:'',
    Invalid: '',
    errors: '',
    islogged:false,
    ErrorPopup:false,
    ErrorMessage:'',
    SubmitSuccess:false,
    ErrorOldPassword:'',
    ErrorNewPassword:'',
    ErrorConfirmPassword:'',
    SuccessPopup:false,
    SuccessMessage:'',
    EmailId: '',
    SuccessPopup:false,
    CourseType:[],
    Course:'',

      //r:false
     
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }



 
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    AsyncStorage.setItem('ScreenName','Signup')
    this.GetCourse();
        
  }
  async handleBackButtonClick() {
    var screenName = await AsyncStorage.getItem("ScreenName");
    if (screenName =='Signup') {
        this.props.navigation.navigate('Login')
    }
}
componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        
       }
  selectionChange(item, name) {

    this.setState({ [name]: item });
   

    
}
  //Function to change text
  handleChange(text,name)
  {
      this.setState({[name]:text});
  }

  handlePassword = (text) => {      //Password function declaration
    //var temp2 = Base64.encode(this.state.Password);   //declaring a variable to encode the user password
    this.setState({ NewPassword: text })
  }

  //function for close the ErrorMessge dialog box
  async handleErrorMessage()
  {
     this.setState({ErrorPopup:false});
 
  };
 
//function for close the dialog box for warning message 
async handleWarning() {
    this.setState({ ErrorPopup: false })
}
//function for course
async GetCourse() {

    let tok=this.state.UserToken
    
    let response = await fetch('http://mastermindias.smartipz.com/token/user_api/get_course',{
        method: 'POST',
        headers: {
           
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({
            
        })
    }
    );
    
    let responseJson = await response.json();
    this.setState({
        CourseType: eval(responseJson),
    
    })
    }
 //Function to Validation
 async Submit()
 {
    if (this.state.FirstName == '') {
        this.setState({ ErrorPopup: true, ErrorMessage: "Enter The First Name And Continue" });
        return
    }
    
     if(this.state.NewPassword=='')
     {
         this.setState({ErrorPopup:true,ErrorMessage:'Please Enter Your New Password'})
         
         return;
     }
     if(this.state.ConfirmPassword=='')
     {
         this.setState({ErrorPopup:true,ErrorMessage:'Please Enter Your Confirm Password'})
        
         return;
     }
     if(this.state.NewPassword != this.state.ConfirmPassword)
     {
         this.setState({ErrorPopup:true,ErrorMessage:'New Password And Confrim Password Must Be Same'})
         return;
     }
     
     

     
     var regex2= /[a-zA-Z]/;
         if(regex2.test(this.state.NewPassword) == false) {
             isalphebet=1;
             this.setState({ErrorPopup:true,ErrorMessage:'Password Must Contain atleast One Uppercase Alphabet or One Lowercase Alphabet'})
             
             return;
         }else{
             isalphebet=0;
         }
         var regex = /[^\w\s]/gi;
         if(regex.test(this.state.NewPassword) == false) {
             isspecial=1;
             this.setState({ErrorPopup:true,ErrorMessage:'Password Must Contain atleast 1 special Character'})
             
             return;
         }else{
             isspecial=0;
         }
         var regex1 = /\d/g;
         if(regex1.test(this.state.NewPassword) == false) {
             isdigit=1;
             this.setState({ErrorPopup:true,ErrorMessage:'Password Must Contain atleast 1 Number',loading:false})
            
             return;
         }else{
             isdigit=0;
         }
     if(this.state.NewPassword .length  < 6)  // to check the password condition
     {
       this.setState({ErrorPopup:true,ErrorMessage:'Password is too small try atleast 6 characters'})
      return;
     }
    

     let response = await fetch('http://mastermindias.smartipz.com/token/user_api/register', {
        method: 'POST',
        headers: {
             
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
            
            email: this.state.EmailId,
            first_name:this.state.FirstName,
            last_name:this.state.LastName,
            phone :this.state.ContactNumber1,
            gender: this.state.GenderName,
            course_id:this.state.Course,
            dob:this.state.DateofBirth,
            address:this.state.Address,
            password:this.state.NewPassword,

        })
      }
      );
      
      let responseJson = await response.json();
      alert(JSON.stringify(responseJson))
      if(responseJson.message=="Successfully registered.")
      this.setState({
          SuccessPopup:true,
          SuccessMessage:"Registration Successfull",
          FirstName:'',
    LastName: '',
    DateofBirth:'',
    //GenderType: [{ "id": 1, "name": "Male" }, { "id": 2, "name": "Female" }],
    GenderName: '',
    ContactNumber1:'',
    Address:'',
    UserName: '',  
    Password: '',
    NewPassword:'',
    ConfirmPassword:'',
    CourseType:[],
    Course:'',
    GenderType:[],
      })


 }
  
//function for close the Success dialog
handleSuccessMessage = () => {
    this.setState({ SuccessPopup: false });
    this.props.navigation.navigate('Login')
   
};


login()
{
    this.props.navigation.navigate('Login')
}
  //// here starts UI Components

  render(){
        
    return(

      <View style={{ flex: 0 }}>
         
         <ImageBackground source={require('../../../assets/images/img3.png')} style={{
   //flex: 0,
    resizeMode: "cover",
    justifyContent: "center",
    height:'100%',
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
            marginTop:hp('15%'),

          }}
          source={require('../../../assets/images/img1.png')}
        />
        
</View>
<ScrollView>
          <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'),marginTop:hp('10%') }}>
          

                                                    {/* FirstName */}
                                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>
                                            
                                            
                                                    <View>
            <AntIcon  name="user" color="white" size={26} />
            </View>
                                                <View style={{ width: wp('75%') }}>

                                                    <TextInput style={{  margin: hp('1%'),
                                                                        paddingLeft:'10%',
                                                                        borderRadius: 75,
                                                                        borderColor: 'white',
                                                                        borderWidth: 1,
                                                                        textAlign: 'left',
                                                                        backgroundColor: '#FFFFFF50',
                                                                        height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
                                                       
                                                        value={this.state.FirstName}
                                                        underlineColorAndroid='transparent' placeholder='Enter  Name '
                                                        placeholderTextColor="#c4c3cb"
                                                      
                                                        onChangeText={(text) => this.handleChange(text, 'FirstName')}
                                                    />

                                                </View>

                                           
                                        </View>
                                       
                                       
                                   {/* Text field for Email Id */}
                                   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>
                                      
                                   <View>
            <Fontisto  name="email" color="white" size={26} />
            </View>      

                                                <View style={{ width: wp('75%') }}>
                                                    <TextInput style={{  margin: hp('1%'),
                                                                        paddingLeft:'10%',
                                                                        borderRadius: 75,
                                                                        borderColor: 'white',
                                                                        borderWidth: 1,
                                                                        textAlign: 'left',
                                                                        backgroundColor: '#FFFFFF50',
                                                                        height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
                                                        value={this.state.EmailId}
                                                        underlineColorAndroid='transparent' placeholder='Enter the Email Id here'
                                                        placeholderTextColor="#c4c3cb"
                                                        onChangeText={(text) => this.handleChange(text, 'EmailId')}
                                                    />


                                                </View>
                                            
                                        </View>  

{/* Text field Mobile Number */}
<View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>
                                            
<FontAwesome  name="phone" color="white" size={26} />
                                                <View style={{ width: wp('75%') }}>

                                                    <TextInput style={{  margin: hp('1%'),
                                                                        paddingLeft:'10%',
                                                                        borderRadius: 75,
                                                                        borderColor: 'white',
                                                                        borderWidth: 1,
                                                                        textAlign: 'left',
                                                                        backgroundColor: '#FFFFFF50',
                                                                        height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
                                                        value={this.state.ContactNumber1}
                                                        keyboardType='numeric'
                                                        maxLength={10}
                                                        underlineColorAndroid='transparent' placeholder='Enter  Mobile Number '
                                                        placeholderTextColor="#c4c3cb"
                                                        onChangeText={(text) => this.handleChange(text, 'ContactNumber1')}
                                                    />

                                                </View>
                                           
                                        </View>


              {/* ..........................New Password.......................... */}
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
         <View>
            <SimpleLineIcons  name="lock" color="white" size={26} />
            </View>
             <View style={{width:wp('75%')}}>
                 <TextInput style={{  margin: hp('1%'),
                                    paddingLeft:'10%',
                                    borderRadius: 75,
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    textAlign: 'left',
                                    backgroundColor: '#FFFFFF50',
                                    height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
                 secureTextEntry
                 value={this.state.NewPassword}
                 underlineColorAndroid='transparent'
                 placeholder='Enter  Password here..'
                 placeholderTextColor="#c4c3cb"
                 onChangeText={(text)=>this.handlePassword(text,'NewPassword')}
                 />
                 
             </View>
            
         </View>


              {/* ..........................Submit Button........................... */}
         <View style={{paddingTop:"3%"}}>
                 <View style={styles.SubmitButtonCont}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'yellow',
                                                opacity:.6,
                                                width: wp('75%'),
                                                height: hp('7%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.Submit()}
                  >
                         <Text style={styles.SubmitButtonText}> Submit</Text>
                     </TouchableOpacity>
                 </View>
                 </View>
                 <View style={{paddingTop:"5%"}}>
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
                     onPress={()=>this.login()}
                  >
                    <View style={{flexDirection:'row'}}>
  <View>
  <Text style={{color:'white'}}>Already Have A Account?{' '}</Text>
    </View>                    

                    <View>
                       <Text style={{
    color: '#7fff00',
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',fontSize:20}}>LOGIN</Text>
                    </View>
                        
                         </View>
                     </TouchableOpacity>
                 </View>
                 </View>
                 {/* Warning Message  */}
                                <View>
                                        <Dialog
                                            width={wp('80%')}
                                            visible={this.state.ErrorPopup}

                                            dialogAnimation={new ScaleAnimation({
                                                initialValue: 0,
                                                useNativeDriver: true,
                                            })}

                                            footer={
                                                <DialogFooter>
                                                    <DialogButton
                                                        bordered={false}
                                                        text="OK"
                                                        textStyle={{ color: "green" }}
                                                        onPress={() => this.handleWarning()}
                                                    />

                                                </DialogFooter>
                                            }
                                            onTouchOutside={() => {
                                                this.setState({ ErrorPopup: false });
                                            }}>
                                            <DialogContent>
                                                <View style={{ alignItems: "center", paddingTop: "3%" }}><AntIcon name="infocirlceo" color="#dea814" size={50}></AntIcon></View>
                                                <View>
                                                    <Text style={{ textAlign: 'center', marginTop: hp('2.6%'), fontSize: hp('4%') }}>Warning</Text>
                                                    <Text style={{ textAlign: 'center', marginTop: hp('2.6%'), fontSize: 18 }}>{this.state.ErrorMessage}</Text>
                                                </View>
                                            </DialogContent>
                                        </Dialog>
                                    </View>
             {/* ...................PopUp DialogBox for SuccessMessage................*/}
                 <View>
                  <Dialog
                  width={wp('80%')}
                  visible={this.state.SuccessPopup}

                  dialogAnimation={new ScaleAnimation({
                      initialValue: 0,
                      useNativeDriver: true,
                  })}

                  footer={
                      <DialogFooter>
                          <DialogButton
                          bordered={false}
                          text="OK"
                          textStyle={{ color: "green" }}
                          onPress={() => this.handleSuccessMessage()}
                          />
                      </DialogFooter>
                  }

                  onTouchOutside={() =>{
                      this.setState({SuccessPopup:false});
                  }}>
                      <DialogContent>
                      <View style={{ alignItems: "center", paddingTop: "3%" }}><AntIcon name="checkcircleo" color="green" size={40}></AntIcon></View>
                      <View>
                          <Text style={{ textAlign: 'center', marginTop: hp('2.6%'), fontSize: hp('3%') }}>{this.state.SuccessMessage}</Text>
                          </View>
                      </DialogContent>
                  </Dialog>
                  </View>

              {/* ...............PopUp DialogBox for ErrorMessage............... */}

                  
         </View>
         </ScrollView>
         </ImageBackground>
      </View>
    );
}
}


