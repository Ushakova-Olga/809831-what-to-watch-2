import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ListGenres from "./list-genres";
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

it(`Linc clicked`, () => {
  const clickFilterHandler = jest.fn();
  const componentListLinksGenre = shallow(<ListGenres
    films={films}
    initialFilms={films}
    clickFilterHandler={clickFilterHandler}
    currentGenre={`All genres`} />);

  componentListLinksGenre.find(`.catalog__genres-link`).at(0).simulate(`click`, {
    preventDefault: () => {},
    target: {
      textContent: ``
    }
  });

  expect(clickFilterHandler).toHaveBeenCalledTimes(1);
});
