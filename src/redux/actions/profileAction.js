import AsyncStorage from "@react-native-async-storage/async-storage"
import { SETADDRESSLIST, SETADDRESSSELECT, SETCARTLIST, SETPROFILEDATA, SETNEWADDRESS, SETPICKUPMODE, ASKPICKUPMODE, SETNOTIFICATIONDATA } from "../../constants/constants"



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
const setNotificationData = (payload = {}) => {
    return async (dispatch) => {
        dispatch({
            type: SETNOTIFICATIONDATA,
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
    setNotificationData
}