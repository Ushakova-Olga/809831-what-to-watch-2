import films from "../mocks/films";

const initialState = {
  genre: `All genres`,
  films: films
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
      payload: (genre) => {
        if (genre === `All genres`) {
          return films;
        }
        return films.filter((it) => it.genre === genre);
      }
    };
  }
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
  }
  return state;
};

export {reducer, ActionCreator};