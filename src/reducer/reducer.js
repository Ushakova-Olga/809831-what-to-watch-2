const FILMS_COUNT = 8;
const FILMS_COUNT_ADD = 20;

const initialState = {
  genre: `All genres`,
  films: [],
  filmsCount: FILMS_COUNT,
  filmsInitial: [],
  isAuthorizationRequired: true,
  userData: {},
  activeFilm: 0,
  favoriteFilms: [],
};

const convertKey = (key) => {
  const arr = key.split(`_`).map((word, ind) => ind === 0 ? word : word[0].toUpperCase() + word.slice(1));
  return arr.join(``);
};

const changeFavoriteId = (films, id) => {
  const result = films.map((it) => {
    if (it.id === id) {
      let iit = {};
      for (const key in it) {
        if (it.hasOwnProperty(key)) {
          if (key === `isFavorite`) {
            iit[key] = !it[key];
          } else {
            iit[key] = it[key];
          }
        }
      }

      return iit;
    }
    return it;
  });
  return result;
};

const convertItem = (obj) => {
  let newObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[convertKey(key)] = obj[key];
    }
  }

  /* newObj = {
    img: obj.previewImage,
    name: obj.name,
    genre: obj.genre,
    year: obj.released,
    posterlarge: obj.poster_image,
    cover: obj.background_image,
    src: obj.previewVideoLink,
    rating: obj.scores_count,
    ratingCount: obj.scores_count,
    description: obj.description,
    actors: obj.starring,
    description
    director
    runTime
    rating
    videoLink
    isFavorite
    id
  };*/

  return newObj;
};

const getFilms = (genre, filmsList) => {
  if (genre === `All genres`) {
    return filmsList;
  }

  return filmsList.filter((it) => it.genre.toLowerCase() === genre.toLowerCase());
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),
  loadFavoriteFilms: (favoriteFilms) => ({
    type: `LOAD_FAVORITE_FILMS`,
    payload: favoriteFilms,
  }),

  changeIsAuthorizationRequired: (bool) => ({
    type: `CHANGE_IS_AUTHORIZATION_REQUIRED`,
    payload: bool,
  }),
  enterUser: (userData) => ({
    type: `ENTER_USER`,
    payload: userData,
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
  }),

  //
  changeActiveFilm: (id) => ({
    type: `CHANGE_ACTIVE_FILM`,
    payload: id,
  }),

  //
  changeFavorite: (id) => ({
    type: `CHANGE_FAVORITE`,
    payload: id,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, _, api) => {
    return api.get(`films`)
      .then((response) => {
        const convertedData = response.data.map((item) => convertItem(item));
        dispatch(ActionCreator.loadFilms(convertedData));
      });
  },
  loadFavoriteFilms: () => (dispatch, _, api) => {
    return api.get(`favorite`)
      .then((response) => {
        const convertedData = response.data.map((item) => convertItem(item));
        //console.log(convertedData);
        dispatch(ActionCreator.loadFavoriteFilms(convertedData));
      });
  },
  logIn: (email, password) => (dispatch, _, api) => {
    return api.post(`login`, {email, password})
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.changeIsAuthorizationRequired(false));
          dispatch(ActionCreator.enterUser(convertItem(response.data)));
        }
      })
      .catch((_err) => {});
  },
  changeFavorite: (id, isFavorite) => (dispatch, _, api) => {
    return api.post(`favorite/${id}/${isFavorite ? 1 : 0}`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.changeFavorite(id, isFavorite));
        }
      })
      .catch((_err) => {});
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`:
      return Object.assign({}, state, {
        films: action.payload,
        filmsInitial: action.payload,
        activeFilm: action.payload[0] ? 1 : 0,
      });
    case `LOAD_FAVORITE_FILMS`:
      return Object.assign({}, state, {
        favoriteFilms: action.payload,
      });
    case `CHANGE_IS_AUTHORIZATION_REQUIRED`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case `ENTER_USER`:
      return Object.assign({}, state, {
        userData: action.payload,
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
    case `CHANGE_ACTIVE_FILM`:
      return Object.assign({}, state, {
        activeFilm: action.payload
      });
    case `CHANGE_FAVORITE`:
      return Object.assign({}, state, {
        films: changeFavoriteId(state.films, action.payload),
        filmsInitial: changeFavoriteId(state.filmsInitial, action.payload),
      });
  }
  return state;
};

export {reducer, ActionCreator, Operation};
