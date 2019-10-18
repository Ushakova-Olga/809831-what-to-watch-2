import React from "react";
import ReactDOM from "react-dom";
import MainScreen from "./components/main-screen/main-screen.jsx";

const init = () => {
  const settings = {
    names: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`],
  };

  ReactDOM.render(
      <MainScreen
        names={settings.names}
      />,
      document.querySelector(`#root`)
  );
};

init();
