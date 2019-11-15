import {ActionCreator, reducer} from "./reducer";

it(`Reducer correctly set a genre`, () => {
  expect(
      reducer(
          {
            genre: `All genres`,
            films: FILMS
          },
          {
            type: `SET_GENRE`,
            payload: `drama`
          }
      )
  ).toEqual({
    genre: `drama`,
    films: FILMS
  });
});

it(`Reducer correctly return filtered films`, () => {
  expect(
      reducer(
          {
            genre: `All genres`,
            films: FILMS
          },
          {
            type: `FILMS_FILTER`,
            payload: FILMS
          }
      )
  ).toEqual({
    genre: `All genres`,
    films: FILMS
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
    payload: [FILMS[2], FILMS[8]]
  });
});
