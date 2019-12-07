import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "../main-screen/main-screen";
import films from "../../mocks/films.js";
import {BrowserRouter} from "react-router-dom";

it(`Main screen correctly renders`, () => {

  const tree = renderer
    .create(<BrowserRouter><MainScreen
      films={films}
      initialFilms={films}
      filmsCount={8}
      onClickMore={() => {}}
      currentGenre={`All genres`}
      userData = {{
        id: 1,
        name: `Olga`,
        email: `test`,
        avatarUrl: `avatar`
      }}
      isAuthorizationRequired={false}
      onClickFavorite={() => {}}
      promoFilm = {films[0]}
    /></BrowserRouter>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
