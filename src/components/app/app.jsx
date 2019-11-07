import React from "react";
import PropTypes from 'prop-types';
import MainScreen from "../../components/main-screen/main-screen.jsx";
import Details from "../../components/details/details.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

const getPageScreen = (props) => {
  const {genre, films, clickFilterHandler} = props;
  switch (location.pathname) {
    case `/`:
      return <MainScreen films={films} clickHandler={() => {}} clickFilterHandler={clickFilterHandler} />;
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

const mapStateToProps = (state) => ({
  films: state.films
});


const mapDispatchToProps = (dispatch) => ({
  clickFilterHandler: (genre) => {
    dispatch(ActionCreator.setNewFilmsGenre(genre));
    dispatch(ActionCreator.getFilmsListOnGenre(genre));
  }
});

//export default App;
export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
