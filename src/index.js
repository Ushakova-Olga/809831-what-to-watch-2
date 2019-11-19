import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer, LoadFromServer} from "./reducer/reducer";

import App from "./components/app/app.jsx";

import thunk from "redux-thunk";
import configureAPI from "./api";
import {applyMiddleware} from "redux";
import {compose} from 'recompose';

const api = configureAPI((...args) => store.dispatch(...args));

const init = () => {
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );
  store.dispatch(LoadFromServer.loadFilms());

  ReactDOM.render(
      <Provider store={store}>
        <App
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
