
import React from 'react';
import { StyleSheet,StatusBar,Image,Pressable, View,Text,Button, ActivityIndicator,ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {COLORS, HEIGHT, WIDTH} from './../constants';
import {backgroundImage, logo} from './../../assets/images';
const LanguageSwitchScreen = () => {
        return (
            
            <View style={{flex: 1}}>
            <StatusBar backgroundColor={COLORS.statusbar} />
            <ImageBackground
              style={{
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingHorizontal: WIDTH * 0.07,
              }}
              source={backgroundImage}
              resizeMode="cover">
               <View
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        height: '20%',
                    }}>
           <Image
                style={{width: WIDTH * 0.6, height: HEIGHT * 0.32}}
                source={logo}
                resizeMode="contain"
        />
        </View>
               
               <View style={{marginBottom:'-30%',marginTop:'-20%'}}>
                   <Text style={{color:'white',textAlign:'center',fontSize:25,fontWeight:'bold'}}>CHOOSE YOUR LANGUAGE</Text>
               </View>






               <View style={{flexDirection:'row'}}>

               <Pressable
          style={{
            height: HEIGHT * 0.08,
            alignSelf: 'stretch',
            borderTopLeftRadius: HEIGHT * 0.04,
            borderBottomLeftRadius: HEIGHT * 0.04,
            backgroundColor: COLORS.buttonYellow,
            alignItems: 'center',
            justifyContent: 'center',
            width:150
            //flexDirection: 'row',
          }}>
         
            <Text
              style={{color: COLORS.white, fontSize: 15, fontWeight: 'bold'}}>
              ENGLISH
            </Text>
          
        </Pressable>

        <Pressable
          style={{
            height: HEIGHT * 0.08,
            alignSelf: 'stretch',
            borderTopRightRadius: HEIGHT * 0.04,
            borderBottomRightRadius: HEIGHT * 0.04,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            width:150
            //flexDirection: 'row',
          }}>
         
            <Text
              style={{color:'black', fontSize: 15, fontWeight: 'bold'}}>
                   ARABIC     
            </Text>
          
        </Pressable>
               </View>
               {/* <View style={{flexDirection:'row',
    backgroundColor:'transparent',
    resizeMode:'cover',
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    borderRadius:75,
    borderWidth:1,
    height:null,paddingBottom:'0%',
    }}>
                   <View style={{width:'40%'}}>
                   <Button
                   style={{color:'yellow'}}
            title={'ENGLISH'}
            backgroundColor={'yellow'}
            color={'#ffd700'}
            //icon={{ name: 'face' }}
            onPress={() => this.Login()}
            
          />
                   </View>
                   <View style={{width:'40%'}}>
                   <Button
            title={'ARABIC'}
            backgroundColor={'green'}
            color={'grey'}
            //icon={{ name: 'face' }}
            //onPress={Actions.signUp}
          />
          </View>
               </View> */}
                </ImageBackground>
            </View>
              
            )
        
    }

    export default LanguageSwitchScreen;
