import React from "react";
import PropTypes from 'prop-types';
import MainScreen from "../../components/main-screen/main-screen.jsx";
import Details from "../../components/details/details.jsx";

const getPageScreen = (props) => {
  const {films} = props;
  switch (location.pathname) {
    case `/`:
      return <MainScreen films={films} clickHandler={() => {}} />;
    case `/details`:
      return <Details information={films[5]} />;
  }
  return <MainScreen films={films} clickHandler={() => {}} />;
};

const App = (props) => {
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};

getPageScreen.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
      }).isRequired).isRequired,
};

export default App;
