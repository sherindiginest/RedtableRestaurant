import { combineReducers } from 'redux';
import { i18nState } from 'redux-i18n';
import loadingReducer from './loadingReducer';
//import cartReducer from "./cartReducer"
import ProfileReducer from "./profileReducer"
//import alertReducer from './alertReducer'

const appReducer = combineReducers({
  i18nState,
  loadingReducer,
  //cartReducer,
  ProfileReducer,
  //alertReducer, 
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    const { i18nState } = state;
    state = { i18nState };
  }
  return appReducer(state, action);
};
