/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import promiseState from '../utils/reduxReducerHelper';

import {
    setCommonDrawerVisibilityType
} from './CommonActions';

const initialState = {
    commonDrawer: {
        title: '',
        visible: false,
        body: null,
    },
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
    case setCommonDrawerVisibilityType:
        return Object.assign({}, state, {
            commonDrawer: { ...state.commonDrawer, ...action.payload },
        });
    default:
        return state;
    }
};

export {
    commonReducer
};
