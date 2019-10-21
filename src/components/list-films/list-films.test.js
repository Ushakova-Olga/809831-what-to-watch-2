import React from "react";
import renderer from 'react-test-renderer';
import ListFilms from '../list-films/list-films';

it(`List films correctly renders`, () => {

  const tree = renderer
    .create(<ListFilms name={`Fantastic Beasts`} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
