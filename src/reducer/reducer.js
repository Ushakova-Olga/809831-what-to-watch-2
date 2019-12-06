const FILMS_COUNT = 8;
const FILMS_COUNT_ADD = 20;

const initialState = {
  genre: `All genres`,
  // films: [],
  filmsCount: FILMS_COUNT,
  filmsInitial: [],
  isAuthorizationRequired: true,
  userData: {},
  activeFilm: 0,
  favoriteFilms: [],
  isFilmPlaying: false,
  comments: [],
  isFavoriteActually: false,
  errorLoadingReview: ``,
  promoFilm: {},
};

const convertKey = (key) => {
  const arr = key.split(`_`).map((word, ind) => ind === 0 ? word : word[0].toUpperCase() + word.slice(1));
  return arr.join(``);
};

const getId = (film) => {
  if (film.id) {
    return film.id;
  }
  return 0;
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

  return newObj;
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),
  loadPromoFilm: (film) => ({
    type: `LOAD_PROMO_FILM`,
    payload: film,
  }),
  loadComments: (comments) => ({
    type: `LOAD_COMMENTS`,
    payload: comments,
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

  openCloseFilm: (status) => ({
    type: `CHANGE_ACTIVE_STATUS`,
    payload: status,
  }),
  uploadReview: (id, error) => ({
    type: `UPLOAD_RIVIEW`,
    payload: error
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
  loadComments: (id) => (dispatch, _, api) => {
    return api.get(`comments/${id}`)
      .then((response) => {
        if (response.data) {
          const convertedData = response.data.map((item) => convertItem(item));
          dispatch(ActionCreator.loadComments(convertedData));
        }
      });
  },
  loadFavoriteFilms: () => (dispatch, _, api) => {
    return api.get(`favorite`)
      .then((response) => {
        const convertedData = response.data.map((item) => convertItem(item));
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
  uploadReview: (id, data) => (dispatch, _, api) => {
    return api.post(`/comments/${id}`, data)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.loadComments(response.data));
          return response;
        } else {
          return response;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  loadPromoFilm: () => (dispatch, _, api) => {
    return api.get(`films/promo`)
      .then((response) => {
        const convertedData = convertItem(response.data);
        dispatch(ActionCreator.loadPromoFilm(convertedData));
      })
      .catch((_err) => {});
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`:
      return Object.assign({}, state, {
        filmsInitial: action.payload,
      });
    case `LOAD_COMMENTS`:
      return Object.assign({}, state, {
        comments: action.payload,
      });
    case `LOAD_FAVORITE_FILMS`:
      return Object.assign({}, state, {
        favoriteFilms: action.payload,
        isFavoriteActually: true,
      });

    case `LOAD_PROMO_FILM`:
      return Object.assign({}, state, {
        promoFilm: action.payload,
        activeFilm: getId(action.payload),
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
        filmsInitial: changeFavoriteId(state.filmsInitial, action.payload),
        promoFilm: changeFavoriteId([state.promoFilm], action.payload)[0],
        isFavoriteActually: false,
      });
    case `CHANGE_ACTIVE_STATUS`:
      return Object.assign({}, state, {
        isFilmPlaying: action.payload,
      });
    case `UPLOAD_REVIEW`:
      return Object.assign({}, state, {
        errorLoadingReview: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, Operation};
