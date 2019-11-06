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
      return <Details information={films[5]} films={films} clickHandler={() => {}} />;
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
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        posterlarge: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        ratingCount: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        actors: PropTypes.array.isRequired,
      }).isRequired).isRequired,
};

export default App;
