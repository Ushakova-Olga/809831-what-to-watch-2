import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallCard from '../small-card/small-card';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Small card correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentListFilms = mount(<SmallCard information={films[0]}
    clickHandler={clickHandler} />);

  const filmHeader = componentListFilms.find(`a`);
  filmHeader.simulate(`mouseover`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(films[0]);
});
