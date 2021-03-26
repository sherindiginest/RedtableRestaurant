
import React, { Component } from 'react';
import { View,ImageBackground, Text, Image, TouchableOpacity, StyleSheet,BackHandler
  ,Platform,  TextInput, AsyncStorage,Switch ,Button} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import BackgroundImage from '../components/BackgroundImage';




export default function LoginScreen() {
  return (
    <View style={{backgroundColor:'white',height:hp('100%')}}>
    
     <ImageBackground source={require('../../assets/images/s2.png')} 
     style={{
            opacity:.9,
            resizeMode:'cover',
            justifyContent: "center",
            height: hp('100%'),
            width:wp('100%')
     }}>
       <View style={{
                    justifyContent: "center",
                    alignContent:'center',
                    alignItems:'center',
                    height:'20%',
                   }}>
           <Image style={{
                        resizeMode: 'center',
                        justifyContent: "center",
                        alignContent:'center',
                        alignItems:'center',
                        width:'50%',
                        }}
             source={require('../../assets/images/img1.png')}
           />
   </View>
   
           <View style={styles.containerss}>
   
             <View style={styles.SectionStyle}>
          
               <View>
               <Fontisto  name="email" color="white" size={26} />
               </View>
               
   <View style={{ width: wp('60%') }}>
     
               <TextInput
                style={{  margin: hp('1%'),
                textAlign: 'left',
                height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
                 placeholder="Username"
                 placeholderTextColor="white" 
                 //underlineColorAndroid="white"
                 //onChangeText={this.handleUserName}
                 //value={this.state.UserName}
               />
               </View>
             </View>
   
   
   
             <View style={styles.SectionStyle}>
              
   <View>
               <SimpleLineIcons  name="lock" color="white" size={26} />
               </View>
   
                <View style={{ width: wp('60%') }}>
               <TextInput
                 secureTextEntry
                 style={{  margin: hp('1%'),
                 textAlign: 'left',
                 height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
                 placeholder="Password"
                 placeholderTextColor="white" 
                 //underlineColorAndroid="white"
                 //onChangeText={this.handlePassword}
                 //value={this.state.Password}
               />
               </View>
             </View>
   
   
             
   
           </View>
           <View style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center',marginTop:hp('2%'),marginBottom: hp('1%'), }}>
             <Text style={{color:'red'}}>{''}</Text>
           </View>
   
           <View style={{  
                        marginTop: '2%',  
                        width: wp('100%'),
                        height: hp('2%'),     
                        marginBottom: hp('1%') 
                        }}>
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
                                    paddingLeft:'5%',
                                    paddingTop: hp('1%')
                                 }}>
                        <TouchableOpacity style={{
                                                   backgroundColor: 'yellow',
                                                   opacity:.6,
                                                   width: wp('75%'),
                                                   height: hp('6.5%'),
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
                                    paddingLeft:'5%',
                                    paddingTop: hp('1%')
                                }}>
                        <TouchableOpacity style={{
                                                   backgroundColor: 'black',
                                                   opacity:.5,
                                                   width: wp('75%'),
                                                   height: hp('6.5%'),
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
                                        alignItems: 'center',
                                       }}
                          >REGISTER HERE</Text>
                       </View>
                           
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
         
                   </ImageBackground>
         </View>
  );
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

    height: 50,
    margin: 15,
    width:'100%',
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#FFFFFF50',

  },

});