import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListFilms from '../list-films/list-films';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`List films correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentListFilms = mount(<ListFilms
    films={films}
    countFilms={8}
    clickHandler={clickHandler} />);

  componentListFilms.find(`.small-movie-card`).at(0).simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
