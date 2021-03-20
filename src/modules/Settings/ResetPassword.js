import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,Dimensions,BackHandler,TextInput,TouchableOpacity } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from '../../styles/common';
export default class ResetPassword extends React.Component {


    static navigationOptions = {
        title: '',
    };
      constructor(props) {
        super(props);
        this.state = {
            edit:'',
        }
        
      }


    back()
    {
        this.props.navigation.navigate('Settings')
    } 


render(){
    return(
        <View style={{backgroundColor:'white',height:'100%'}}>
       <View style={{flexDirection:'row',justifyContent: 'space-between',paddingRight:'30%',paddingBottom:'5%',marginTop:'10%'}}>
         
                        <View style={{alignItems:'flex-start',paddingLeft:'10%',marginTop:'1%'}}>
                        <TouchableOpacity onPress={() => this.back()}>
                                        <AntIcon   name="left" size={27} color='black' />
                                        </TouchableOpacity>
                                        </View>
                                <View >
                                        <Text  style={{fontSize:25}} >Change Password 
                                        </Text>
                                        </View>
                                        
                                        </View>


        {/* ..........................Current Password.......................... */}
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
<View>
   <SimpleLineIcons  name="lock" color="#c4c3cb" size={26} />
   </View>
    <View style={{width:wp('75%')}}>
        <TextInput style={{  margin: hp('1%'),
                           paddingLeft:'10%',
                           borderRadius: 75,
                           borderColor: '#c4c3cb',
                           borderWidth: 1,
                           textAlign: 'left',
                           backgroundColor: '#FFFFFF50',
                           height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
        secureTextEntry
        value={this.state.CurrentPassword}
        underlineColorAndroid='transparent'
        placeholder='Current Password'
        placeholderTextColor="#c4c3cb"
        onChangeText={(text)=>this.handlePassword(text,'CurrentPassword')}
        />
        
    </View>
   
</View>


{/* ..........................New Password.......................... */}
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
<View>
   <SimpleLineIcons  name="lock" color="#c4c3cb" size={26} />
   </View>
    <View style={{width:wp('75%')}}>
        <TextInput style={{  margin: hp('1%'),
                           paddingLeft:'10%',
                           borderRadius: 75,
                           borderColor: '#c4c3cb',
                           borderWidth: 1,
                           textAlign: 'left',
                           backgroundColor: '#FFFFFF50',
                           height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
        secureTextEntry
        value={this.state.NewPassword}
        underlineColorAndroid='transparent'
        placeholder='New Password'
        placeholderTextColor="#c4c3cb"
        onChangeText={(text)=>this.handlePassword(text,'NewPassword')}
        />
        
    </View>
   
</View>



{/* ..........................Confirm Password.......................... */}
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
<View>
   <SimpleLineIcons  name="lock" color="#c4c3cb" size={26} />
   </View>
    <View style={{width:wp('75%')}}>
        <TextInput style={{  margin: hp('1%'),
                           paddingLeft:'10%',
                           borderRadius: 75,
                           borderColor: '#c4c3cb',
                           borderWidth: 1,
                           textAlign: 'left',
                           backgroundColor: '#FFFFFF50',
                           height:(Platform.OS==='ios')?hp('6%'):hp("6%") }}
        secureTextEntry
        value={this.state.ConfirmPassword}
        underlineColorAndroid='transparent'
        placeholder='Enter  Password here..'
        placeholderTextColor="#c4c3cb"
        onChangeText={(text)=>this.handlePassword(text,'ConfirmPassword')}
        />
        
    </View>
   
</View>
{/* ..........................Submit Button........................... */}
<View style={{paddingTop:"7%"}}>
                 <View style={styles.SubmitButtonCont}>
                     <TouchableOpacity style={{
                                                backgroundColor: '#ff6347',
                                                opacity:.6,
                                                width: wp('71%'),
                                                height: hp('6%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),marginLeft:'5%',
                                            }} 
                     onPress={()=>this.Update()}
                  >
                         <Text style={styles.SubmitButtonText}> Update</Text>
                     </TouchableOpacity>
                 </View>
                 </View>

      </View>
    );
}




}