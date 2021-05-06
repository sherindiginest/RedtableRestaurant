import { PROFILE_INFO } from "../../constants/constants";

const initialState = {
    profileInfo: []
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.payload
            };
        default:
            return { ...state };
    }
};

export default profileReducer;
