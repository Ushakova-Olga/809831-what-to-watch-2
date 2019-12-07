import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainScreen from "../main-screen/main-screen";
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Main screen correctly pressed favorite button`, () => {
  const clickFavoriteHandler = jest.fn();
  const componentMainScreen = shallow(<MainScreen
    films={films}
    initialFilms={films}
    filmsCount={8}
    onClickFavorite={clickFavoriteHandler}
    promoFilm = {films[0]}
    currentGenre={`All genres`}
    onClickMore={jest.fn()}
    userData = {{
      id: 1,
      name: `Olga`,
      email: `test`,
      avatarUrl: `avatar`
    }}
    isAuthorizationRequired={false}
  />);

  const mainHeader = componentMainScreen.find(`.btn--list`);
  mainHeader.simulate(`click`);

  expect(clickFavoriteHandler).toHaveBeenCalledTimes(1);
});
