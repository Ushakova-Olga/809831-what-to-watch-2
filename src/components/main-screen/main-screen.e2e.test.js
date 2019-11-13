import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainScreen from '../main-screen/main-screen';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Main screen correctly pressed header`, () => {
  const clickHandler = jest.fn();
  const componentMainScreen = shallow(<MainScreen films={films}
    clickHandler={clickHandler}
    countFilms={8}
    clickHandlerMore={() => {}}
    currentGenre={`All genres`}
  />);

  const mainHeader = componentMainScreen.find(`h2.movie-card__title`);
  mainHeader.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
