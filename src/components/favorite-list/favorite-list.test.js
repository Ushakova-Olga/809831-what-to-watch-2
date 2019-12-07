import React from "react";
import renderer from "react-test-renderer";
import FavoriteList from "./favorite-list";
import {BrowserRouter} from "react-router-dom";
import films from "../../mocks/films.js";

it(`FavoriteList component renders correctly`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <FavoriteList
        isAuthorizationRequired={true}
        userData={{id: 1, name: `fake`, email: `test@mail.ru`, avatarUrl: ``}}
        films={films}
        countFilms={8}
        clickHandler={() => {}}
      >
      </FavoriteList>
    </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
