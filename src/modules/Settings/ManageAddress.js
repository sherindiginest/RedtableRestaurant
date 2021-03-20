import React from 'react';import { View, Text, SectionList,TextInput, Button,AsyncStorage, TouchableOpacity, FlatList, ScrollView, Image,ImageBackground,BackHandler  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../../styles/common';
import { Card } from 'react-native-elements';
import Dialog, { DialogFooter, ScaleAnimation, DialogButton, DialogContent } from 'react-native-popup-dialog';
import AntIcon from "react-native-vector-icons/AntDesign";
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";



const Address = [
    {
      id: 3,
      name: 'HOME',
      addres:
      'jk bhaban ,kollam,kollam Town'
    },
    {
      id: 1,
      name: 'WORK',
      addres: 'DIginest Technopark, Nila building 4th floor'
    },
    {
      id: 2,
      name: 'APARTMENT',
      addres:
        'Hari Vargheese HG Appartment 2nd floor trivandrum'
    },
    
  ];


export default class ManageAddress extends React.Component {

    static navigationOptions = {
        title: '',
    };
    constructor(props) {
      super(props);
  
      this.state = {
 
      };
      this.arrayholder = [];
    
    }

    back()
    {
        this.props.navigation.navigate('Settings')
    } 
    render(){
        return(
            <View style={{  flex: 1 }}>
{/* <NavigationEvents
                    onDidFocus={() => this.refresh()}
                /> */}
                <View style={{ backgroundColor: 'white', height: hp('100%'), width: wp('100%') }}>
                                       
    <ScrollView>
    <View style={{flexDirection:'row',justifyContent: 'space-between',paddingRight:'30%',paddingBottom:'5%'}}>
                        <View style={{alignItems:'flex-start',paddingLeft:'10%',paddingTop:'2%'}}>
                        <TouchableOpacity onPress={() => this.back()}>
                                        <AntIcon   name="left" size={30} color='black' />
                                        </TouchableOpacity>
                                        </View>
                                <View >
                                        <Text  style={{fontSize:30}} >Manage Adress 
                                        </Text>
                                        </View>
                                        
                                        </View>
                                        <View style={{backgroundColor:'#f0f8ff',width:'100%',paddingLeft:'10%'}}>
                                        <View style={{ width: wp('93%') }}>

<TextInput 
   
    value={this.state.edit}
    underlineColorAndroid='transparent' placeholder='Saved Addresses'
    placeholderTextColor="#c4c3cb"
    
   
/>

</View>

                                        </View>
    

    <View>
                                    <FlatList

                                        data={Address}

                                        renderItem={({ item }) => (
                                            <View>
                                                <View style={{
                                                    borderRadius: 75, backgroundColor: 'white', marginLeft: "0%",
                                                    margin: 3
                                                }}>
                                                    <View style={{ flexDirection: "row",marginLeft:'10%',marginBottom:'2%',marginTop:'2%' }}>
                                                        <View style={{ width: wp("60%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
                                                            <Text style={{ fontSize: 18, textAlign: 'left',fontWeight:'bold' }}>{item.name}</Text>
                                                            <Text style={{ fontSize: 15, textAlign: 'left',color:'#c4c3cb' }}>{item.addres}</Text>
                                                        </View>

                                                        

                                                       
                                                       

                                                            
                                                                <View style={{ width: wp("12%"), alignItems: "center", justifyContent: "center", borderRightWidth: 1, borderRightColor: "#c4c3cb" }}>
                                                                    <TouchableOpacity onPress={() => this.Edit()}>
                                                                        {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                        <Text style={{ fontSize: 13, textAlign: "center",fontWeight:'bold',color:'green' }}>EDIT</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                           
                                                        
                                                        <View style={{ width: wp("12%"), alignItems: "center", justifyContent: "center",marginLeft:'2%' }}>
                                                            
                                                                <TouchableOpacity onPress={() => this.Delete()}>
                                                                {/* <Icon name="ban" color="#f5020f" size={15}></Icon> */}
                                                                <Text style={{ fontSize: 13, textAlign: "center",fontWeight:'bold',color:'red' }}>DELETE</Text>
                                                                </TouchableOpacity>
                                                            
                                                        </View>


                                                    </View>
                                                </View>

                                            </View>
                                        )}
                                        //ListFooterComponent={this.renderFooter.bind(this)}
                                        onEndThreshold={0}
                                    />

                                </View>


                                    
                                       
                                        
                                       
                                        
        
                </ScrollView>
                                                                           
</View>

     </View>
        );
    }
}