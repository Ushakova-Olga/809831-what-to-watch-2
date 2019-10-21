import React from "react";
import renderer from 'react-test-renderer';
import MainScreen from '../main-screen/main-screen';

it(`Main screen correctly renders`, () => {

  const tree = renderer
    .create(<MainScreen names={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
