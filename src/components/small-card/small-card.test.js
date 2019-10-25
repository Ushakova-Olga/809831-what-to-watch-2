import React from "react";
import renderer from 'react-test-renderer';
import ListFilms from '../small-card/small-card';

it(`Small card correctly renders`, () => {

  const tree = renderer
    .create(<ListFilms name={`Fantastic Beasts`} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
