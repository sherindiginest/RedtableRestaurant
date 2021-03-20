import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,Dimensions,BackHandler,TextInput,TouchableOpacity } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class Settings extends React.Component {


    static navigationOptions = {
        title: '',
    };
      constructor(props) {
        super(props);
        this.state = {
            edit:'',
        }
        
      }
      ChangePassword()
      {
        this.props.navigation.navigate('ResetPassword')
      }

    EditProfile()
      {
        this.props.navigation.navigate('EditProfile')
      }
      ManageAddress()
      {
        this.props.navigation.navigate('ManageAddress')
      }

      back()
      {
          this.props.navigation.navigate('Home')
      }

render(){
    return(
        <View style={{backgroundColor:'white',}}>
       <View style={{flexDirection:'row',justifyContent: 'space-between',paddingRight:'50%',paddingBottom:'5%'}}>
                        <View style={{alignItems:'flex-start',paddingLeft:'10%',marginTop:'2%'}}>
                        <TouchableOpacity onPress={() => this.back()}>
                                        <AntIcon   name="left" size={30} color='black' />
                                        </TouchableOpacity>
                                        </View>
                                <View >
                                        <Text  style={{fontSize:30}} >Settings 
                                        </Text>
                                        </View>
                                        
                                        </View>
                                        <View style={{backgroundColor:'#f0f8ff',width:'100%',paddingLeft:'10%'}}>
                                        <View style={{ width: wp('93%') }}>

<TextInput 
   
    value={this.state.edit}
    underlineColorAndroid='transparent' placeholder='Account'
    placeholderTextColor="#c4c3cb"
    
   
/>

</View>

                                        </View>

                                        <View style={{paddingTop:'7%',paddingBottom:'7%'}}>
                                        <View style={{flexDirection:'row',justifyContent: 'space-between',paddingTop:'5%',paddingRight:'10%'}}>
                        
                       
                                <View style={{paddingRight:'38%'}}>
                                <TouchableOpacity onPress={() => this.EditProfile()}>
                                    <Text style={{fontFamily: 'MONTSERRAT',
        fontSize: 20,
        //color: '#222222',
        color: 'black',
        paddingLeft:'20%'}} >Edit Profile  
                                        </Text>
                                        </TouchableOpacity>
                                        </View>
                                        <View style={{alignItems:'flex-end',paddingLeft:'20%'}}>
                                        <AntIcon   name="right" size={20} color='grey' />
                                        </View>
                                        
                        
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />


                                        <View style={{flexDirection:'row',justifyContent: 'space-between',paddingTop:'5%',paddingRight:'10%'}}>
                        
                       
                        <View style={{paddingRight:'40%'}}>
                        <TouchableOpacity onPress={() => this.ManageAddress()}>
                            <Text style={{fontFamily: 'MONTSERRAT',
fontSize: 20,
//color: '#222222',
color: 'black',
paddingLeft:'20%'}} >Manage Address 
                                </Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{alignItems:'flex-end',paddingLeft:'3%'}}>
                                <AntIcon   name="right" size={20} color='grey' />
                                </View>
                                
                
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />
                                <View style={{flexDirection:'row',justifyContent: 'space-between',paddingTop:'5%',paddingRight:'10%'}}>
                        
                       
                                <View style={{paddingRight:'40%'}}>
                                <TouchableOpacity onPress={() => this.ChangePassword()}>
                                    <Text style={{fontFamily: 'MONTSERRAT',
        fontSize: 20,
        //color: '#222222',
        color: 'black',
        paddingLeft:'20%'}} >Change Password 
                                        </Text>
                                        </TouchableOpacity>
                                        </View>
                                        <View style={{alignItems:'flex-end',paddingLeft:'0%'}}>
                                        <AntIcon   name="right" size={20} color='grey' />
                                        </View>
                                        
                        
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />
                                        </View>
      </View>
    );
}




}