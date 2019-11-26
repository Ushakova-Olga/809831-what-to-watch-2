import React from "react";
import ListFilms from "../../components/list-films/list-films.jsx";
import ListGenres from "../../components/list-genres/list-genres.jsx";
import ShowMore from "../../components/show-more/show-more.jsx";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MainScreen = (props) => {
  const {films, filmsInitial, clickHandler, clickFilterHandler, clickHandlerMore, countFilms, currentGenre, isAuthorizationRequired, userData, clickFavoriteHandler, activeFilm} = props;
  let currentFilm = {};
  const result = filmsInitial.filter((it) => it.id === activeFilm);
  currentFilm = result.length > 0 ? result[0] : {};

  return <>
      {activeFilm > 0 ? <section className="movie-card">
        <div className="movie-card__bg">
          <img src={currentFilm.previewImage} alt={currentFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        {isAuthorizationRequired ?
          <header className="page-header">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <Link to={`/login`} className="user-block__link">Sign in</Link>
            </div>
          </header>
          :
          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <Link to={`/mylist`}>
                <div className="user-block__avatar">
                  <img src={`https://htmlacademy-react-2.appspot.com${userData.avatarUrl}`} alt="User avatar" width="63" height="63" />
                </div>
              </Link>
            </div>
          </header>
        }

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={currentFilm.posterImage} alt={currentFilm.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title" onClick={clickHandler}>{currentFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{currentFilm.genre}</span>
                <span className="movie-card__year">{currentFilm.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => {
                  window.location.href = `/film:${activeFilm}`;
                }}>
                  <svg viewboxname="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  currentFilm.isFavorite ?
                    <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                      clickFavoriteHandler(activeFilm, !currentFilm.isFavorite);
                    }}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                    : <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                      clickFavoriteHandler(activeFilm, !currentFilm.isFavorite);
                    }}>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
        : ``}

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ListGenres filmsInitial={filmsInitial} clickFilterHandler={clickFilterHandler} currentGenre={currentGenre} />

          <ListFilms films={films} countFilms={countFilms} clickHandler={clickHandler} />

          <ShowMore clickHandlerMore={clickHandlerMore} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>;
};

MainScreen.propTypes = {
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
  clickHandler: PropTypes.func,
  clickFilterHandler: PropTypes.func,
  countFilms: PropTypes.number.isRequired,
  clickHandlerMore: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  clickFavoriteHandler: PropTypes.func.isRequired,
  activeFilm: PropTypes.number.isRequired,
};

export default MainScreen;
