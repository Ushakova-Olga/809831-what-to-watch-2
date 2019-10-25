import React from "react";
import renderer from 'react-test-renderer';
import SmallCard from '../small-card/small-card';

it(`Small card correctly renders`, () => {
  const testObject = {name: `Fantastic Beasts`, img: `bohemian-rhapsody.jpg`};
  const tree = renderer
    .create(<SmallCard information={testObject} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
