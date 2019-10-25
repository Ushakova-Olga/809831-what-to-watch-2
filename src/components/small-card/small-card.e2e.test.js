import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallCard from '../small-card/small-card';

Enzyme.configure({adapter: new Adapter()});

it(`Small card correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const testObject = {name: `Fantastic Beasts`, img: `bohemian-rhapsody.jpg`};
  const componentListFilms = mount(<SmallCard information={testObject}
    clickHandler={clickHandler} />);

  const filmHeader = componentListFilms.find(`a`);
  filmHeader.simulate(`mouseover`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith({name: `Fantastic Beasts`, img: `bohemian-rhapsody.jpg`});
});
