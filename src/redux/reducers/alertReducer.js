import { SHOWALERT } from '../../constants/constants'

const initialState = {
    alertParams: {
        visible: false
    }
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWALERT:
            return {
                ...state,
                alertParams: action.payload
            }
        default:
            return { ...state }
    }

}


export default alertReducer





