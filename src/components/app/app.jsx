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
import PageNotFound from "../../components/page-not-found/page-not-found.jsx";

const VideoPlayerLargeWrapped = withVideoPlayerLarge(VideoPlayerLarge);

const getFilms = (genre, filmsList) => {
  if (genre.toLowerCase() === `all genres`) {
    return filmsList;
  }

  return filmsList.filter((it) => it.genre.toLowerCase() === genre.toLowerCase());
};

const getPageScreen = (props) => {
  const {
    initialFilms,
    onClickFilter,
    filmsCount,
    onClickMore,
    currentGenre,
    isAuthorizationRequired,
    onSubmit,
    userData,
    // activeFilmId,
    onChangeFavorite,
    onChangeActiveFilm,
    onLoadFavoriteFilms,
    favoriteFilms,
    onOpenCloseFilm,
    isFilmPlaying,
    comments,
    onLoadComments,
    isFavoriteActually,
    promoFilm,
    history,
  } = props;

  return <Switch>
    <Route path="/" exact render={() => {
      return !isFilmPlaying ? <MainScreen
        films={getFilms(currentGenre, initialFilms)}
        initialFilms={initialFilms}
        filmsCount={filmsCount}
        currentGenre={currentGenre}
        onClickFilter={onClickFilter}
        onClickMore={onClickMore}
        userData={userData}
        isAuthorizationRequired={isAuthorizationRequired}
        promoFilm={promoFilm}
        onClickFavorite={onChangeFavorite}
        onOpenCloseFilm={onOpenCloseFilm}
        history={history} /> :
        <VideoPlayerLargeWrapped information={promoFilm} onOpenCloseFilm={onOpenCloseFilm} />;
    }}
    />
    <Route path="/login" exact render={() => {
      return <SignIn onSubmit={onSubmit} isAuthorizationRequired={isAuthorizationRequired} />;
    }}
    />
    <Route path="/films/:id" exact render={(routerProps) => {
      const id = parseInt(routerProps.match.params.id, 10);

      const result = initialFilms.filter((it) => it.id === id);
      const isNotFound = (result.length <= 0) ? true : false;

      if (!isNotFound) {
        onChangeActiveFilm(id);
        let information = {};
        information = result.length > 0 ? result[0] : {
          id: 0,
          name: ``,
          previewImage: ``,
          previewVideoLink: ``,
          videoLink: ``,
        };

        return !isFilmPlaying ? <Details
          activeFilmId={id}
          films={initialFilms}
          userData={userData}
          isAuthorizationRequired={isAuthorizationRequired}
          onClickFavorite={onChangeFavorite}
          onOpenCloseFilm={onOpenCloseFilm}
          comments={comments}
          history={history}
          onLoadComments={onLoadComments} /> :
          <VideoPlayerLargeWrapped information={information} onOpenCloseFilm={onOpenCloseFilm} />;
      } else {
        return <PageNotFound />;
      }
    }}
    />
    <Route path="/films/:id/review" exact render={(routerProps) => {
      const id = parseInt(routerProps.match.params.id, 10);
      const result = initialFilms.filter((it) => it.id === id);
      const isNotFound = (result.length <= 0) ? true : false;

      if (!isNotFound) {
        const AddReviewWrapped = withLogin(withFormSubmit(AddReview));
        onChangeActiveFilm(id);
        const films = getFilms(currentGenre, initialFilms);
        return <AddReviewWrapped
          films={films}
          initialFilms={initialFilms}
          userData={userData} id={id}
          history={history}
        />;
      } else {
        return <PageNotFound />;
      }
    }}
    />
    <Route path="/mylist" exact render={() => {
      const FavoriteListWrapped = withLogin(FavoriteList);
      if (!isFavoriteActually) {
        onLoadFavoriteFilms();
      }
      return <FavoriteListWrapped
        isAuthorizationRequired={isAuthorizationRequired}
        userData={userData}
        films={favoriteFilms}
        filmsCount={filmsCount}
        onOpenCloseFilm={onOpenCloseFilm}
      />;
    }}
    />
    <Route render={() => {
      return <PageNotFound />;
    }}
    />
  </Switch>;
};

const App = (props) => {
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};

getPageScreen.propTypes = {
  initialFilms: PropTypes.arrayOf(
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
  onClickFilter: PropTypes.func,
  filmsCount: PropTypes.number.isRequired,
  onClickMore: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  activeFilmId: PropTypes.number.isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
  onChangeActiveFilm: PropTypes.func.isRequired,
  onLoadFavoriteFilms: PropTypes.func.isRequired,
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
  onOpenCloseFilm: PropTypes.func,
  isFilmPlaying: PropTypes.bool.isRequired,
  onLoadComments: PropTypes.func,
  isFavoriteActually: PropTypes.bool.isRequired,
  promoFilm: PropTypes.shape({
    name: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string,
    released: PropTypes.number,
    posterImage: PropTypes.string,
    backgroundImage: PropTypes.string,
    previewVideoLink: PropTypes.string,
    scoresCount: PropTypes.number,
    description: PropTypes.string,
    starring: PropTypes.array,
    director: PropTypes.string,
    runTime: PropTypes.number,
    rating: PropTypes.number,
    videoLink: PropTypes.string,
    isFavorite: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
};

const mapStateToProps = (state) => ({
  currentGenre: state.genre,
  films: state.films,
  filmsCount: state.filmsCount,
  initialFilms: state.initialFilms,
  isAuthorizationRequired: state.isAuthorizationRequired,
  userData: state.userData,
  activeFilmId: state.activeFilmId,
  favoriteFilms: state.favoriteFilms,
  isFilmPlaying: state.isFilmPlaying,
  comments: state.comments,
  isFavoriteActually: state.isFavoriteActually,
  promoFilm: state.promoFilm,
});

const mapDispatchToProps = (dispatch) => ({
  onClickFilter: (genre) => {
    dispatch(ActionCreator.setNewFilmsGenre(genre));
  },
  onClickMore: () => {
    dispatch(ActionCreator.addCountFilms());
  },
  onSubmit: (email, password) => {
    dispatch(Operation.logIn(email, password));
  },
  onChangeFavorite: (id, isFavorite) => {
    dispatch(Operation.changeFavorite(id, isFavorite));
  },
  onChangeActiveFilm: (id) => {
    dispatch(ActionCreator.changeActiveFilm(id));
  },
  onLoadFavoriteFilms: () => {
    dispatch(Operation.loadFavoriteFilms());
  },
  onOpenCloseFilm: (status) => {
    dispatch(ActionCreator.onOpenCloseFilm(status));
  },
  onLoadComments: (id) => {
    dispatch(Operation.loadComments(id));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
