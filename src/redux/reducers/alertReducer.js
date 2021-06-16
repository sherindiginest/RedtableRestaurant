import { SHOW_ALERT } from '../../constants/constants'

const initialState = {
    alertParams: {
        visible: false
    }
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alertParams: action.payload
            }
        default:
            return { ...state }
    }

}


export default alertReducer





