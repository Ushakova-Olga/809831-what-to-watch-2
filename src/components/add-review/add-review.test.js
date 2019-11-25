import React from 'react';
import renderer from 'react-test-renderer';
import AddReview from './add-review';
import films from "../../mocks/films.js";

it(`AddReview renders correctly`, () => {
  const tree = renderer.create(
      <AddReview
        films={films}
        filmsInitial={films}
        userData={{
          id: 0,
          name: `test`,
          email: `test`,
          avatarUrl: `test`,
        }}
        id={0}
        submitHandler={jest.fn()} />).toJSON();
  expect(tree).toMatchSnapshot();
});
