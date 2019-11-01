import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallCard from '../small-card/small-card';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Small card correctly mouse enter and leave`, () => {
  const clickHandler = jest.fn();
  jest.useFakeTimers();
  const componentSmallCard = shallow(<SmallCard information={films[0]}
    onCardMouseEnter={clickHandler}
    onCardMouseLeave={clickHandler}
    id={0} />);

  componentSmallCard.simulate(`mouseenter`);
  jest.runAllTimers();
  expect(componentSmallCard.state(`isPlaying`)).toBe(true);
  componentSmallCard.simulate(`mouseleave`);
  expect(componentSmallCard.state(`isPlaying`)).toBe(false);
});
