import { SETADDRESSLIST, SETADDRESSSELECT, SETCARTLIST, SETPROFILEDATA, SETNEWADDRESS, SETPICKUPMODE } from "../../constants/constants"



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

const showAddressSelect = (payload = false) => {
    return async (dispatch) => {
        dispatch({
            type: SETADDRESSSELECT,
            payload,
        })
    }
}

const showAddNewAddress = (payload = false) => {
    return async (dispatch) => {
        dispatch({
            type: SETNEWADDRESS,
            payload,
        })
    }
}
const setPickupMode = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: SETPICKUPMODE,
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
    setPickupMode
}