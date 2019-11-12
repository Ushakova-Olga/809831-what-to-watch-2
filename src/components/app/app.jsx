import React from "react";
import PropTypes from 'prop-types';
import MainScreen from "../../components/main-screen/main-screen.jsx";
import Details from "../../components/details/details.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

const getPageScreen = (props) => {
  const {films, clickFilterHandler, countFilms, clickMoreButton} = props;
  switch (location.pathname) {
    case `/`:
      return <MainScreen films={films} countFilms={countFilms} clickHandler={() => {}} clickFilterHandler={clickFilterHandler} clickHandlerMore={clickMoreButton} />;
    case `/details`:
      return <Details information={films[5]} films={films} countFilms={countFilms} clickHandler={() => {}} />;
  }
  return <MainScreen films={films} countFilms={countFilms} clickHandler={() => {}} clickHandlerMore={clickMoreButton} />;
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
  clickFilterHandler: PropTypes.func,
  countFilms: PropTypes.number.isRequired,
  clickMoreButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  countFilms: state.filmsCount,
});

const mapDispatchToProps = (dispatch) => ({
  clickFilterHandler: (genre) => {
    dispatch(ActionCreator.setNewFilmsGenre(genre));
    dispatch(ActionCreator.getFilmsListOnGenre(genre));
  },
  clickMoreButton: () => {
    dispatch(ActionCreator.addCountFilms());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
