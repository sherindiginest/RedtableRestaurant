import React, { useState, useEffect } from 'react'
import { View, Text, Modal, Pressable, Image, Switch, Alert, Button, PermissionsAndroid } from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has } from "lodash"
import RNPickerSelect from 'react-native-picker-select'

import { CustomTextInput } from '.'
import { backarrow, close,location } from '../../assets/images'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction, profileAction } from '../redux/actions'
import CustomButton from './CustomButton'
import Maps from './Maps'
import Geolocation from 'react-native-geolocation-service';

const AddAddressModal = (props) => {
    const { addnewAddressParams, lang, userData, setAddressList, cartList, setCartList, navigation } = props
    const { visible, addressData, resId, } = addnewAddressParams
    const [loading, setloading] = useState(false)
    const [address, setaddress] = useState(addressData)
    const [areaList, setareaList] = useState([])
    const [error, setError] = useState(false)

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [ locationDetails, setLocationDetails ] = useState(null)

    const [visibleMap, setVisibleMap] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        //requestLocationPermission()
        getAreacodes()
    }, [])

    useEffect(() => {
        getAreacodes()
    }, [visible])

    useEffect(() => {
        if (isEmpty(addressData)) {
            setaddress({
                description: "HOME",
                default: true,
                area_id: null,
                address: "",
                latitude: locationDetails?.latitude,
                longitude: locationDetails?.longitude
            })
        } else {
            setaddress(addressData)
        }
    }, [addressData])


    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "RedTable Location Permission",
              message:
                "RedTable needs access to your location " +
                "so you can choose your current location.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          //console.log(granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setLocationDetails(null);
                    setVisibleMap(true)
                },
                (error) => {
                    setLatitude(null)
                    setLongitude(null)
                    setLocationDetails(null);
                  // See error code charts below.
                  //console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
              Alert.alert("Permission Required", "Please Enable Location Permission to continue");
            //console.log("Camera permission denied");
          }
        } catch (err) {
          //console.warn(err);
        }
    };

    const onClose = () => {
        setaddress({})
        dispatch(profileAction.showAddNewAddress())
    }

    const setData = (field, value) => {
        address[field] = value
        setaddress({ ...address })
    }

    const getAddresses = async () => {
        const { api_token } = userData
        await Axios.get(API.addresses(), { params: { api_token, "search": `user_id:${userData.id}` } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setAddressList(response.data)
                    onClose()
                }
            }).catch((error) => { })
    }

    const getCartList = async () => {
        const { api_token } = userData
        await Axios.get(API.carts(), { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setCartList(response.data)
                }
                hideLoader()
            }).catch((error) => {
                hideLoader()
            })
    }

    const getAreacodes = async () => {
        const { api_token } = userData
        await Axios.get(API.areaCodes(resId || ""), { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setareaList(response.data)
                }
            }).catch((error) => {
            })
    }

    const handleAction = async () => {
        if (has(address, "address") && !isEmpty(address.address)) {
            setloading(true)
            const data = { ...address, default: address.default ? 1 : 0, user_id: userData.id, api_token: userData.api_token, latitude: locationDetails.latitude.toString(), longitude: locationDetails.longitude.toString() }
            //console.log(data)
            if (isEmpty(addressData)) {
                await Axios.post(API.createAddress, data).then(async (res) => {
                    if (has(res, "success") && res.success) {
                        await getAddresses()
                        await getCartList()
                        setLocationDetails(null)
                    }
                }).catch((error) => { 
                    //console.log(error)
                })
            } else {
                await Axios.put(API.editAddress, data).then(async (res) => {
                    if (has(res, "success") && res.success) {
                        await getAddresses()
                        await getCartList()
                    }
                }).catch((error) => { })
            }
            setloading(false)
        } else {
            setError(true)
        }
    }

    return (<View>
        <Modal animationType="slide" visible={visible}
        onRequestClose={() => onClose()}
        transparent
    >
        <View style={{ flex: 1, backgroundColor: "#00000030", }}>
            <Pressable onPress={() => onClose()} style={{ flex: 1 }}>
            </Pressable>
            <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.62, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                <View style={{ height: HEIGHT * 0.07, alignItems: "center", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", backgroundColor: `${COLORS.activeTabColor}15` }}>
                    <Text>{isEmpty(addressData) ? "Add New Address" : "Edit Address"}</Text>
                    <Pressable style={{}} onPress={() => onClose()}>
                        <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                    </Pressable>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, flex: 1, justifyContent: "space-evenly" }}>
                    <CustomTextInput
                        placeholder="House / Flat / Apartment"
                        placeholderTextColor={COLORS.placeHolderColor}
                        style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                        value={address?.address}
                        textColor={COLORS.black}
                        onChangeText={(value) => setData("address", value)}
                    />
                    <RNPickerSelect
                        placeholder={{ label: "Select area" }}
                        onValueChange={(value) => { setData("area_id", value) }}
                        items={areaList}
                        Icon={() => <Image source={backarrow} style={{ alignSelf: "center", width: HEIGHT * 0.04, height: HEIGHT * 0.04, transform: [{ rotate: "270 deg" }], tintColor: COLORS.textInputBorder }} resizeMode="contain" />}
                        style={{
                            viewContainer: { justifyContent: "center", backgroundColor: "#00000010", borderRadius: HEIGHT * 0.038, },
                            iconContainer: { width: WIDTH * 0.1 },
                            inputAndroid: {
                                color: COLORS.black
                            },
                            inputAndroidContainer: {
                                //backgroundColor: COLORS.textInputBackground
                            },

                        }}
                        value={address?.area_id}
                    />
                    <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                        <Pressable 
                        style={{ backgroundColor:'red', width: 30, height: 30, borderRadius: 15, alignItems:'center', justifyContent:'center' }}
                        onPress={()=> {
                            requestLocationPermission()
                            
                            }}>
                            <Image source={location} style={{ width: 20, height: 20,  }} resizeMode='contain' />
                        </Pressable>
                        <View>
                            {locationDetails && <Text>Latitude: {locationDetails.latitude} </Text>}
                            {locationDetails && <Text>Longitude: {locationDetails.longitude} </Text> }
                        </View>
                    </View>
                    
                    {/*  <CustomTextInput
                        placeholder="Landmark"
                        placeholderTextColor={COLORS.placeHolderColor}
                        style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                    /> */}
                    <View style={{ marginVertical: HEIGHT * 0.03 }}>
                        <Text style={{ textTransform: "uppercase" }}>Save address as</Text>
                        <View style={[STYLES.flexDirection(lang)]}>
                            <Pressable onPress={() => setData("description", "HOME")} style={{ height: HEIGHT * 0.07, justifyContent: "center", alignItems: "center", flex: 1, }}>
                                <Text style={{ textTransform: "uppercase", color: address?.description == "HOME" ? COLORS.primary : COLORS.black, fontWeight: "bold" }}>HOME</Text>
                            </Pressable>
                            <Pressable onPress={() => setData("description", "WORK")} style={{ height: HEIGHT * 0.07, justifyContent: "center", alignItems: "center", flex: 1 }}>
                                <Text style={{ textTransform: "uppercase", color: address?.description == "WORK" ? COLORS.primary : COLORS.black, fontWeight: "bold" }}>WORK</Text>
                            </Pressable>
                            <Pressable onPress={() => setData("description", "OTHER")} style={{ height: HEIGHT * 0.07, justifyContent: "center", alignItems: "center", flex: 1 }}>
                                <Text style={{ textTransform: "uppercase", color: address?.description == "OTHER" ? COLORS.primary : COLORS.black, fontWeight: "bold" }}>OTHER</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={[STYLES.flexDirection(lang), { justifyContent: "space-between" }]}>
                        <Text style={{}}>Set as Default address for all purchases</Text>
                        <Switch value={address?.default} thumbColor={address?.default ? COLORS.green2 : COLORS.color3} trackColor={{ false: COLORS.color2, true: COLORS.color1 }} onValueChange={(value) => setData("default", value)} />
                    </View>
                    <CustomButton
                        title={isEmpty(addressData) ? `+ ADD ADDRESS` : "SAVE ADDRESS"}
                        onPress={() => {
                            handleAction()
                            //navigation.navigate('OtpScreen');
                        }}
                        loading={loading}
                        style={{ backgroundColor: COLORS.addToCartButton, height: HEIGHT * 0.06 }}
                    />
                </View>
            </View>
        </View>
    </Modal>
    <Modal animationType="slide" visible={visibleMap}
        onRequestClose={() => setVisibleMap(false)}
        transparent
    >
        <View style={{ flex: 1, backgroundColor: "#00000030", }}>
            <Pressable onPress={() => setVisibleMap(false)} style={{ flex: 1 }}>
            </Pressable>
            <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.62, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                <Pressable style={{}} onPress={() => setVisibleMap(false)}>
                    <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                </Pressable>
                <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                    <Maps 
                        latitude={latitude} 
                        longitude={longitude} 
                        onSelectLocation = { (e) => {
                            setLatitude(e.nativeEvent.coordinate.latitude);
                            setLongitude(e.nativeEvent.coordinate.longitude);
                        } }
                    />
                </View>
            </View>
            <Button color="red" title="Confirm Location" onPress={ () => {
                setLocationDetails({
                    latitude,
                    longitude
                })
                setVisibleMap(false);
            } } />
        </View>
    </Modal>
    </View>)
}

AddAddressModal.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
        cartList: ProfileReducer.cartList,
        addnewAddressParams: ProfileReducer.addnewAddressParams
    }
}
const mapDispatchToProps = {
    setAddressList: (address) => profileAction.setAddressList(address),
    showLoader: () => LoadingAction.showLoader(),
    hideLoader: () => LoadingAction.hideLoader(),
    setCartList: (cart) => profileAction.setCartList(cart)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddAddressModal)
