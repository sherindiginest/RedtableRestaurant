import {LOADER} from './../../constants/constants';

const showLoader = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADER,
      payload: true,
    });
  };
};
const hideLoader = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADER,
      payload: false,
    });
  };
};

export default {
  showLoader,
  hideLoader,
};
