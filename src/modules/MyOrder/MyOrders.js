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
import RNFS from 'react-native-fs';
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";




const NotificationArray = [
    {
      id: 3,
      name: 'Order #101',
      details:
      'Chicken chilly',
      time:'6:30 PM',
      number:5,
      status:'processing',
      statuscolor:1,
      photo_url: 'https://truffle-assets.imgix.net/655ce202-862-butternutsquashcarbonara-land.jpg',
    },
    {
      id: 1,
      name: 'Order #103',
      details: 'idali',
      time:'yesterday',
      number:2,
      status:'completed',
      statuscolor:2,
      photo_url: 'https://truffle-assets.imgix.net/655ce202-862-butternutsquashcarbonara-land.jpg',
    },
    
    
  ];


export default class MyOrders extends React.Component {

    static navigationOptions = {
        title: '',
    };
    constructor(props) {
      super(props);
  
      this.state = {
                    OrderNo:'',
                    Count:'',
                    Image:'',
                    Name:'',
      };
      this.arrayholder = [];
    
    }

    back()
    {
        this.props.navigation.navigate('Home')
    } 
    Submit(name,number,photourl,detail){
        this.setState({OrderNo:name,Count:number,Image:photourl,Name:detail})
        this.RBSheet.open();
    }
    Close()
    {
        this.RBSheet.close();  
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
                                        <Text  style={{fontSize:30}} >My Orders
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




<TouchableOpacity onPress={()=>this.Submit(item.name,item.number,item.photo_url,item.details)}>
                                                    <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
                                                       
                                                    <View style={{ width: wp("15%"), alignItems: "center", justifyContent: "center", marginRight:'7%',borderRadius:140 }}>
                                                                 
                                                                 {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                 {/* <MaterialIcons name="restaurant-menu" color='white' size={26} /> */}
                                                                 <Image style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
  }} source={{ uri: item.photo_url }} />
                                                  
                                                         </View>
                                        
                                                         
                                                        <View style={{ width: wp("50%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
                                                            <Text style={{ fontSize: 18, textAlign: 'left',fontWeight:'bold' }}>{item.name}</Text>
                                                            <Text style={{ fontSize: 15, textAlign: 'left',color:'#c4c3cb',marginTop:'2%' }}>{item.number}{' x '}{item.details}</Text>
                                                        </View>
                                                        
                                                        
                                                        

                                                       
                                                       

                                                            
                                                                <View style={{ width: wp("17%"), alignItems: "center", justifyContent: "center", borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
                                                                 
                                                                        {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                        {item.statuscolor==1 &&
 <Text style={{ fontSize: 13, textAlign: 'left',color:'#ffd700' }}>{item.status}</Text>
                                                                        }
                                                                       {item.statuscolor==2 &&
 <Text style={{ fontSize: 13, textAlign: 'left',color:'blue' }}>{item.status}</Text>
                                                                        }
                                                                       
                                                                        <Text style={{ fontSize: 13, textAlign: "center",color:'#c4c3cb' }}>{item.time}</Text>
                                                         
                                                                </View>
                                                           
                                                        
                                                       
                                                                

                                                    </View>
                                                    </TouchableOpacity>
                                                    <View style={{ width: '80%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15,alignContent:'space-between',justifyContent:'space-between',marginLeft:45 }} />
                                                </View>

                                            </View>
                                        )}
                                        //ListFooterComponent={this.renderFooter.bind(this)}
                                        onEndThreshold={0}
                                    />





                                </View>


                                    
                                       
                                        
                                       
                                        
        
                </ScrollView>
                <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={500}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
        <View>
        <View style={{alignContent:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=>this.Close()}>

            
                    <Feather name="x" color="black" size={25}></Feather>
                    </TouchableOpacity>
                    </View>
            <ScrollView>
            <View style={{  marginTop:'5%',alignItems: "center", justifyContent: "center" }}>
                                                                 
                                                                 {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                 {/* <MaterialIcons name="restaurant-menu" color='white' size={26} /> */}
                                                                 <Image style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
  }} source={{ uri: this.state.Image }} />
                                                  
                                                         </View>

            <View style={{  marginTop:'5%',alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 25, textAlign: 'left',fontWeight:'bold' }}>{this.state.OrderNo}</Text>  
            </View>

<View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}> 
<View style={{ width: wp("45%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left', }}>Product</Text>
   
</View>
<View style={{ width: wp("30%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left', }}>Quantity</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>Price</Text>
   
</View>



 </View>   
 <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}> 
<View style={{ width: wp("45%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>{this.state.Name}</Text>
   
</View>
<View style={{ width: wp("30%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>{this.state.Count}</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>50SR</Text>
   
</View>



 </View>   
 <View style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>
     <Text style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
     </View>    

     <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
     <View style={{ width: wp("75%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>Item Total</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>50SR</Text>
   
</View> 
          </View>

          <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
     <View style={{ width: wp("75%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>Discount</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>15SR</Text>
   
</View> 
          </View>

          <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
     <View style={{ width: wp("75%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>Delivery Fee</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>10SR</Text>
   
</View> 
          </View>
          <View style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>
     <Text style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
     </View>


     <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
     <View style={{ width: wp("75%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb',fontWeight:'bold' }}>Total Bill</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red',fontWeight:'bold' }}>45SR</Text>
   
</View> 
          </View>


          <View style={{paddingTop:"3%"}}>
                 <View style={styles.SubmitButtonCont}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'red',
                                                opacity:.6,
                                                width: wp('75%'),
                                                height: hp('7%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.Cancel()}
                  >
                         <Text style={styles.SubmitButtonText}> Cancel</Text>
                     </TouchableOpacity>
                 </View>
                 </View>

            </ScrollView>
            
        </View>
        </RBSheet>                                                             
</View>

     </View>
        );
    }
}