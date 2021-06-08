import { SETPROFILEDATA, SETADDRESSLIST, SETCARTLIST, SETADDRESSSELECT, SETNEWADDRESS } from "../../constants/constants"

const initialState = {
    userData: {},
    addressList: [],
    cartList: {},
    visibleSelectAddress: false,
    visibleAddnewAddress: false
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
        case SETADDRESSSELECT:
            return {
                ...state,
                visibleSelectAddress: action.payload
            }
        case SETNEWADDRESS:
            return {
                ...state,
                visibleAddnewAddress: action.payload
            }
        default:
            return { ...state }
    }
}

export default profileReducer
