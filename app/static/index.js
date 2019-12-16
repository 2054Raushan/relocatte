import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import 'antd/dist/antd.css'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { pushIntoMsgModal, updateMsgModal } from "./shared/redux/CommonActions";

import { store, persistor } from "./store";
import App from "./App";

const { dispatch } = store;
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

/* request interceptors start */
axios.interceptors.request.use(
  config => {
    //Interceptor Logic
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    //Interceptor Logic
    return response;
  },
  error => Promise.reject(error)
);
