


import React, { Component } from 'react';
import { Modal,View, Text, StyleSheet, Image, FlatList, TouchableOpacity, AsyncStorage,BackHandler } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog, { DialogFooter, ScaleAnimation, DialogButton, DialogContent } from 'react-native-popup-dialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from "react-native-vector-icons/AntDesign";


var islogged='';
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Usermenulist: [], //to store menu list  
            LogoutPopup: false,
            menu:false,
            isback:0,
            menustatus:0,
            menusublist: [],
            edit: true,
            ProductId:'',
            Pid:'',
            Categories:[],
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.GetProductDetails();
       //alert(3)
       //alert(roleid);
        //this.loadmenu();
    }



    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        //alert(4)
       }
       
       async handleBackButtonClick() {
         //alert(5)
         var screenName=await AsyncStorage.getItem("ScreenName");
         //alert(screenName)
         if(screenName=="Home")
         { 
             this.setState({
                 LogoutPopup:true,
                 isback:1
             })      
        //  this.setState({
        //    LogoutPopup:true,
        //    isback:1
        //  });
         
         }
         else
         {
           this.props.navigation.goBack(null);
          
         }
         return true;
       }

       
       async GetProductDetails() {
         let response = await fetch('http://ecom.smartipz.com/token/user_api/home_post',{
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
         //alert(JSON.stringify(responseJson.data.categories))
         this.setState({
            
             Categories: eval(responseJson.data.categories),
           
         })
             
       }

    Logout() {
        
        AsyncStorage.clear();
        this.props.navigation.navigate('Login')
        this.setState({
            LogoutPopup: false
        })
    }

    CancelClick(){
        AsyncStorage.setItem('isLoggedIn', 'YES');
        this.setState({LogoutPopup:false})
        BackHandler.exitApp();
        
      }

      async Home()
      {
          
        this.props.navigation.navigate('Home')
      }
    
      async Login()
      {
        this.props.navigation.navigate('Login')   
      }
      Settings()
        {
            this.props.navigation.navigate('Settings')   
        }      
        MyOrders()
        {
            
            this.props.navigation.navigate('MyOrders') 
         
        }

      async menunavigation(id) {
        AsyncStorage.setItem('ProductId',id.toString())
        this.props.navigation.navigate('ProductList')
      }


//function for list show and hide
HideView() {

    this.setState({
        edit: !this.state.edit,
       
    })
  
}
    render() {
        return (
<View>
            <View style={styles.sideMenuContainer}>
            {/* <TouchableOpacity onPress={() => this.Home()}> */}
            <View style={{flexDirection:'row',alignContent:'flex-start',width:'100%',height:'10%',paddingRight:'50%'}}>

<Image source={require('../../../assets/images/img1.png')}
                    style={styles.sideMenuProfileIcon} />

<View style={{flexDirection:'column',paddingRight:'20%'}}>
    <View>
<Text style={{fontSize:18}}>
    Sherin sha
</Text>
    </View>
    <View>
<Text style={{fontSize:12}}>
    Sherin@diginest.in
</Text>
    </View>

</View>
            </View>
               
                {/* </TouchableOpacity> */}
                <ScrollView>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />

                    <View style={{ width: '100%' }}>

                    <View style={{ alignItems: 'flex-start', marginTop: 10, marginLeft: 3 }}>
                            <TouchableOpacity onPress={() => this.Home()}>
                                <Text
                                    style={styles.menuText}
                                >Home</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />
                        </View>

                        <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                        
                        <View style={{alignItems:'flex-start',paddingLeft:'10%'}}>
                                        <AntIcon   name="setting" size={20} color='black' />
                                        </View>
                                <View style={{paddingRight:'50%'}}>
                                <TouchableOpacity onPress={() => this.Settings()}>
                                        <Text style={styles.menuText} >Settings {"\n"} 
                                        </Text>
                                        </TouchableOpacity>
                                        </View>
                                        
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                        
                        <View style={{alignItems:'flex-start',paddingLeft:'10%'}}>
                                        <MaterialIcons   name="list-alt" size={20} color='black' />
                                        </View>
                                <View style={{paddingRight:'45%',alignItems:'flex-start'}}>
                                <TouchableOpacity onPress={() => this.MyOrders()}>
                                        <Text style={styles.menuText} >My Orders {"\n"} 
                                        </Text>
                                        </TouchableOpacity>
                                        </View>
                                        
                                        </View>
                        
                      
                        <View style={{ alignItems: 'flex-start', marginTop: 10, marginLeft: 3 }}>
                            <TouchableOpacity onPress={() => this.Login()}>
                                <Text
                                    style={styles.menuText}
                                >Login/Signup</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />
                        </View>


                         {  this.state.edit == true &&
                        <View style={{ alignItems: 'flex-start', marginTop: 10, marginLeft: 3 }}>
                            <TouchableOpacity onPress={() => this.setState({ LogoutPopup: true })}>
                                <Text
                                    style={styles.menuText}
                                >Logout</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />
                        </View>
    }
                    </View>

                   

                </ScrollView>
                <View>
                    <Dialog
                        width={wp('80%')}
                        visible={this.state.LogoutPopup}

                        dialogAnimation={new ScaleAnimation({
                            initialValue: 0, // optional
                            useNativeDriver: true, // optional
                        })}

                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="No"
                                    textStyle={{ color: "green" }}
                                    onPress={() => { this.CancelClick()}}
                                />
                                <DialogButton
                                    text="Yes"
                                    textStyle={{ color: "red" }}
                                    onPress={() => this.Logout()}
                                />
                            </DialogFooter>
                        }
                        onTouchOutside={() => {
                            this.setState({ LogoutPopup: false });
                        }}>

                        <DialogContent>
                            
                            <View>
                        <Text style={{ textAlign: 'center', marginTop: hp('2.6%'), fontSize: hp('2%') }}>Do you want to logout?</Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>
            


            </View>
            
            </View>
        );
    }
}
const styles = StyleSheet.create({
       menuText: {
        fontFamily: 'MONTSERRAT',
        fontSize: 15,
        //color: '#222222',
        color: 'black',
        paddingLeft:'20%'
    },
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        //paddingTop: 20
    },
    sideMenuProfileIcon:
    {
       resizeMode: 'center',
       width: '100%',
       height: '100%'
       
    },
});