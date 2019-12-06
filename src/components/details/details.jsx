import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import ListFilms from "../../components/list-films/list-films.jsx";
import UserBlock from "../../components/user-block/user-block.jsx";
import {Link} from "react-router-dom";
import withTabs from "../../hocs/with-tabs/with-tabs.jsx";

const TabsWrapped = withTabs(Tabs);

const Details = (props) => {
  const {
    activeFilm,
    films,
    clickHandler,
    isAuthorizationRequired,
    clickFavoriteHandler,
    userData,
    openCloseFilm,
    comments,
    history,
  } = props;

  const result = films.filter((it) => it.id === activeFilm);
  let information = {};
  information = result.length > 0 ? result[0] : {
    id: 0,
    name: ``,
    previewImage: ``,
    genre: ``,
    released: 0,
    posterImage: ``,
    backgroundImage: ``,
    previewVideoLink: ``,
    videoLink: ``,
    rating: 0,
    scoresCount: 0,
    director: ``,
    starring: [],
    runTime: 0,
    description: ``,
    isFavorite: false,
  };

  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = information;

  return <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link className="logo__link" to="/">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <UserBlock isAuthorizationRequired={isAuthorizationRequired} userData={userData} />
          </header>


          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => {
                  openCloseFilm(true);
                }}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  information.isFavorite ?
                    <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                      if (!isAuthorizationRequired) {
                        clickFavoriteHandler(activeFilm, !information.isFavorite);
                      } else {
                        history.push(`/login`);
                      }
                    }}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                    : <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                      if (!isAuthorizationRequired) {
                        clickFavoriteHandler(activeFilm, !information.isFavorite);
                      } else {
                        history.push(`/login`);
                      }
                    }}>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                }
                {isAuthorizationRequired ? `` : <Link className="btn movie-card__button" to={`/films/${activeFilm}/review`}>Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <TabsWrapped information={information} comments={comments} />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <ListFilms films={films.filter((it) => it.genre === genre)} countFilms={8} clickHandler={clickHandler} />
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
  </>;

};

Details.propTypes = {
  information: PropTypes.shape({
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
  }),
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
  clickHandler: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  activeFilm: PropTypes.number.isRequired,
  clickFilterHandler: PropTypes.func,
  clickFavoriteHandler: PropTypes.func,
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  openCloseFilm: PropTypes.func,
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
  history: PropTypes.shape({
    push: PropTypes.func
  }),
};

export default Details;
