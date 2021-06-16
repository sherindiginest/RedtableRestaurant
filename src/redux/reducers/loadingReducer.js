import { LOADER } from "./../../constants/constants";

const initialState = {
    loading: false
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return { ...state };
    }
};

export default loadingReducer;
