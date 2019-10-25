import React from "react";
import renderer from 'react-test-renderer';
import MainScreen from '../main-screen/main-screen';

it(`Main screen correctly renders`, () => {

  const tree = renderer
    .create(<MainScreen
      films={[{
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
