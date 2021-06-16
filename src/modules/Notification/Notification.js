import React from 'react';import { View, Text, SectionList,TextInput, Button,AsyncStorage, TouchableOpacity, FlatList, ScrollView, Image,ImageBackground,BackHandler  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../../styles/common';
import { Card } from 'react-native-elements';
import Dialog, { DialogFooter, ScaleAnimation, DialogButton, DialogContent } from 'react-native-popup-dialog';
import AntIcon from "react-native-vector-icons/AntDesign";
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";



const NotificationArray = [
    {
      id: 3,
      name: 'Order Confirmed',
      details:
      'Your new order has been confirmed',
      time:'6:30 PM',
      status:1
    },
    {
      id: 1,
      name: 'New Update Available',
      details: 'Check our new app on play store',
      time:'yesterday',
      status:2
    },


  ];


export default class Notification extends React.Component {

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
        this.props.navigation.navigate('Home')
    }
    render(){
        return(
            <View style={{  flex: 1 }}>
{/* <NavigationEvents
                    onDidFocus={() => this.refresh()}
                /> */}
                <View style={{ backgroundColor: 'white', height: hp('100%'), width: wp('100%') }}>

    <ScrollView>
    <View style={{flexDirection:'row',justifyContent: 'space-between',paddingRight:'40%',paddingBottom:'5%'}}>
                        <View style={{alignItems:'flex-start',paddingLeft:'10%',paddingTop:'2%'}}>
                        <TouchableOpacity onPress={() => this.back()}>
                                        <AntIcon   name="left" size={30} color='black' />
                                        </TouchableOpacity>
                                        </View>
                                <View >
                                        <Text  style={{fontSize:30}} >Notification
                                        </Text>
                                        </View>

                                        </View>
                                        {/* <View style={{backgroundColor:'#f0f8ff',width:'100%',paddingLeft:'10%'}}>
                                        <View style={{ width: wp('93%') }}>

<TextInput

    value={this.state.edit}
    underlineColorAndroid='transparent' placeholder='Saved Addresses'
    placeholderTextColor="#c4c3cb"


/>

</View>

                                        </View> */}


    <View>
                                    <FlatList

                                        data={NotificationArray}

                                        renderItem={({ item }) => (
                                            <View>
                                                <View style={{
                                                    borderRadius: 75, backgroundColor: 'white', marginLeft: "0%",
                                                    margin: 3
                                                }}>





                                                    <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
                                                        {item.status==1 &&
                                                    <View style={{ width: wp("15%"), alignItems: "center", justifyContent: "center", marginRight:'5%',backgroundColor:'blue',borderRadius:140 }}>

                                                                 {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                 <MaterialIcons name="restaurant-menu" color='white' size={26} />


                                                         </View>
                                        }
                                         {item.status==2 &&
                                                    <View style={{ width: wp("15%"), alignItems: "center", justifyContent: "center", marginRight:'5%',backgroundColor:'#ffd700',borderRadius:140, }}>

                                                                 {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                 <Ionicons name="alert" color='white' size={30} />


                                                         </View>
                                        }
                                                        <View style={{ width: wp("50%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
                                                            <Text style={{ fontSize: 18, textAlign: 'left',fontWeight:'bold' }}>{item.name}</Text>
                                                            <Text style={{ fontSize: 15, textAlign: 'left',color:'#c4c3cb' }}>{item.details}</Text>
                                                        </View>








                                                                <View style={{ width: wp("17%"), alignItems: "center", justifyContent: "center", borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>

                                                                        {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                        <Text style={{ fontSize: 13, textAlign: "center",fontWeight:'bold',color:'#c4c3cb' }}>{item.time}</Text>

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