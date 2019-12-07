import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review";
import films from "../../mocks/films.js";

it(`AddReview renders correctly`, () => {
  const tree = renderer.create(
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
        submitHandler={jest.fn()}
        isFormValid={true}
        errorLoadingReview={``}
        isBlocking={false}
        error={``}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});
