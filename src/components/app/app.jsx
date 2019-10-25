import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import MainScreen from "../../components/main-screen/main-screen.jsx";

const App = (props) => {
  const {films} = props;
  return <MainScreen
      films={films}
    />;
};

App.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};

export default App;
