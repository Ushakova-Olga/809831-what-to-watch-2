import React from "react";
import PropTypes from 'prop-types';
import MainScreen from "../../components/main-screen/main-screen.jsx";

const App = (props) => {
  const {films} = props;
  return <MainScreen
    films={films}
    clickHandler={() => {}}
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
