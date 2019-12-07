import React from "react";
import renderer from "react-test-renderer";
import ListFilms from "../list-films/list-films";
import films from "../../mocks/films.js";
import {BrowserRouter} from "react-router-dom";

it(`List films correctly renders`, () => {

  const tree = renderer
    .create(<BrowserRouter><ListFilms films={films} initialFilms={films} countFilms={8} /></BrowserRouter>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
