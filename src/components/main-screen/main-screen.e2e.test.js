import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainScreen from '../main-screen/main-screen';

Enzyme.configure({adapter: new Adapter()});

it(`Main screen correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentMainScreen = shallow(<MainScreen films={[{
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
  ]}
  clickHandler={clickHandler} />);

  const mainHeader = componentMainScreen.find(`h2.movie-card__title`);
  mainHeader.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
