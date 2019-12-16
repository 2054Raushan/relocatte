/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';
import { commonReducer } from './shared/redux/CommonReducer';
// import searchCustomerReducer from './shared/components/searchCustomer/SearchCustomerReducer';

export default combineReducers({
    commonReducer,
    // searchCustomerReducer,
});
