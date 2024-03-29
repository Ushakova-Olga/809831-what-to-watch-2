import React from "react";
import renderer from "react-test-renderer";
import ListGenres from "./list-genres";
import films from "../../mocks/films.js";

it(`List genres correctly renders`, () => {
  const tree = renderer.create(<ListGenres
    films={films}
    initialFilms={films}
    onClickFilter={jest.fn()}
    currentGenre={`All genres`}
  />);
  expect(tree).toMatchSnapshot();
});
