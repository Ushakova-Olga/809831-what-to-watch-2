import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListFilms from '../list-films/list-films';

Enzyme.configure({adapter: new Adapter()});

it(`List films correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentListFilms = shallow(<ListFilms name={`Fantastic Beasts`}
    clickHandler={clickHandler} />);

  const filmHeader = componentListFilms.find(`a`);
  filmHeader.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
