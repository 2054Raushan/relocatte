/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { payloadActionCreator } from '../utils/reduxActionHelper';

const setCommonDrawerVisibilityType = 'SET_COMMON_DRAWER_VISIBLE';
const setCommonDrawerVisibility = payload => payloadActionCreator(setCommonDrawerVisibilityType, payload);


export {
    setCommonDrawerVisibilityType,
    setCommonDrawerVisibility,
};
