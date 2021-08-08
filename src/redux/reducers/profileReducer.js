import { SETPROFILEDATA, SETADDRESSLIST, SETCARTLIST, SETADDRESSSELECT, SETNEWADDRESS, SETPICKUPMODE, ASKPICKUPMODE, SETNOTIFICATIONDATA } from "../../constants/constants"

const initialState = {
    userData: {},
    addressList: [],
    cartList: {},
    visibleSelectAddress: { visible: false },
    addnewAddressParams: { visible: false },
    pickupMode: "delivery",
    askForPickupMode: true,
    notificationData: {}
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
                addnewAddressParams: action.payload
            }
        case SETPICKUPMODE:
            return {
                ...state,
                pickupMode: action.payload
            }
        case ASKPICKUPMODE:
            return {
                ...state,
                askForPickupMode: action.payload
            }
        case SETNOTIFICATIONDATA:
            return {
                ...state,
                notificationData: action.payload
            }
        default:
            return { ...state }
    }
}

export default profileReducer
