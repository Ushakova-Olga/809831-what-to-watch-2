import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer/reducer";

import App from "./components/app/app.jsx";

import thunk from "redux-thunk";
import configureAPI from "../api";
import {applyMiddleware} from "redux";

// configreAPI - функция из модуля api.js,
// созданная в третьем шаге.
const api = configureAPI((...args) => store.dispatch(...args));

const init = () => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );

  ReactDOM.render(
      <Provider store={store}>
        <App
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
