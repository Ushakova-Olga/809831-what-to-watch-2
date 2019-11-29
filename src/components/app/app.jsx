import React from "react";
import PropTypes from 'prop-types';
import SignIn from "../../components/sign-in/sign-in.jsx";
import MainScreen from "../../components/main-screen/main-screen.jsx";
import Details from "../../components/details/details.jsx";
import AddReview from "../../components/add-review/add-review.jsx";
import FavoriteList from "../../components/favorite-list/favorite-list.jsx";
import {connect} from "react-redux";
import {Operation, ActionCreator} from "../../reducer/reducer";
import {Switch, Route} from 'react-router-dom';
import withLogin from "../../hocs/with-login/with-login.jsx";

// import VideoPlayerLarge from "../../components/video-player-large/video-player-large.jsx";
// import withVideoPlayerLarge from '../../hocs/with-video-player-large/with-video-player-large.jsx';


// const VideoPlayerLargeWrapped = withVideoPlayerLarge(VideoPlayerLarge);

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
    favoriteFilms} = props;
  return <Switch>
    <Route path="/" exact render={() => {
      return <MainScreen films={films} filmsInitial={filmsInitial} countFilms={countFilms} currentGenre={currentGenre} clickHandler={() => {}} clickFilterHandler={clickFilterHandler} clickHandlerMore={clickMoreButton} userData={userData} isAuthorizationRequired={isAuthorizationRequired} activeFilm={activeFilm} clickPlayHandler={() => {}} clickFavoriteHandler={changeFavoriteHandler} />;
    }}
    />
    <Route path="/login" exact render={() => {
      return <SignIn submitHandler={submitHandler} isAuthorizationRequired={isAuthorizationRequired} />;
    }}
    />
    <Route path="/films/:id" exact render={(routerProps) => {
      const id = parseInt(routerProps.match.params.id, 10);
      changeActiveFilmHandler(id);
      return <Details activeFilm={id} films={filmsInitial} clickHandler={() => {}} userData={userData} isAuthorizationRequired={isAuthorizationRequired} clickFavoriteHandler={changeFavoriteHandler} />;
    }}
    />
    <Route path="/films/:id/review" exact render={(routerProps) => {
      const AddReviewWrapped = withLogin(AddReview);
      const id = parseInt(routerProps.match.params.id, 10);
      changeActiveFilmHandler(id);
      return <AddReviewWrapped films={films} filmsInitial={filmsInitial} userData={userData} id={id}
        submitHandler={ () => { // (text, rating)=> {
          // console.log(x);
          // console.log(y);
        }} />;
    }}
    />
    <Route path="/mylist" exact render={() => {
      const FavoriteListWrapped = withLogin(FavoriteList);
      if (favoriteFilms.length === 0) {
        loadFavoriteFilmsHandler();
      }
      return <FavoriteListWrapped isAuthorizationRequired={isAuthorizationRequired} userData={userData} films={favoriteFilms} countFilms={countFilms} clickHandler={() => {}}/>;
    }}
    />
  </Switch>;
};

/* const getPageScreen = (props) => {
  const {films, filmsInitial, clickFilterHandler, countFilms, clickMoreButton, currentGenre, isAuthorizationRequired, submitHandler, userData} = props;

  switch (location.pathname) {
    case `/`:
      return isAuthorizationRequired ? <SignIn submitHandler={submitHandler} isAuthorizationRequired={isAuthorizationRequired} /> : <MainScreen films={films} filmsInitial={filmsInitial} countFilms={countFilms} currentGenre={currentGenre} clickHandler={() => {}} clickFilterHandler={clickFilterHandler} clickHandlerMore={clickMoreButton} userData={userData} isAuthorizationRequired={isAuthorizationRequired}/>;
    case `/details`:
      return <Details information={films[0]} films={films} clickHandler={() => {}} isAuthorizationRequired={isAuthorizationRequired} />;
    case `/film`:
      return <VideoPlayerLargeWrapped information={films[0]} />;
    case `/review`:
      return isAuthorizationRequired ? <SignIn submitHandler={submitHandler} isAuthorizationRequired={isAuthorizationRequired} /> : <AddReview films={films} filmsInitial={filmsInitial} userData={userData} id={films[0].id} submitHandler={()=> {}} />;
  }
  return <MainScreen filmsInitial={filmsInitial} films={films} countFilms={countFilms} currentGenre={currentGenre} clickHandler={() => {}} clickHandlerMore={clickMoreButton} userData={userData} />;
};*/

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
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
