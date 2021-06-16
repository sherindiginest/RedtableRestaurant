import React, { useState, useEffect } from 'react'
import { View, Text, Modal, Pressable, Image, Switch } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { close } from '../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { profileAction } from '../redux/actions'

const PickupMethodModal = (props) => {
    const { visible, onClose, lang, setPickupMode, pickupMode, addressList, setshowAddAddress = () => { } } = props

    const handleClose = () => {
        if (pickupMode == null) {
            setPickupMode("delivery")
        }
        if (isEmpty(addressList)) {
            onClose()
            pickupMode != "pickup" && setshowAddAddress(true)
        } else {
            onClose()
        }
    }

    return (<Modal animationType="slide" visible={visible}
        onRequestClose={() => handleClose()}
        transparent
    >
        <View style={{ flex: 1, backgroundColor: "#00000030", }}>
            <Pressable onPress={() => handleClose()} style={{ flex: 1 }}>
            </Pressable>
            <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.5, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                <View style={{ height: HEIGHT * 0.07, alignItems: "center", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", backgroundColor: `${COLORS.activeTabColor}15` }}>
                    <Text>CHOOSE PICKUP METHOD</Text>
                    <Pressable style={{}} onPress={() => handleClose()}>
                        <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                    </Pressable>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ height: HEIGHT * 0.05, marginHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 12 }}>Deliver Order</Text>
                        <Switch value={pickupMode == "pickup"} thumbColor={pickupMode == "pickup" ? COLORS.green2 : COLORS.addToCartButton} trackColor={{ false: COLORS.color4, true: COLORS.color1 }}
                            onValueChange={(value) => setPickupMode(value ? "pickup" : "delivery")} />
                        <Text style={{ fontSize: 12 }}>Pick Up Order</Text>
                    </View>
                </View>
                <Pressable onPress={() => handleClose()} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", margin: WIDTH * 0.05, marginBottom: HEIGHT * 0.05 }}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>Done</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}

PickupMethodModal.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        pickupMode: ProfileReducer.pickupMode,
        addressList: ProfileReducer.addressList,
    }
}
const mapDispatchToProps = {
    setPickupMode: (mode) => profileAction.setPickupMode(mode)
}


export default connect(mapStateToProps, mapDispatchToProps)(PickupMethodModal)
