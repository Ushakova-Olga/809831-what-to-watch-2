import React from "react";
import renderer from 'react-test-renderer';
import ListFilms from '../list-films/list-films';

it(`List films correctly renders`, () => {

  const tree = renderer
    .create(<ListFilms films={[{
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      img: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    },
    {
      name: `Fantastic Beasts`,
      img: `bohemian-rhapsody.jpg`,
    },
    {
      name: `Macbeth`,
      img: `macbeth.jpg`,
    },
    {
      name: `Aviator`,
      img: `aviator.jpg`,
    },
    {
      name: `We need to talk about Kevin`,
      img: `we-need-to-talk-about-kevin.jpg`,
    }
    ]} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
