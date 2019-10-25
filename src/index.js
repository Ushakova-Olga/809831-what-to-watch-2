import React from "react";
import ReactDOM from "react-dom";
//import MainScreen from "./components/main-screen/main-screen.jsx";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

/*const init = () => {

  ReactDOM.render(
      <MainScreen
        films={films}
      />,
      document.querySelector(`#root`)
  );
};*/

const init = () => {

  ReactDOM.render(
      <App
        films={films}
      />,
      document.querySelector(`#root`)
  );
};

init();
