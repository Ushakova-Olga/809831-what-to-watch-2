const FILMS_COUNT = 8;
const FILMS_COUNT_ADD = 20;
//let filmsInitial = [];

const initialState = {
  genre: `All genres`,
  films: [],
  filmsCount: FILMS_COUNT,
  filmsInitial: [],
};

const convertItem = (obj) => {
  let newObj={};
  newObj = {
    img: obj.preview_image,
    name: obj.name,
    genre: obj.genre,
    year: obj.released,
    posterlarge: obj.poster_image,
    cover: obj.background_image,
    src: obj.preview_video_link,
    rating: obj.scores_count.toString(),
    ratingCount: obj.scores_count.toString(),
    description: obj.description,
    actors: obj.starring,
  };

  return newObj;
};

const getFilms = (genre, filmsList) => {
  if (genre.toLowerCase() === `all genres`) {
    return filmsList;
  }

  return filmsList.filter((it) => it.genre.toLowerCase() === genre.toLowerCase());
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),

  // изменение фильтра по жанрам
  setNewFilmsGenre: (genre) => ({
    type: `SET_GENRE`,
    payload: genre
  }),

  // получение списка фильмов в соответствии с выбранным жанром
  getFilmsListOnGenre: (genre) => {
    return {
      type: `FILMS_FILTER`,
      payload: genre
    };
  },

  // количество фильмов для просмотра увеличить на 20
  addCountFilms: () => ({
    type: `ADD_COUNT_FILMS`,
    payload: FILMS_COUNT_ADD,
  })
};

const LoadFromServer = {
  loadFilms: () => (dispatch, _, api) => {
    return api.get(`films`)
      .then((response) => {
        //console.log(response.data);
        //const preparedData = response.data.map((item) => normalizeKeys(item));
        const convertedData = response.data.map((item) => convertItem(item));
        dispatch(ActionCreator.loadFilms(convertedData));
        //filmsInitial=convertedData;
        //dispatch(ActionCreator.loadFilms(response.data));//(preparedData));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`:
      return Object.assign({}, state, {
        films: action.payload,
        filmsInitial: action.payload,
      });
    case `SET_GENRE`:
      return Object.assign({}, state, {
        genre: action.payload
      });
    case `FILMS_FILTER`:
      return Object.assign({}, state, {
        films: getFilms(action.payload, state.filmsInitial),
        filmsInitial: state.filmsInitial
      });
    case `ADD_COUNT_FILMS`:
      return Object.assign({}, state, {
        filmsCount: state.filmsCount + action.payload
      });
  }
  return state;
};

export {reducer, ActionCreator, LoadFromServer};
