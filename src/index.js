import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer/reducer";

import App from "./components/app/app.jsx";
//import films from "./mocks/films.js";


const init = (filmsList) => {
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store={store}>
        <App
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
