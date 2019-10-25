import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallCard from '../small-card/small-card';

Enzyme.configure({adapter: new Adapter()});

it(`Small card correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentListFilms = shallow(<ListFilms name={`Fantastic Beasts`}
    clickHandler={clickHandler} />);

  const filmHeader = componentListFilms.find(`a`);
  filmHeader.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
