import React from "react";
import PropTypes from 'prop-types';
import MainScreen from "../../components/main-screen/main-screen.jsx";
import Details from "../../components/details/details.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

import VideoPlayerLarge from "../../components/video-player-large/video-player-large.jsx";
import withVideoPlayerLarge from '../../hocs/with-video-player-large/with-video-player-large.jsx';

const VideoPlayerLargeWrapped = withVideoPlayerLarge(VideoPlayerLarge);

const getPageScreen = (props) => {
  const {films, clickFilterHandler, countFilms, clickMoreButton, currentGenre} = props;
  switch (location.pathname) {
    case `/`:
      return <MainScreen films={films} countFilms={countFilms} currentGenre={currentGenre} clickHandler={() => {}} clickFilterHandler={clickFilterHandler} clickHandlerMore={clickMoreButton} />;
    case `/details`:
      return <Details information={films[5]} films={films} countFilms={countFilms} clickHandler={() => {}} />;
    case `/film`:
      return <VideoPlayerLargeWrapped information={films[0]} />;
  }
  return <MainScreen films={films} countFilms={countFilms} currentGenre={currentGenre} clickHandler={() => {}} clickHandlerMore={clickMoreButton} />;
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
  currentGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.genre,
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
