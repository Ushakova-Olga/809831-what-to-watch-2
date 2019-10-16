import React from "react";
import ReactDOM from "react-dom";
import MainScreen from "./components/main-screen";

const init = () => {

  ReactDOM.render(
      <MainScreen>
      </MainScreen>,
      document.querySelector(`#root`)
  );
};

init();
