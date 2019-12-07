import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {App} from "./app";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import films from "../../mocks/films.js";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const state = {
  currentGenre: `All genres`,
  filmsCount: 8,
  initialFilms: films,
  isAuthorizationRequired: true,
  userData: {},
  activeFilm: 1,
  favoriteFilms: [],
  isFilmPlaying: false,
  comments: [],
  isFavoriteActually: false,
  errorLoadingReview: ``,
  promoFilm: {},
  clickFavoriteHandler: () => {},
  clickHandlerMore: () => {},
  clickMoreButton: () => {},
  changeFavoriteHandler: () => {},
};

const store = mockStore(state);

it(`App component correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Provider store={store}>
        <App
          currentGenre={`All genres`}
          countFilms={8}
          initialFilms={films}
          isAuthorizationRequired={true}
          userData={{}}
          activeFilm={1}
          favoriteFilms={[]}
          isFilmPlaying={false}
          comments={[]}
          isFavoriteActually={false}
          errorLoadingReview={``}
          promoFilm={{}}
          clickFavoriteHandler={() => {}}
          clickHandlerMore={() => {}}
          clickMoreButton={() => {}}
          changeFavoriteHandler={() => {}}
        />
      </Provider>
    </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});