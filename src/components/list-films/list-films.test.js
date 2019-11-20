import React from "react";
import renderer from 'react-test-renderer';
import ListFilms from '../list-films/list-films';
import films from "../../mocks/films.js";

it(`List films correctly renders`, () => {

  const tree = renderer
    .create(<ListFilms films={films} filmsInitial={films} countFilms={8} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
