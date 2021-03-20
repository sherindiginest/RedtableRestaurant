
import React from 'react';
import { View, Image, Text, TextInput,ImageBackground , TouchableOpacity, AsyncStorage , BackHandler} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog, { DialogFooter, ScaleAnimation, DialogButton, DialogContent } from 'react-native-popup-dialog';
import AntIcon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
//import ErrorDialog from '../../components/ErrorDialogbox';
//import SuccessDialog from '../../components/SuccessDialogbox';
import styles from '../../styles/common';

// import Loader from '../../components/Loader';
// import { Base64 } from 'js-base64';
var appid = '';// to store database id
var sFlag = '';
var isalphebet=0, isdigit=0, isspecial=0;       //Sherin 18-08-2020
export default class ForgetPassword extends React.Component
{
    static navigationOptions = {
        title: 'Forgot Password ',
    };
    constructor(props) {
        super(props)
        this.state = {
            ErrorMessage: '', UserData: '', access_level: '', Fullname: '', EmailId: '', Code: '', CompanyId: '', Companymailid: '', Message: '',
            loading: true, Page: 0,
            UserCode: '',//to store verification code
            Password: '',
            ConPassword: '',//confrom password
            UserName: '',
            UserId: '',
            Popup: false,
            SuccessMessage: '',
            ErrorPopup: false,
            OTP1:'',
            OTP2:'',
            OTP3:'',
            OTP4:'',
           
           
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AsyncStorage.setItem('ScreenName', this.props.navigation.state.routeName.toString())
        appid = await AsyncStorage.getItem('AppId');//store database id
       

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
    // to close the  popup when click on back                       
    async handleBackButtonClick() {
        var screenName = await AsyncStorage.getItem("ScreenName");

        if (screenName == "ForgetPassword" && this.state.PopupVisible == true || this.state.ErrorPopup == true || this.state.Popup == true) {
            this.setState({
                PopupVisible: false, ErrorPopup: false, Popup: false
            })
        }
        else {
            this.props.navigation.goBack(null);

        }
        return true;
    }
    //Loader
    setLoaderTimeout() {
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 2500);
    }
    //function for close the dialog box for warning message 
    async handleWarning() {
        this.setState({ ErrorPopup: false })
    }
    //handle SuccessMessage and goto loginpage
    handleOK = () => {
        this.setState({Popup: false });
        if(this.state.Page==2)
        {

       
        this.props.navigation.navigate('Login')
    }
    }
   
    //function for validation
    async validation() {
        if (this.state.Page == 0)
        {
            if (this.state.UserData == '')
            {
                this.setState({ ErrorPopup:true,ErrorMessage: 'Enter Your Email id or Username ' })
                
                return;
            }
        }
        if (this.state.Page == 1)
        {
            if (this.state.UserCode == '')
            {
                this.setState({ ErrorPopup: true,ErrorMessage: 'Enter your confrimation code and continue ' })
               
                return;
            }
            else
            {
               
              
                if (this.state.Code != this.state.UserCode)
                {
                    this.setState({ ErrorPopup: true, ErrorMessage: 'Verification code is mismatched ' })
                  
                    return;
                }
                else {
                    this.setState({ Page: 2 })
                }
            }
        }
        if(this.state.Page == 2)
        {
            sFlag = 0;
            if (this.state.Password == '' || this.state.ConPassword == '')
            {

                this.setState({ ErrorPopup: true,ErrorMessage: 'Please enter mandatory fields ' })
                sFlag = 1;
                
                return;
               
            }
            if (this.state.Password != this.state.ConPassword)
            {
                this.setState({ ErrorPopup: true,ErrorMessage: 'New password and confirm password must be same ' })
                sFlag = 1;
                
                return;
            }

             /*--------------------- Sherin 17-08-2020 -----------------------*/
        var regex2= /[a-zA-Z]/;
        if(regex2.test(this.state.Password) == false) {
          isalphebet=1;
            this.setState({ ErrorPopup: true,ErrorMessage:'Password must contain atleast one uppercase alphabet or one lowercase alphabet',loading:false})
          
          return;
        }else{
          isalphebet=0;
        }
        var regex = /[^\w\s]/gi;
        if(regex.test(this.state.Password) == false) {
          isspecial=1;
            this.setState({ ErrorPopup: true,ErrorMessage:'Password Must contain atleast 1 special nharacter',loading:false})
         
          return;
        }else{
          isspecial=0;
        }
        var regex1 = /\d/g;
        if(regex1.test(this.state.Password) == false) {
          isdigit=1;
            this.setState({ ErrorPopup: true,ErrorMessage:'Password must contain atleast 1 number',loading:false})
          
          return;
        }else{
          isdigit=0;
        }
        /*----------------------------------------------------------------*/

            if (this.state.Password.length < 6)  
            {
                this.setState({ ErrorPopup: true, ErrorMessage: 'Password is too small try atleast 6 characters' })
                sFlag = 1;
                
                return;
            }
        }
    }
    //function for handle login
    async handlecancel() {
        this.props.navigation.navigate('Login')
    }
    //function for handle clear code
    async clear() {
        this.setState({ UserCode: '' })
    }
    //function for handle code submit
    async submitcode()
    {
        this.validation();

    }
    
    ////function for handle new password submit
    async submitpassword()
    {

        this.validation();
       
        if (sFlag == 0 && this.state.sFlag!='' && isalphebet ==0 && isdigit ==0 && isspecial ==0)//modified by sherin on 17-08-2020
        {
             var Pswencode = Base64.encode(this.state.Password); // encoded password
             this.setState({loading:true});
             let response = await fetch(
                    Apipost.PasswordReset, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',

                        },

                        body: JSON.stringify({
                            strSessionID: '',
                            strJsonData: JSON.stringify({
                                password: Pswencode,
                                updated_by: this.state.UserId,
                                updated_date: new Date()

                            }),
                            strCondition: 'where user_id=' + this.state.UserId, //userid
                            iAppID: appid
                        }),

                    });
                let responseJson = await response.json();
               this.SendMail();
            
            
        }
    }
    //Generate RandomCode
    async randomcode() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i <4; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        this.setState({ Code: text }); // to set the code

    }
    //function for hadle  verfication code 
    async handlesubmit() {
        //this.validation();
        this.setState({
            Page:1
        });


    }
   
    //text input handle change fn
    handleChange(text, name) {

        this.setState({
            [name]: text
        });

    };


    render() {
        return (
            <View>
                <ImageBackground source={require('../../../assets/images/img3.png')} style={{
   //flex: 0,
   opacity:.9,
    resizeMode: "cover",
    justifyContent: "center",
    height: hp('100%'),
    width:wp('100%')
  }}>
               {/* <View style={{
                    justifyContent: "center",
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
                    
                </View> */}
                {/*..........................................Main page start  ................................*/}
                {this.state.Page == 0 &&
                    (
                    <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: wp('3%') }}>{/*modified by sherin on 01-08-2020*/}
                   
                   <View style={{flexWrap:'wrap',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'white',fontSize:20,flexWrap:'wrap',textAlign:'center'}}>Enter your email and will send </Text>
    </View>
    <View style={{flexWrap:'wrap',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'white',fontSize:20,flexWrap:'wrap',textAlign:'center'}}> you instructions on how to reset it</Text>
    </View>

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
                                                        underlineColorAndroid='transparent' placeholder=' Email'
                                                        placeholderTextColor="#c4c3cb"
                                                        onChangeText={(text) => this.handleChange(text, 'UserData')}
                                                    />


                                                </View>
                                            
                                        </View> 

                                        <View style={{paddingTop:"10%"}}>
                 <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%'),
    marginLeft: wp('4%'),
  }}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'yellow',
                                                opacity:.6,
                                                width: wp('73%'),
                                                height: hp('6%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.handlesubmit()}
                  >
                         <Text style={{
    fontSize: hp('3%'),
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }}> SEND</Text>
                     </TouchableOpacity>
                 </View>
                 </View>
                        
                        <View style={{paddingTop:"15%"}}>
                 <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%'),
    marginLeft: wp('4%'),
  }}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'black',
                                                opacity:.5,
                                                width: wp('73%'),
                                                height: hp('6%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.handlecancel()}
                  >
                   
  <View>
  <Text style={{color:'white'}}>Cancel</Text>
    </View>                    
                        
                         
                     </TouchableOpacity>
                 </View>
                 </View>


                    </View>
                    )}
                {/*..........................................Main page  end  ................................*/}
                {/*..........................................Confrom code page start ................................*/}
                {this.state.Page == 1 &&
                    (
                    <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: wp('1%') }}>{/*modified by sherin on 01-08-2020*/}
                     
                     <View style={{flexWrap:'wrap',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'white',fontSize:20,flexWrap:'wrap',textAlign:'center',fontWeight:'bold'}}>We have send an OTP to </Text>
    </View>
    <View style={{flexWrap:'wrap',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'white',fontSize:20,flexWrap:'wrap',textAlign:'center',fontWeight:'bold'}}> Your Mobile</Text>
    </View>
                     
                     <View style={{flexDirection:'row',alignContent:'center',justifyContent:'center',alignItems:'center'}}>

                     <View style={{ width: wp('15%') }}>

<TextInput style={{  margin: hp('1%'),
                    paddingLeft:'10%',
                    //borderRadius: 75,
                    borderColor: 'white',
                    borderWidth: 1,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
   
    value={this.state.FirstName}
    underlineColorAndroid='transparent' placeholder='* '
    placeholderTextColor="#c4c3cb"
  
    onChangeText={(text) => this.handleChange(text, 'OTP1')}
/>

</View>

<View style={{ width: wp('15%') }}>

<TextInput style={{  margin: hp('1%'),
                    paddingLeft:'10%',
                    //borderRadius: 75,
                    borderColor: 'white',
                    borderWidth: 1,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
   
    value={this.state.FirstName}
    underlineColorAndroid='transparent' placeholder='* '
    placeholderTextColor="#c4c3cb"
  
    onChangeText={(text) => this.handleChange(text, 'OTP2')}
/>

</View>
<View style={{ width: wp('15%') }}>

<TextInput style={{  margin: hp('1%'),
                    paddingLeft:'10%',
                    //borderRadius: 75,
                    borderColor: 'white',
                    borderWidth: 1,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
   
    value={this.state.FirstName}
    underlineColorAndroid='transparent' placeholder='* '
    placeholderTextColor="#c4c3cb"
  
    onChangeText={(text) => this.handleChange(text, 'OTP3')}
/>

</View>
<View style={{ width: wp('15%') }}>

<TextInput style={{  margin: hp('1%'),
                    paddingLeft:'10%',
                    //borderRadius: 75,
                    borderColor: 'white',
                    borderWidth: 1,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
   
    value={this.state.FirstName}
    underlineColorAndroid='transparent' placeholder='* '
    placeholderTextColor="#c4c3cb"
  
    onChangeText={(text) => this.handleChange(text, 'OTP4')}
/>

</View>


                     </View>
                     
                     <View style={{paddingTop:"10%"}}>
                 <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%'),
    marginLeft: wp('4%'),
  }}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'yellow',
                                                opacity:.6,
                                                width: wp('73%'),
                                                height: hp('6%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.handlesubmit()}
                  >
                         <Text style={{
    fontSize: hp('3%'),
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }}> SEND</Text>
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
                                                backgroundColor: '',
                                                
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
  <Text style={{color:'white'}}>Didn't Recieve?{' '}</Text>
    </View>                    

                    <View>
                       <Text style={{
    color: '#7cfc00',
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',}}>Click Here</Text>
                    </View>
                        
                         </View>
                     </TouchableOpacity>
                 </View>
                 </View>  
                       
                    </View>
                    )}
                {/*..........................................Confrom code end  ................................*/}
                {/*..........................................new password page start ................................*/}
                {this.state.Page == 2 &&
                    (
                        <View style={{ marginLeft: wp('3%'), marginRight: wp('3%'), marginTop: wp('3%') }}>{/*modified by sherin on 01-08-2020*/}
                            <View style={{ paddingLeft: "2%", flexDirection: "row" }}>
                                <View><Text>New Password</Text></View>
                                <View><Text style={{ color: "red" }}>*</Text></View>
                            </View>

                            <View style={styles.ComponentContainerStyle}>

                                <View style={{ width: wp('93%') }}>

                                <TextInput style={styles.TextInputStyle}
                                    secureTextEntry
                                        value={this.state.Password}
                                        underlineColorAndroid='transparent' placeholder='Enter New Password'
                                        placeholderTextColor="#c4c3cb"
                                        onChangeText={(text) => this.handleChange(text, 'Password')}
                                    />

                                </View>

                        </View>
                        <View style={{ paddingLeft: "2%", flexDirection: "row" }}>
                            <View><Text>Confirm Password</Text></View>
                            <View><Text style={{ color: "red" }}>*</Text></View>
                        </View>

                        <View style={styles.ComponentContainerStyle}>

                            <View style={{ width: wp('93%') }}>

                                <TextInput style={styles.TextInputStyle}
                                    secureTextEntry
                                    value={this.state.ConPassword}
                                    underlineColorAndroid='transparent' placeholder='Confirm Password'
                                    placeholderTextColor="#c4c3cb"
                                    onChangeText={(text) => this.handleChange(text, 'ConPassword')}
                                />

                            </View>

                        </View>
                            <View style={{ paddingTop: "15%" }}>
                                <View style={styles.SubmitButtonCont}>
                                    <TouchableOpacity style={styles.SubmitButton} onPress={() => this.submitpassword()} >
                                        <Text style={styles.SubmitButtonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                    )}
                {/*.......................................... new password page end ................................*/}
                
                {/* .............................Warning Message................................... */}

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

                                <Text style={{ textAlign: 'center', marginTop: hp('2.6%'), fontSize: 18 }}>{this.state.ErrorMessage}</Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>

                {/* <View>
                    <SuccessDialog message={this.state.Message} ref={ref => (this.sRef = ref)} />
                </View> */}
                {/*.......................................... msg end here................................*/}
                {/*.......................................... success popup ................................*/}
                <View>
                    <Dialog
                        width={wp('80%')}
                        visible={this.state.Popup}

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
                                    onPress={() => this.handleOK()}
                                />
                            </DialogFooter>
                        }

                        onTouchOutside={() => {
                            this.setState({ Popup: false });
                        }}>
                        <DialogContent>
                            <View style={{ alignItems: "center", paddingTop: "3%" }}>
                                <AntIcon name="checkcircleo" color="green" size={40}></AntIcon>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'center', marginTop: hp('2.6%'), fontSize: hp('3%') }}>{this.state.SuccessMessage}</Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>
                {/*.......................................... success popup end ................................*/}
                </ImageBackground>

            </View>
         );
    }
}
