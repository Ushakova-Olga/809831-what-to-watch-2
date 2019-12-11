import {FILMS_COUNT, FILMS_COUNT_ADD, SET_ERROR, SET_ERROR_LOGIN, LOAD_FILMS, LOAD_PROMO_FILM, LOAD_COMMENTS, LOAD_FAVORITE_FILMS,
  CHANGE_IS_AUTHORIZATION_REQUIRED, ENTER_USER, SET_GENRE, ADD_COUNT_FILMS, CHANGE_ACTIVE_FILM,
  CHANGE_FAVORITE, CHANGE_ACTIVE_STATUS, UPLOAD_REVIEW} from "../util/constants";

const initialState = {
  genre: `All genres`,
  filmsCount: FILMS_COUNT,
  initialFilms: [],
  isAuthorizationRequired: true,
  userData: {},
  activeFilmId: 0,
  favoriteFilms: [],
  isFilmPlaying: false,
  comments: [],
  isFavoriteActually: false,
  errorLoadingReview: ``,
  promoFilm: {},
  errorLoading: ``,
  errorLogin: ``,
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
  setError: (error) => ({
    type: SET_ERROR,
    payload: error,
  }),
  setErrorLogin: (error) => ({
    type: SET_ERROR_LOGIN,
    payload: error,
  }),
  loadFilms: (films) => ({
    type: LOAD_FILMS,
    payload: films,
  }),
  loadPromoFilm: (film) => ({
    type: LOAD_PROMO_FILM,
    payload: film,
  }),
  loadComments: (comments) => ({
    type: LOAD_COMMENTS,
    payload: comments,
  }),
  loadFavoriteFilms: (favoriteFilms) => ({
    type: LOAD_FAVORITE_FILMS,
    payload: favoriteFilms,
  }),
  changeIsAuthorizationRequired: (bool) => ({
    type: CHANGE_IS_AUTHORIZATION_REQUIRED,
    payload: bool,
  }),
  enterUser: (userData) => ({
    type: ENTER_USER,
    payload: userData,
  }),
  setNewFilmsGenre: (genre) => ({
    type: SET_GENRE,
    payload: genre
  }),
  addCountFilms: () => ({
    type: ADD_COUNT_FILMS,
    payload: FILMS_COUNT_ADD,
  }),
  changeActiveFilm: (id) => ({
    type: CHANGE_ACTIVE_FILM,
    payload: id,
  }),
  changeFavorite: (id) => ({
    type: CHANGE_FAVORITE,
    payload: id,
  }),
  onOpenCloseFilm: (status) => ({
    type: CHANGE_ACTIVE_STATUS,
    payload: status,
  }),
  uploadReview: (id, error) => ({
    type: UPLOAD_REVIEW,
    payload: error
  }),
};

const Operation = {
  loadFilms: () => (dispatch, _, api) => {
    return api.get(`films`)
      .then((response) => {
        if (response.data) {
          const convertedData = response.data.map((item) => convertItem(item));
          dispatch(ActionCreator.loadFilms(convertedData));
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          dispatch(ActionCreator.setError(errorObject.message));
        }
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.message));
      });
  },
  loadComments: (id) => (dispatch, _, api) => {
    return api.get(`comments/${id}`)
      .then((response) => {
        if (response.data) {
          const convertedData = response.data.map((item) => convertItem(item));
          dispatch(ActionCreator.loadComments(convertedData));
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          dispatch(ActionCreator.setError(errorObject.message));
        }
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.message));
      });
  },
  loadFavoriteFilms: () => (dispatch, _, api) => {
    return api.get(`favorite`)
      .then((response) => {
        if (response.data) {
          const convertedData = response.data.map((item) => convertItem(item));
          dispatch(ActionCreator.loadFavoriteFilms(convertedData));
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          dispatch(ActionCreator.setError(errorObject.message));
        }
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.message));
      });
  },
  logIn: (email, password) => (dispatch, _, api) => {
    return api.post(`login`, {email, password})
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.changeIsAuthorizationRequired(false));
          dispatch(ActionCreator.enterUser(convertItem(response.data)));
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          // console.log(errorObject.message);
          dispatch(ActionCreator.setErrorLogin(errorObject.message));
        }
      })
      .catch((error) => {
        // console.log(error.message);
        dispatch(ActionCreator.setErrorLogin(error.message));
      });
  },
  changeFavorite: (id, isFavorite) => (dispatch, _, api) => {
    return api.post(`favorite/${id}/${isFavorite ? 1 : 0}`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.changeFavorite(id, isFavorite));
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          dispatch(ActionCreator.setError(errorObject.message));
        }
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.message));
      });
  },
  uploadReview: (id, data) => (dispatch, _, api) => {
    return api.post(`/comments/${id}`, data)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.loadComments(response.data));
          return response;
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          dispatch(ActionCreator.setError(errorObject.message));
          return response;
        }
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.message));
      });
  },

  loadPromoFilm: () => (dispatch, _, api) => {
    return api.get(`films/promo`)
      .then((response) => {
        if (response.data) {
          const convertedData = convertItem(response.data);
          dispatch(ActionCreator.loadPromoFilm(convertedData));
        } else {
          const errorObject = JSON.parse(JSON.stringify(response));
          dispatch(ActionCreator.setError(errorObject.message));
        }
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.message));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, {
        errorLoading: action.payload,
      });
    case SET_ERROR_LOGIN:
      return Object.assign({}, state, {
        errorLogin: action.payload,
      });
    case LOAD_FILMS:
      return Object.assign({}, state, {
        initialFilms: action.payload,
      });
    case LOAD_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload,
      });
    case LOAD_FAVORITE_FILMS:
      return Object.assign({}, state, {
        favoriteFilms: action.payload,
        isFavoriteActually: true,
      });

    case LOAD_PROMO_FILM:
      return Object.assign({}, state, {
        promoFilm: action.payload,
        activeFilmId: getId(action.payload),
      });

    case CHANGE_IS_AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ENTER_USER:
      return Object.assign({}, state, {
        userData: action.payload,
      });
    case SET_GENRE:
      return Object.assign({}, state, {
        genre: action.payload
      });
    case ADD_COUNT_FILMS:
      return Object.assign({}, state, {
        filmsCount: state.filmsCount + action.payload
      });
    case CHANGE_ACTIVE_FILM:
      return Object.assign({}, state, {
        activeFilmId: action.payload
      });
    case CHANGE_FAVORITE:
      return Object.assign({}, state, {
        initialFilms: changeFavoriteId(state.initialFilms, action.payload),
        promoFilm: changeFavoriteId([state.promoFilm], action.payload)[0],
        isFavoriteActually: false,
      });
    case CHANGE_ACTIVE_STATUS:
      return Object.assign({}, state, {
        isFilmPlaying: action.payload,
      });
    case UPLOAD_REVIEW:
      return Object.assign({}, state, {
        errorLoadingReview: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, Operation};
