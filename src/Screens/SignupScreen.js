import React, {Component} from 'react';
import {
  View,
  Text,
  Picker,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Platform,
  TextInput,
  AsyncStorage,
  Switch,
  ImageBackground,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog, {
  DialogFooter,
  ScaleAnimation,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
import {ScrollView} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function SignupScreen() {
  return (
    <View style={{flex: 0}}>
      <ImageBackground
        source={require('../../assets/images/s2.png')}
        style={{
          //flex: 0,
          resizeMode: 'cover',
          justifyContent: 'center',
          height: '100%',
          width: wp('100%'),
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '20%',
          }}>
          <Image
            style={{
              resizeMode: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: '50%',
              marginTop: hp('15%'),
            }}
            source={require('../../assets/images/img1.png')}
          />
        </View>
        <ScrollView>
          <View
            style={{
              marginLeft: wp('3%'),
              marginRight: wp('3%'),
              marginTop: hp('10%'),
            }}>
            {/* FirstName */}
            <View style={styless.SectionStyle}>
              <View>
                <AntIcon name="user" color="white" size={26} />
              </View>
              <View style={{width: wp('65%')}}>
                <TextInput
                  style={{
                    margin: hp('1%'),

                    textAlign: 'left',
                    //backgroundColor: '#FFFFFF50',
                    height: Platform.OS === 'ios' ? hp('6%') : hp('6%'),
                  }}

                  //value={this.state.FirstName}
                  //underlineColorAndroid='transparent' placeholder='Enter  Name '
                  //placeholderTextColor="#c4c3cb"

                  //onChangeText={(text) => this.handleChange(text, 'FirstName')}
                />
              </View>
            </View>

            {/* Text field for Email Id */}
            <View style={styless.SectionStyle}>
              <View>
                <Fontisto name="email" color="white" size={26} />
              </View>

              <View style={{width: wp('65%')}}>
                <TextInput
                  style={{
                    margin: hp('1%'),
                    textAlign: 'left',
                    height: Platform.OS === 'ios' ? hp('6%') : hp('6%'),
                  }}
                  //    value={this.state.EmailId}
                  //    underlineColorAndroid='transparent' placeholder='Enter the Email Id here'
                  //    placeholderTextColor="#c4c3cb"
                  //    onChangeText={(text) => this.handleChange(text, 'EmailId')}
                />
              </View>
            </View>

            {/* Text field Mobile Number */}
            <View style={styless.SectionStyle}>
              <FontAwesome name="phone" color="white" size={26} />
              <View style={{width: wp('60%')}}>
                <TextInput
                  style={{
                    margin: hp('1%'),
                    textAlign: 'left',
                    height: Platform.OS === 'ios' ? hp('6%') : hp('6%'),
                  }}
                  //value={this.state.ContactNumber1}
                  keyboardType="numeric"
                  maxLength={10}
                  //    underlineColorAndroid='transparent' placeholder='Enter  Mobile Number '
                  //    placeholderTextColor="#c4c3cb"
                  //    onChangeText={(text) => this.handleChange(text, 'ContactNumber1')}
                />
              </View>
            </View>

            {/* ..........................New Password.......................... */}
            <View style={styless.SectionStyle}>
              <View>
                <SimpleLineIcons name="lock" color="white" size={26} />
              </View>
              <View style={{width: wp('65%')}}>
                <TextInput
                  style={{
                    margin: hp('1%'),
                    textAlign: 'left',
                    height: Platform.OS === 'ios' ? hp('6%') : hp('6%'),
                  }}
                  secureTextEntry
                  //value={this.state.NewPassword}
                  // underlineColorAndroid='transparent'
                  // placeholder='Enter  Password here..'
                  // placeholderTextColor="#c4c3cb"
                  // onChangeText={(text)=>this.handlePassword(text,'NewPassword')}
                />
              </View>
            </View>

            {/* ..........................Submit Button........................... */}
            <View style={{paddingTop: '3%'}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: hp('1%'),
                  alignContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'yellow',
                    opacity: 0.6,
                    width: wp('85%'),
                    height: hp('6.5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 75,
                    marginBottom: hp('1%'),
                    marginRight: '5%',
                  }}
                  onPress={() => this.Submit()}>
                  <Text
                    style={{
                      fontSize: hp('3%'),
                      color: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingTop: '5%'}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: hp('1%'),
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'black',
                    opacity: 0.5,
                    width: wp('85%'),
                    height: hp('6.5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 75,
                    marginBottom: hp('1%'),
                    marginRight: '5%',
                  }}
                  onPress={() => this.login()}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={{color: 'white'}}>
                        Already Have A Account?{' '}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          color: '#7fff00',
                          fontWeight: 'bold',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 20,
                        }}>
                        LOGIN
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* Warning Message  */}
            <View>
              <Dialog
                width={wp('80%')}
                visible={false}
                dialogAnimation={
                  new ScaleAnimation({
                    initialValue: 0,
                    useNativeDriver: true,
                  })
                }
                footer={
                  <DialogFooter>
                    <DialogButton
                      bordered={false}
                      text="OK"
                      textStyle={{color: 'green'}}
                      onPress={() => this.handleWarning()}
                    />
                  </DialogFooter>
                }
                onTouchOutside={() => {
                  this.setState({ErrorPopup: false});
                }}>
                <DialogContent>
                  <View style={{alignItems: 'center', paddingTop: '3%'}}>
                    <AntIcon
                      name="infocirlceo"
                      color="#dea814"
                      size={50}></AntIcon>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: hp('2.6%'),
                        fontSize: hp('4%'),
                      }}>
                      Warning
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: hp('2.6%'),
                        fontSize: 18,
                      }}>
                      {''}
                    </Text>
                  </View>
                </DialogContent>
              </Dialog>
            </View>
            {/* ...................PopUp DialogBox for SuccessMessage................*/}
            <View>
              <Dialog
                width={wp('80%')}
                visible={false}
                dialogAnimation={
                  new ScaleAnimation({
                    initialValue: 0,
                    useNativeDriver: true,
                  })
                }
                footer={
                  <DialogFooter>
                    <DialogButton
                      bordered={false}
                      text="OK"
                      textStyle={{color: 'green'}}
                      onPress={() => this.handleSuccessMessage()}
                    />
                  </DialogFooter>
                }
                onTouchOutside={() => {
                  this.setState({SuccessPopup: false});
                }}>
                <DialogContent>
                  <View style={{alignItems: 'center', paddingTop: '3%'}}>
                    <AntIcon
                      name="checkcircleo"
                      color="green"
                      size={40}></AntIcon>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: hp('2.6%'),
                        fontSize: hp('3%'),
                      }}>
                      {''}
                    </Text>
                  </View>
                </DialogContent>
              </Dialog>
            </View>

            {/* ...............PopUp DialogBox for ErrorMessage............... */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styless = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    height: 50,
    margin: 15,
    width: '90%',
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#FFFFFF50',
  },
});
