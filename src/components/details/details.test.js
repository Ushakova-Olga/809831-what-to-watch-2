import React from "react";
import renderer from "react-test-renderer";
import Details from "./details";
import {BrowserRouter} from "react-router-dom";
import films from "../../mocks/films.js";
import comments from "../../mocks/comments";

it(`FavoriteList component renders correctly`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Details
        activeFilmId={1}
        films={films}
        clickHandler={() => {}}
        isAuthorizationRequired={true}
        clickFavoriteHandler={() => {}}
        userData={{id: 1, name: `fake`, email: `test@mail.ru`, avatarUrl: ``}}
        openCloseFilm={() => {}}
        comments={comments}
        history={{push: () => {}}}
      >
      </Details>
    </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
