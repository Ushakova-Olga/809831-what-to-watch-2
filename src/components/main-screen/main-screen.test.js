import React from "react";
import renderer from 'react-test-renderer';
import MainScreen from '../main-screen/main-screen';
import films from "../../mocks/films.js";

it(`Main screen correctly renders`, () => {

  const tree = renderer
    .create(<MainScreen
      films={films} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
