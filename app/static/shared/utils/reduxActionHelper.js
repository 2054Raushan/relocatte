import axios from 'axios';

export const asyncActionTypeCreator = actionName => ({
    pending: `${actionName}_PENDING`,
    fulfilled: `${actionName}_FULFILLED`,
    rejected: `${actionName}_REJECTED`,
});

export const normalActionCreator = type => ({
    type,
});

export const payloadActionCreator = (type, payload) => ({
    type,
    payload,
});

export const asyncActionCreator = (actionType) => {
    const pending = () => (normalActionCreator(actionType.pending));
    const fulfilled = payload => (payloadActionCreator(actionType.fulfilled, payload));
    const rejected = () => (normalActionCreator(actionType.rejected));
    const action = (axiosConfig, sucessCallBack, errorCallBack) => (
        (dispatch) => {
            dispatch(pending());
            return axios(axiosConfig).then((response) => {
                dispatch(fulfilled(response.data));
                if (sucessCallBack) {
                    sucessCallBack(response);
                }
            }).catch((response) => {
                dispatch(rejected());
                if (errorCallBack) {
                    errorCallBack(response);
                }
            });
        });
    return {
        pending,
        fulfilled,
        rejected,
        action,
    };
};
