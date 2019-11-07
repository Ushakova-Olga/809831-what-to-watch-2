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
        return films.filter.filter((it) => it.genre === genre);
      }
    };
  }
};
