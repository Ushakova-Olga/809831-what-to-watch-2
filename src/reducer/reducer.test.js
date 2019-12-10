import {ActionCreator, reducer, Operation} from "./reducer";
import configureAPI from "../api";
import MockAdapter from "axios-mock-adapter";
import FILMS from "../mocks/films.js";

/* const LOAD_FILMS = `LOAD_FILMS`;
const LOAD_PROMO_FILM = `LOAD_PROMO_FILM`;
const LOAD_COMMENTS = `LOAD_COMMENTS`;
const LOAD_FAVORITE_FILMS = `LOAD_FAVORITE_FILMS`;
const CHANGE_IS_AUTHORIZATION_REQUIRED = `CHANGE_IS_AUTHORIZATION_REQUIRED`;
const ENTER_USER = `ENTER_USER`;
const SET_GENRE = `SET_GENRE`;
const ADD_COUNT_FILMS = `ADD_COUNT_FILMS`;
const CHANGE_ACTIVE_FILM = `CHANGE_ACTIVE_FILM`;
const CHANGE_FAVORITE = `CHANGE_FAVORITE`;
const CHANGE_ACTIVE_STATUS = `CHANGE_ACTIVE_STATUS`;*/

import {LOAD_FILMS, LOAD_PROMO_FILM, LOAD_COMMENTS, LOAD_FAVORITE_FILMS, CHANGE_IS_AUTHORIZATION_REQUIRED,
  ENTER_USER, SET_GENRE, ADD_COUNT_FILMS, CHANGE_ACTIVE_FILM, CHANGE_FAVORITE, CHANGE_ACTIVE_STATUS} from "../util/constants";

it(`Reducer correctly set a genre`, () => {
  expect(
      reducer(
          {
            genre: `All genres`,
            films: FILMS,
            initialFilms: FILMS
          },
          {
            type: SET_GENRE,
            payload: `drama`
          }
      )
  ).toEqual({
    genre: `drama`,
    films: FILMS,
    initialFilms: FILMS
  });
});

it(`Action creator correctly set genre`, () => {
  expect(ActionCreator.setNewFilmsGenre(`drama`)).toEqual({
    type: SET_GENRE,
    payload: `drama`
  });
});

it(`Action creator correctly load films`, () => {
  const dispatch = jest.fn();
  const loadFilms = Operation.loadFilms();

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`films`)
    .reply(200, [{fake: true}]);

  return loadFilms(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: LOAD_FILMS,
        payload: [{fake: true}],
      });
    });
});


it(`Action creator correctly load comments`, () => {
  const dispatch = jest.fn();
  const loadComments = Operation.loadComments(1);

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`comments/1`)
    .reply(200, [{fake: true}]);

  return loadComments(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: LOAD_COMMENTS,
        payload: [{fake: true}],
      });
    });
});

it(`Action creator correctly load favorite films`, () => {
  const dispatch = jest.fn();
  const loadFavoriteFilms = Operation.loadFavoriteFilms();

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`favorite`)
    .reply(200, [{fake: true}]);

  return loadFavoriteFilms(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: LOAD_FAVORITE_FILMS,
        payload: [{fake: true}],
      });
    });
});

it(`Action creator correctly load promo film`, () => {
  const dispatch = jest.fn();
  const loadPromoFilm = Operation.loadPromoFilm();

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`films/promo`)
    .reply(200, [{fake: true}]);

  return loadPromoFilm(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: LOAD_PROMO_FILM,
        payload: {0: {fake: true}},
      });
    });
});

it(`Reducer correctly change isAuthorizationRequired`, () => {
  expect(
      reducer(
          {
            isAuthorizationRequired: false,
          },
          {
            type: CHANGE_IS_AUTHORIZATION_REQUIRED,
            payload: true
          }
      )
  ).toEqual({
    isAuthorizationRequired: true,
  });
});

it(`Action creator correctly enters user`, () => {
  const dispatch = jest.fn();
  const logIn = Operation.logIn(`test@mail.ru`, `12345`);

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onPost(`login`)
    .reply(200, [{email: `test@mail.ru`, password: `12345`}]);

  return logIn(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: CHANGE_IS_AUTHORIZATION_REQUIRED,
        payload: false,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ENTER_USER,
        payload: {0: {email: `test@mail.ru`, password: `12345`}},
      });
    });
});

it(`Reducer correctly change filmsCount`, () => {
  expect(
      reducer(
          {
            filmsCount: 8,
          },
          {
            type: ADD_COUNT_FILMS,
            payload: 20,
          }
      )
  ).toEqual({
    filmsCount: 28,
  });
});

it(`Reducer correctly change activeFilmId`, () => {
  expect(
      reducer(
          {
            activeFilmId: 1,
          },
          {
            type: CHANGE_ACTIVE_FILM,
            payload: 2,
          }
      )
  ).toEqual({
    activeFilmId: 2,
  });
});

it(`Action creator correctly changeFavorite`, () => {
  const dispatch = jest.fn();
  const changeFavorite = Operation.changeFavorite(1, true);

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onPost(`favorite/1/1`)
    .reply(200, 1);

  return changeFavorite(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: CHANGE_FAVORITE,
        payload: 1,
      });
    });
});

it(`Reducer correctly change isFilmPlaying`, () => {
  expect(
      reducer(
          {
            isFilmPlaying: false,
          },
          {
            type: CHANGE_ACTIVE_STATUS,
            payload: true,
          }
      )
  ).toEqual({
    isFilmPlaying: true,
  });
});

it(`Action creator correctly uploadReview`, () => {
  const dispatch = jest.fn();
  const upload = Operation.uploadReview(1, {rating: 3, comment: `Good`});

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onPost(`/comments/1`)
    .reply(200, {0: {rating: 3, comment: `Good`}, 1: {rating: 5, comment: `Very Good`}});

  return upload(dispatch, {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: LOAD_COMMENTS,
      payload: {
        0: {rating: 3, comment: `Good`},
        1: {rating: 5, comment: `Very Good`}
      },
    });
  });
});
