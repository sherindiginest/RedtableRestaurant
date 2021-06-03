import React, { useState, useEffect } from 'react'
import { View, Text, Modal, Pressable, Image, Switch } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has, isNull } from "lodash"

import { CustomTextInput } from '.'
import { close } from '../../assets/images'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { profileAction } from '../redux/actions'

const AddAddressModal = (props) => {
    const { visible, onClose, lang, addressData, userData, setAddressList } = props

    const [address, setaddress] = useState(addressData)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (isEmpty(addressData)) {
            setaddress({
                description: "HOME",
                default: false,
                user_id: userData.id,
                api_token: userData.api_token,
                area_id: "3",
                address: ""
            })
        } else {
            setaddress(addressData)
        }
    }, [addressData])


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

    const handleAction = async () => {

        if (has(address, "address") && !isEmpty(address.address)) {
            const data = { ...address, default: address.default ? 1 : 0 }
            if (isEmpty(addressData)) {
                await Axios.post(API.createAddress, data).then(async (res) => {
                    console.log(res);
                    if (has(res, "success") && res.success) {
                        getAddresses()
                    }
                }).catch((error) => { })
            } else {
                await Axios.put(API.editAddress, data).then(async (res) => {
                    if (has(res, "success") && res.success) {
                        getAddresses()
                    }
                }).catch((error) => { })
            }
        } else {
            setError(true)
        }

    }



    return (<Modal animationType="slide" visible={visible}
        onRequestClose={() => onClose()}
        transparent
    >
        <View style={{ flex: 1, backgroundColor: "#00000030", }}>
            <Pressable onPress={() => onClose()} style={{ flex: 1 }}>
            </Pressable>
            <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.5, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                <View style={{ height: HEIGHT * 0.07, alignItems: "center", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", backgroundColor: `${COLORS.activeTabColor}15` }}>
                    <Text>{isEmpty(addressData) ? "Add New Address" : "Edit Address"}</Text>
                    <Pressable style={{}} onPress={() => onClose()}>
                        <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                    </Pressable>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                    <CustomTextInput
                        placeholder="House / Flat / Apartment"
                        placeholderTextColor={COLORS.placeHolderColor}
                        style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                        value={address?.address}
                        textColor={COLORS.black}
                        onChangeText={(value) => setData("address", value)}
                    />
                    <CustomTextInput
                        editable={false}
                        placeholder="Area"
                        placeholderTextColor={COLORS.placeHolderColor}
                        style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                        value={"3"}
                        textColor={COLORS.black}
                    />
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
                        <View style={[STYLES.flexDirection(lang), { justifyContent: "space-between" }]}>
                            <Text style={{}}>Set as Default address for all purchases</Text>
                            <Switch value={address?.default} thumbColor={address?.default ? COLORS.green2 : COLORS.color3} trackColor={{ false: COLORS.color2, true: COLORS.color1 }} onValueChange={(value) => setData("default", value)} />
                        </View>
                    </View>
                    <Pressable onPress={() => handleAction()} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", bottom: -1 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                            {isEmpty(addressData) ? `+ ADD ADDRESS` : "SAVE ADDRESS"}
                        </Text>
                    </Pressable>
                </View>

            </View>
        </View>
    </Modal>)
}

AddAddressModal.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData
    }
}
const mapDispatchToProps = {
    setAddressList: (address) => profileAction.setAddressList(address),
}


export default connect(mapStateToProps, mapDispatchToProps)(AddAddressModal)
