import React from "react";
import PropTypes from "prop-types";
import SignIn from "../../components/sign-in/sign-in.jsx";
import MainScreen from "../../components/main-screen/main-screen.jsx";
import Details from "../../components/details/details.jsx";
import AddReview from "../../components/add-review/add-review.jsx";
import FavoriteList from "../../components/favorite-list/favorite-list.jsx";
import {connect} from "react-redux";
import {Operation, ActionCreator} from "../../reducer/reducer";
import {Switch, Route} from "react-router-dom";
import withLogin from "../../hocs/with-login/with-login.jsx";

import VideoPlayerLarge from "../../components/video-player-large/video-player-large.jsx";
import withVideoPlayerLarge from '../../hocs/with-video-player-large/with-video-player-large.jsx';
import withFormSubmit from '../../hocs/with-form-submit/with-form-submit.jsx';

const VideoPlayerLargeWrapped = withVideoPlayerLarge(VideoPlayerLarge);

const getPageScreen = (props) => {
  const {
    films,
    filmsInitial,
    clickFilterHandler,
    countFilms,
    clickMoreButton,
    currentGenre,
    isAuthorizationRequired,
    submitHandler,
    userData,
    activeFilm,
    changeFavoriteHandler,
    changeActiveFilmHandler,
    loadFavoriteFilmsHandler,
    favoriteFilms,
    openCloseFilm,
    isFilmPlaying,
    comments,
    loadCommentsHandler,
    isFavoriteActually,
    promoFilm,
  } = props;
  return <Switch>
    <Route path="/" exact render={() => {
      /*const result = films.filter((it) => it.id === activeFilm);
      let information = {};
      information = result.length > 0 ? result[0] : {
        id: 0,
        name: ``,
        previewImage: ``,
        previewVideoLink: ``,
        videoLink: ``,
      };*/

      return !isFilmPlaying ? <MainScreen
        films={films}
        filmsInitial={filmsInitial}
        countFilms={countFilms}
        currentGenre={currentGenre}
        clickHandler={() => {}}
        clickFilterHandler={clickFilterHandler}
        clickHandlerMore={clickMoreButton}
        userData={userData}
        isAuthorizationRequired={isAuthorizationRequired}
        promoFilm={promoFilm}
        clickPlayHandler={() => {}}
        clickFavoriteHandler={changeFavoriteHandler}
        openCloseFilm={openCloseFilm} /> :
        <VideoPlayerLargeWrapped information={promoFilm} openCloseFilm={openCloseFilm} />;
    }}
    />
    <Route path="/login" exact render={() => {
      return <SignIn submitHandler={submitHandler} isAuthorizationRequired={isAuthorizationRequired} />;
    }}
    />
    <Route path="/films/:id" exact render={(routerProps) => {
      const id = parseInt(routerProps.match.params.id, 10);
      changeActiveFilmHandler(id);
      if ((activeFilm !== id) || (comments.length === 0)) {
        loadCommentsHandler(id);
      }

      const result = films.filter((it) => it.id === activeFilm);
      let information = {};
      information = result.length > 0 ? result[0] : {
        id: 0,
        name: ``,
        previewImage: ``,
        previewVideoLink: ``,
        videoLink: ``,
      };

      return !isFilmPlaying ? <Details
        activeFilm={id}
        films={filmsInitial}
        clickHandler={() => {}}
        userData={userData}
        isAuthorizationRequired={isAuthorizationRequired}
        clickFavoriteHandler={changeFavoriteHandler}
        openCloseFilm={openCloseFilm}
        comments={comments} /> :
        <VideoPlayerLargeWrapped information={information} openCloseFilm={openCloseFilm} />;
    }}
    />
    <Route path="/films/:id/review" exact render={(routerProps) => {
      const AddReviewWrapped = withLogin(withFormSubmit(AddReview));
      const id = parseInt(routerProps.match.params.id, 10);
      changeActiveFilmHandler(id);
      return <AddReviewWrapped
        films={films}
        filmsInitial={filmsInitial}
        userData={userData} id={id}
      />;
    }}
    />
    <Route path="/mylist" exact render={() => {
      const FavoriteListWrapped = withLogin(FavoriteList);
      if (!isFavoriteActually) {
        loadFavoriteFilmsHandler();
      }
      return <FavoriteListWrapped
        isAuthorizationRequired={isAuthorizationRequired}
        userData={userData}
        films={favoriteFilms}
        countFilms={countFilms}
        clickHandler={() => {}}
        openCloseFilm={openCloseFilm}
      />;
    }}
    />
  </Switch>;
};

const App = (props) => {
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};

getPageScreen.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        released: PropTypes.number.isRequired,
        posterImage: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired,
        previewVideoLink: PropTypes.string.isRequired,
        scoresCount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        runTime: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        videoLink: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
      }).isRequired).isRequired,
  filmsInitial: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        released: PropTypes.number.isRequired,
        posterImage: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired,
        previewVideoLink: PropTypes.string.isRequired,
        scoresCount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        runTime: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        videoLink: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
      }).isRequired).isRequired,
  clickFilterHandler: PropTypes.func,
  countFilms: PropTypes.number.isRequired,
  clickMoreButton: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  submitHandler: PropTypes.func.isRequired,
  activeFilm: PropTypes.number.isRequired,
  changeFavoriteHandler: PropTypes.func.isRequired,
  changeActiveFilmHandler: PropTypes.func.isRequired,
  loadFavoriteFilmsHandler: PropTypes.func.isRequired,
  favoriteFilms: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        released: PropTypes.number.isRequired,
        posterImage: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired,
        previewVideoLink: PropTypes.string.isRequired,
        scoresCount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        runTime: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        videoLink: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
      }).isRequired).isRequired,
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired).isRequired,
  openCloseFilm: PropTypes.func,
  isFilmPlaying: PropTypes.bool.isRequired,
  loadCommentsHandler: PropTypes.func,
  isFavoriteActually: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.genre,
  films: state.films,
  countFilms: state.filmsCount,
  filmsInitial: state.filmsInitial,
  isAuthorizationRequired: state.isAuthorizationRequired,
  userData: state.userData,
  activeFilm: state.activeFilm,
  favoriteFilms: state.favoriteFilms,
  isFilmPlaying: state.isFilmPlaying,
  comments: state.comments,
  isFavoriteActually: state.isFavoriteActually,
  promoFilm: state.promoFilm,
});

const mapDispatchToProps = (dispatch) => ({
  clickFilterHandler: (genre) => {
    dispatch(ActionCreator.setNewFilmsGenre(genre));
    dispatch(ActionCreator.getFilmsListOnGenre(genre));
  },
  clickMoreButton: () => {
    dispatch(ActionCreator.addCountFilms());
  },
  submitHandler: (email, password) => {
    dispatch(Operation.logIn(email, password));
  },
  changeFavoriteHandler: (id, isFavorite) => {
    dispatch(Operation.changeFavorite(id, isFavorite));
  },
  changeActiveFilmHandler: (id) => {
    dispatch(ActionCreator.changeActiveFilm(id));
  },
  loadFavoriteFilmsHandler: () => {
    dispatch(Operation.loadFavoriteFilms());
  },
  openCloseFilm: (status) => {
    dispatch(ActionCreator.openCloseFilm(status));
  },
  loadCommentsHandler: (id) => {
    dispatch(Operation.loadComments(id));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
