import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallCard from '../small-card/small-card';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Small card correctly mouse enter and leave`, () => {
  const clickHandlerEnter = jest.fn();
  const clickHandlerLeave = jest.fn();
  jest.useFakeTimers();
  const componentSmallCard = shallow(<SmallCard information={films[0]}
    onMouseEnter={clickHandlerEnter}
    onMouseLeave={clickHandlerLeave}
    id={0}
    isActive={false} />);

  componentSmallCard.simulate(`mouseenter`);
  jest.runAllTimers();
  expect(clickHandlerEnter).toBeCalledTimes(1);

  componentSmallCard.simulate(`mouseleave`);
  expect(clickHandlerLeave).toBeCalledTimes(1);
});
