import { SETADDRESSLIST, SETCARTLIST, SETPROFILEDATA } from "../../constants/constants"



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


export default {
    setProfileData,
    setAddressList,
    setCartList
}