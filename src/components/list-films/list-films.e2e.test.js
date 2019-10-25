import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListFilms from '../list-films/list-films';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`List films correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentListFilms = mount(<ListFilms films={films}
    clickHandler={clickHandler} />);

  componentListFilms.find(`a`).at(0).simulate(`mouseover`);
  componentListFilms.find(`a`).at(1).simulate(`mouseover`);
  componentListFilms.find(`a`).at(2).simulate(`mouseover`);
  componentListFilms.find(`a`).at(3).simulate(`mouseover`);
  componentListFilms.find(`a`).at(4).simulate(`mouseover`);

  expect(clickHandler).toHaveBeenCalledTimes(5);
});
