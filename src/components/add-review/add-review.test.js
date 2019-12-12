import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review";
import films from "../../mocks/films.js";
import {BrowserRouter} from "react-router-dom";

it(`AddReview renders correctly`, () => {
  const tree = renderer.create(<BrowserRouter>
    <AddReview
      films={films}
      initialFilms={films}
      userData={{
        id: 0,
        name: `test`,
        email: `test`,
        avatarUrl: `test`,
      }}
      id={0}
      onSubmit={jest.fn()}
      isFormValid={true}
      errorReview={``}
      isBlocking={false}
      error={``}
    /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
