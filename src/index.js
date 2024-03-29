import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer, Operation} from "./reducer/reducer";
import {Router} from "react-router-dom";
import App from "./components/app/app.jsx";
import thunk from "redux-thunk";
import configureAPI from "./api";
import {applyMiddleware} from "redux";
import {compose} from "recompose";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

const init = () => {
  const api = configureAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );
  store.dispatch(Operation.loadFilms());
  store.dispatch(Operation.loadPromoFilm());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App history={history} />
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
