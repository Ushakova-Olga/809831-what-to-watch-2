import {ActionCreator, reducer, LoadFromServer} from "./reducer";
import configureAPI from '../api';
import MockAdapter from 'axios-mock-adapter';
import FILMS from "../mocks/films.js";

it(`Reducer correctly set a genre`, () => {
  expect(
      reducer(
          {
            genre: `All genres`,
            films: FILMS,
            filmsInitial: FILMS
          },
          {
            type: `SET_GENRE`,
            payload: `drama`
          }
      )
  ).toEqual({
    genre: `drama`,
    films: FILMS,
    filmsInitial: FILMS
  });
});

it(`Reducer correctly return filtered films`, () => {
  expect(
      reducer(
          {
            genre: `All genres`,
            films: FILMS,
            filmsInitial: FILMS
          },
          {
            type: `FILMS_FILTER`,
            payload: `All genres`
          }
      )
  ).toEqual({
    genre: `All genres`,
    films: FILMS,
    filmsInitial: FILMS
  });
});


it(`Action creator correctly set genre`, () => {
  expect(ActionCreator.setNewFilmsGenre(`drama`)).toEqual({
    type: `SET_GENRE`,
    payload: `drama`
  });
});

it(`Action creator correctly filter films`, () => {
  expect(ActionCreator.getFilmsListOnGenre(`tragedy`)).toEqual({
    type: `FILMS_FILTER`,
    payload: `tragedy`
  });
});

it(`Action creator correctly load films`, () => {
  const dispatch = jest.fn();
  const load = LoadFromServer.loadFilms();

  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);

  apiMock
    .onGet(`films`)
    .reply(200, [{fake: true}]);

  return load(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `LOAD_FILMS`,
        payload: [{fake: true}],
      });
    });
});
