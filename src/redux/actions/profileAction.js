import AsyncStorage from "@react-native-async-storage/async-storage"
import { SETADDRESSLIST, SETADDRESSSELECT, SETCARTLIST, SETPROFILEDATA, SETNEWADDRESS, SETPICKUPMODE, ASKPICKUPMODE, SETFCMTOKEN, SETCOUNTRY } from "../../constants/constants"

const setProfileData = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: SETPROFILEDATA,
            payload,
        })
    }
}

const setAddressList = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: SETADDRESSLIST,
            payload,
        })
    }
}

const setCartList = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: SETCARTLIST,
            payload,
        })
    }
}

const showAddressSelect = (payload = { visible: false }) => {
    return async (dispatch) => {
        dispatch({
            type: SETADDRESSSELECT,
            payload,
        })
    }
}

const showAddNewAddress = (payload = { visible: false }) => {
    return async (dispatch) => {
        dispatch({
            type: SETNEWADDRESS,
            payload,
        })
    }
}
const setPickupMode = (payload) => {
    AsyncStorage.setItem("pickupMode", payload)
    return async (dispatch) => {
        dispatch({
            type: SETPICKUPMODE,
            payload,
        })
    }
}
const askPickupMode = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: ASKPICKUPMODE,
            payload,
        })
    }
}

const setFCMToken = (payload = {}) => {
    return async (dispatch) => {
        dispatch({
            type: SETFCMTOKEN,
            payload,
        })
    }
}
const setCountry = (payload = "SA") => {
    return async (dispatch) => {
        dispatch({
            type: SETCOUNTRY,
            payload,
        })
    }
}

export default {
    setProfileData,
    setAddressList,
    setCartList,
    showAddressSelect,
    showAddNewAddress,
    setPickupMode,
    askPickupMode,
    setFCMToken,
    setCountry
}