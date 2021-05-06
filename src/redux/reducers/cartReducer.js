import { CART_LIST } from "./../../constants/constants";

const initialState = {
    cartList: [],
    branchId: null,
    serviceFee: "0"
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_LIST:
            return {
                ...state,
                cartList: action.payload,
                branchId: action.branchId,
                serviceFee: action.serviceFee,
            };
        default:
            return { ...state };
    }
};

export default cartReducer;
