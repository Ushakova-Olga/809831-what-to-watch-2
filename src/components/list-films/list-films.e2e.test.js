import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListFilms from '../list-films/list-films';

Enzyme.configure({adapter: new Adapter()});

it(`List films correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentListFilms = mount(<ListFilms films={[{
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

  componentListFilms.find(`a`).at(0).simulate(`mouseover`);
  componentListFilms.find(`a`).at(1).simulate(`mouseover`);
  componentListFilms.find(`a`).at(2).simulate(`mouseover`);
  componentListFilms.find(`a`).at(3).simulate(`mouseover`);
  componentListFilms.find(`a`).at(4).simulate(`mouseover`);

  expect(clickHandler).toHaveBeenCalledTimes(5);
});
