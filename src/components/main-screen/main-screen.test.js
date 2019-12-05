import React from "react";
import renderer from "react-test-renderer";
import MainScreen from "../main-screen/main-screen";
import films from "../../mocks/films.js";
import {BrowserRouter} from "react-router-dom";

it(`Main screen correctly renders`, () => {

  const tree = renderer
    .create(<BrowserRouter><MainScreen
      films={films}
      filmsInitial={films}
      countFilms={8}
      clickHandlerMore={() => {}}
      currentGenre={`All genres`}
      userData = {{
        id: 1,
        name: `Olga`,
        email: `test`,
        avatarUrl: `avatar`
      }}
      isAuthorizationRequired={false}
      clickFavoriteHandler={() => {}}
      promoFilm = {films[0]}
    /></BrowserRouter>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
