import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has, isNull } from "lodash"

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent, AddAddressModal } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { AlertAction, LoadingAction, profileAction } from '../redux/actions'

const ManageAddressScreen = (props) => {
    const { route, navigation, lang, userData, addressList, setAddressList, showLoader, hideLoader } = props
    // const [addressList, setaddressList] = useState([])
    /* const [addnewAddress, setaddnewAddress] = useState(false) */
    const [addressData, setaddressData] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        //console.log(route?.params?.title || "empreer")
        //setTitle(route.params?.title || "Our Restaurants")
        //getAddresses()
    }, [])

    const getAddresses = async () => {
        const { api_token } = userData
        await Axios.get(API.addresses(), { params: { api_token, "search": `user_id:${userData.id}` } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setAddressList(response.data)
                }
            }).catch((error) => { })
    }

    const handleDelete = (item) => {
        if (item?.is_default) {
            dispatch(AlertAction.handleAlert({
                visible: true,
                title: "Error",
                message: "Make another addess as default and try again",
                buttons: [{
                    title: "Okay",
                    onPress: () => {
                        dispatch(AlertAction.handleAlert({ visible: false, }))
                    }
                }]
            }))
        } else {
            dispatch(AlertAction.handleAlert({
                visible: true,
                title: "Warning",
                message: "Are you sure?",
                buttons: [{
                    title: "Delete",
                    onPress: () => {
                        deleteAction(item)
                        dispatch(AlertAction.handleAlert({ visible: false, }))
                    }
                }, {
                    title: "Cancel",
                    onPress: () => {
                        dispatch(AlertAction.handleAlert({ visible: false, }))
                    }
                }]
            }))
        }
    }

    const deleteAction = async (item) => {
        const { api_token } = userData
        showLoader()
        await Axios.delete(API.addresses(item.id), { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    await getAddresses()
                }
                hideLoader()
            }).catch((error) => { hideLoader() })
    }

    const defaultAction = async (data) => {
        showLoader()
        const { api_token } = userData
        if (has(data, "is_default") && data.is_default) {
            const list = addressList.filter((item) => item.is_default)
            if (list.length > 1) {
                await Axios.put(API.editAddress, { ...data, default: 0, api_token }).then(async (res) => {
                    if (has(res, "success") && res.success) {
                        await getAddresses()
                    }
                    hideLoader()
                }).catch((error) => { hideLoader() })
            } else {
                dispatch(AlertAction.handleAlert({
                    visible: true,
                    title: "Error",
                    message: "Make another addess as default and try again",
                    buttons: [{
                        title: "Okay",
                        onPress: () => {
                            hideLoader()
                            dispatch(AlertAction.handleAlert({ visible: false, }))
                        }
                    }]
                }))
            }
        } else {
            await Axios.put(API.editAddress, { ...data, default: 1, api_token }).then(async (res) => {
                if (has(res, "success") && res.success) {
                    await getAddresses()
                }
                hideLoader()
            }).catch((error) => {
                console.log(error)
                hideLoader()
            })
        }
    }

    return (<>
        <Header
            titleColor={COLORS.black}
            title="manage_addess"
        >
            <View style={{ flex: 1 }}>
                <View style={{ height: HEIGHT * 0.07, backgroundColor: `${COLORS.activeTabColor}10`, paddingHorizontal: WIDTH * 0.05, justifyContent: "center" }}>
                    <Text style={[STYLES.textAlign(lang), { color: COLORS.title2 }]}>Saved Addresses</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    data={addressList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <View style={[{ height: HEIGHT * 0.13, paddingHorizontal: WIDTH * 0.05, borderTopWidth: index == 1 ? 0.5 : 0, borderBottomWidth: index == addressList.length - 1 ? 0 : 0.5, }, STYLES.flexDirection(lang)]}>
                        <View style={{ width: WIDTH * 0.6, justifyContent: "space-evenly" }}>
                            <Text style={[STYLES.textAlign(lang), { color: COLORS.title3, fontWeight: "bold" }]}>{item.description}</Text>
                            <Text style={[STYLES.textAlign(lang), { color: `${COLORS.title3}70`, fontWeight: "bold" }]}>{item.address}</Text>
                        </View>
                        <View style={[{ flex: 1, justifyContent: "space-evenly" },]}>
                            <Pressable style={{ height: HEIGHT * 0.025, width: WIDTH * 0.15, alignSelf: lang == "ar" ? "flex-start" : "flex-end", alignItems: "flex-end", justifyContent: "center" }} onPress={() => defaultAction(item)}>
                                <Text style={[STYLES.textAlign(lang), { color: item?.is_default ? COLORS.red : COLORS.title3, fontWeight: "bold", fontSize: 8 }]}>{item?.is_default ? "Default" : "Make Default"}</Text>
                            </Pressable>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Pressable onPress={() => {
                                    const { id, description, address, is_default, area_id, user_id } = item
                                    dispatch(profileAction.showAddNewAddress({ visible: true, addressData: { id, description, address, default: is_default, area_id } }))
                                }}>
                                    <Text style={[{ color: COLORS.green2, fontWeight: "bold" }]}>EDIT</Text>
                                </Pressable>
                                <View style={{ width: 1, borderWidth: 1 }} />
                                <Pressable onPress={() => handleDelete(item)}>
                                    <Text style={[{ color: COLORS.red, fontWeight: "bold" }]}>DELETE</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>}
                />
                <Pressable onPress={() => dispatch(profileAction.showAddNewAddress({ visible: true }))} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.primary, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", margin: WIDTH * 0.05 }}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                        {`+ ADD ADDRESS`}
                    </Text>
                </Pressable>
            </View>
        </Header>
    </>
    )
}
ManageAddressScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
        addressList: ProfileReducer.addressList
    }
}

const mapDispatchToProps = {
    setAddressList: (address) => profileAction.setAddressList(address),
    showLoader: () => LoadingAction.showLoader(),
    hideLoader: () => LoadingAction.hideLoader(),
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddressScreen)
