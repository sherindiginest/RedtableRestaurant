
import React from 'react';
import { StyleSheet, Image, View,Text,Button, ActivityIndicator,ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class LanguageSwitch extends React.Component
{
    constructor(props) {
        super(props);

        
    }
    async   componentDidMount() {
       

       
    }
    
    Login(){
        this.props.navigation.navigate('Login')
    }
    render()
    {
        
       

        return (
            
            <View style={{ flex: 0 }}>
<ImageBackground source={require('../../../assets/images/img3.png')} style={{
   //flex: 0,
    resizeMode: "cover",
    justifyContent: "center",
    height: hp('100%'),
    width:wp('100%')
  }}>
                <Image
                    style={{
                        resizeMode:'center',
                        
                        width: wp('100%'),
                        height: hp(50),
                        marginBottom: '-15%',
                        marginTop:'10%',
                    }}
                    
                    source={require('../../../assets/images/img1.png')} />
               
               <View style={{marginBottom:'3%',marginTop:'10%'}}>
                   <Text style={{color:'white',textAlign:'center',fontSize:30}}>CHOOSE YOUR LANGUAGE</Text>
               </View>
               <View style={{flexDirection:'row',
    backgroundColor:'transparent',
    resizeMode:'cover',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:null,paddingBottom:'40%',
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
               </View>
                </ImageBackground>
            </View>
              
            )
        
    }
}

