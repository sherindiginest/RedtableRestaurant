import React from 'react';import { View, Text, SectionList,TextInput, Button,AsyncStorage, TouchableOpacity, FlatList, ScrollView, Image,ImageBackground  } from 'react-native';
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
//import ProductCheckout from '../Product/ProductCheckout'
//import { NavigationEvents } from 'react-navigation';
var tok;

    var formData = new FormData();

    export default class EditProfile extends React.Component {

    static navigationOptions = {
        title: '',
    };
    constructor(props) {
      super(props);
  
      this.state = {
        Itemid:'',
        imageupload:'',
        Name:'',
      Dob:'',
      Email:'',
      Gender:'',
      Phone:'',
      
      filePath: '',
    Isimagesource: '',
    filetype: '',
    filename: '',

        
        
       
      };
      this.arrayholder = [];
    
    }
    async componentDidMount() {
        
     
    }
 


//text input handle change fn
handleChange(text, name) {
    //let value = text.replace(/[^A-Za-z]/ig, '')

    this.setState({
        [name]: text
    });
};

async GetImage()
{
    //alert(JSON.stringify(formData))
    let tok=this.state.UserToken
    
    let response = await fetch('https://mastermindias.smartipz.com/token/user_api/get_profile_image',{
        method: 'POST',
        headers: {
            'Authorization':tok,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    
        body: JSON.stringify({
          
            
          })
    }
    );
    
    let responseJson = await response.json();

//alert(JSON.stringify(responseJson))
this.setState({
    imageupload: responseJson.image
})
}


//function for convert file to base64
convertFile = (uri) => {
    RNFS.readFile(uri, 'base64')
        .then(data => {

            this.setState({
                imageupload: data
            })
            
        })
}


 //function for choose file from library
async chooseFile() {

    var options = {
        title: 'Select Image',

        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);
        
        if (response.didCancel) {
           
            console.log('User cancelled image picker');
        } else if (response.error) {
            
            console.log('ImagePicker Error: ', response.error);
        }

        else {
           
            let source = response.uri;
            let type = response.type;
            let ImageName = response.fileName

            // this.convertFile(source);
            this.setState({
                imageupload:source,
                // filePath: source,
                // Isimagesource: true,
                // filetype: type,
                // filename: ImageName
            });


            var media = {
                uri: source,
                type: type,
                name: ImageName,
              };
              //alert(media.uri)
              var formData = new FormData();
              formData.append("image", media);
          

this.profile(formData);
        



            //   fetch("https://mastermindias.smartipz.com/token/user_api/change_profile_pic", {
            //     method: 'post',
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //     },
            //     body: formData
            //   }).then(function(r){
            //       alert(JSON.stringify(r))
            //     console.log("Success", r);
            //   }).catch(function(e){
            //     console.log("Error", e);
            //     alert(1)
            //   }).done();





        }
    });
};

async profile(formData)
{
    //alert(JSON.stringify(formData))
    let tok=this.state.UserToken
    
    let response = await fetch('https://mastermindias.smartipz.com/token/user_api/change_profile_pic',{
        method: 'POST',
        headers: {
            'Authorization':tok,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    
        body:  formData
    }
    );
    
    let responseJson = await response.json();

//alert(JSON.stringify(responseJson))
this.setState({
    imageupload: responseJson.path
})
}


//function for refresh the page
async refresh()
{
    this.componentDidMount();
}


      //// here starts UI Components
      handleChange(text,name)
      {
          this.setState({[name]:text});
      }


      renderFooter() {
        return (
            <View>
                {this.state.AllProducts == '' &&
    
                    
                    <View>
                        <Text style={{
                            fontWeight: "bold", textAlign: "center",
                            marginTop:'10%',
                            fontSize: 17
                        }}>No Result</Text>
                    </View>
                }
            </View>
        );
    }



  render() {

   
    return (

<View style={{  flex: 1 }}>
<NavigationEvents
                    onDidFocus={() => this.refresh()}
                />
                <View style={{ backgroundColor: 'white', height: hp('100%'), width: wp('100%') }}>
                                       
    <ScrollView>

    
{/*                  
                        <View style={{marginTop:hp('3%')}}>
                   
                    <Button
  //onPress={onPressLearnMore}
  title="My Profile"
  color="red"
  accessibilityLabel="Learn more about this purple button"
/>
</View> */}


{this.state.imageupload === '' || this.state.imageupload === null ?
                                            <View style={{ marginLeft: hp('11%'), paddingTop: "2%" }}>
                                                {/* <TouchableOpacity onPress={() => this.chooseFile()}> */}
                                                <ImageBackground

                                                    imageStyle={{ opacity: 1, borderRadius: 130, }}
                                                    source={require('../../../assets/images/user.png')}
                                                    style={{ height: hp('28%'), width: wp('55%') }}>
                                                    <TouchableOpacity onPress={() => this.chooseFile()}>
                                                        <View style={{ marginLeft: Platform.OS === 'ios' ? hp('20') : hp('21%'), marginTop: hp('22%') }}>
                                                            <Icon name="image" color="grey" size={40}></Icon>
                                                        </View>
                                                    </TouchableOpacity>
                                                </ImageBackground>

                                            </View> :
                                            <View style={{ marginLeft: hp('11%'), paddingTop: "2%" }}>
                                                {/* <TouchableOpacity onPress={() => this.chooseFile()}> */}
                                                <ImageBackground

                                                    imageStyle={{ opacity: 1, borderRadius: 130,borderWidth:1,borderColor:'white' }}
                                                    source={{ uri:this.state.imageupload }}
                                                    style={{ height: hp('28%'), width: wp('55%') }}>
                                                    <TouchableOpacity onPress={() => this.chooseFile()}>
                                                        <View style={{ marginLeft: Platform.OS === 'ios' ? hp('20') : hp('21%'), marginTop: hp('22%') }}>
                                                            <Icon name="image" color="grey" size={40}></Icon>
                                                        </View>
                                                    </TouchableOpacity>
                                                </ImageBackground>
                                                {/* </TouchableOpacity> */}
                                            </View>
                                        }



                                       
                                        <View>
                                           {/* ..........................Name.......................... */}
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
<View>
   
   <EvilIcons  name="user" color="#c4c3cb"
                                                            size={26}/>
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
        //secureTextEntry
        value={this.state.Name}
        underlineColorAndroid='transparent'
        placeholder='Name'
        placeholderTextColor="#c4c3cb"
        onChangeText={(text)=>this.handleChange(text,'Name')}
        />
        
    </View>
   
</View> 

{/* ..........................Email.......................... */}
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
<View>
   
<Fontisto  name="email" color="#c4c3cb" size={26} />
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
        //secureTextEntry
        value={this.state.Name}
        underlineColorAndroid='transparent'
        placeholder='Email'
        placeholderTextColor="#c4c3cb"
        onChangeText={(text)=>this.handleChange(text,'Email')}
        />
        
    </View>
   
</View> 

{/* ..........................Phone.......................... */}
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignContent:'center'}}>

             
<View>
   
<MaterialCommunityIcons  name="phone" color="#c4c3cb"
                                                            size={26}></MaterialCommunityIcons>
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
        //secureTextEntry
        value={this.state.Phone}
        underlineColorAndroid='transparent'
        placeholder='PhoneNumber'
        placeholderTextColor="#c4c3cb"
        onChangeText={(text)=>this.handleChange(text,'Phone')}
        />
        
    </View>
   
</View> 


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
                                       
                                        
                                       
                                        
        
                </ScrollView>
                                                                           
</View>

     </View>

    );
  }
}