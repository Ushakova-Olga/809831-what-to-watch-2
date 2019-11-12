import FILMS from "../mocks/films";
const FILMS_COUNT = 8;
const FILMS_COUNT_ADD = 20;

const initialState = {
  genre: `All genres`,
  films: FILMS,
  filmsCount: FILMS_COUNT
};

const getFilms = (genre, filmsList) => {
  if (genre.toLowerCase() === `all genres`) {
    return filmsList;
  }

  return filmsList.filter((it) => it.genre.toLowerCase() === genre.toLowerCase());
};

const ActionCreator = {
  // изменение фильтра по жанрам
  setNewFilmsGenre: (genre) => ({
    type: `SET_GENRE`,
    payload: genre
  }),

  // получение списка фильмов в соответствии с выбранным жанром
  getFilmsListOnGenre: (genre) => {
    return {
      type: `FILMS_FILTER`,
      payload: getFilms(genre, FILMS)
    };
  },

  // количество фильмов для просмотра увеличить на 20
  addCountFilms: () => ({
  type: `ADD_COUNT_FILMS`,
  payload: FILMS_COUNT_ADD,
})
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_GENRE`:
      return Object.assign({}, state, {
        genre: action.payload
      });
    case `FILMS_FILTER`:
      return Object.assign({}, state, {
        films: action.payload
      });
    case `ADD_COUNT_FILMS`:
      return Object.assign({}, state, {
        filmsCount: state.filmsCount + action.payload
      });
  }
  return state;
};

export {reducer, ActionCreator};
