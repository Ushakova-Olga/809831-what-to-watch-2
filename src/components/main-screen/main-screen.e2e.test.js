import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainScreen from '../main-screen/main-screen';
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Main screen correctly pressed header`, () => {
  const clickFavoriteHandler = jest.fn();
  const componentMainScreen = shallow(<MainScreen
    films={films}
    filmsInitial={films}
    countFilms={8}
    clickFavoriteHandler={() => {}}
    activeFilm = {1}
    currentGenre={`All genres`}
    userData = {{
      id: 1,
      name: `Olga`,
      email: `test`,
      avatarUrl: `avatar`
    }}
  />);

  const mainHeader = componentMainScreen.find(`.btn--list`);
  mainHeader.simulate(`click`);

  expect(clickFavoriteHandler).toHaveBeenCalledTimes(1);
});
