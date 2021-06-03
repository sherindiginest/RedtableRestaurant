import { SETPROFILEDATA, SETADDRESSLIST, SETCARTLIST } from "../../constants/constants"

const initialState = {
    userData: {},
    addressList: [],
    cartList: {}
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETPROFILEDATA:
            return {
                ...state,
                userData: action.payload
            }
        case SETADDRESSLIST:
            return {
                ...state,
                addressList: action.payload
            }
        case SETCARTLIST:
            return {
                ...state,
                cartList: action.payload
            }
        default:
            return { ...state }
    }
}

export default profileReducer
