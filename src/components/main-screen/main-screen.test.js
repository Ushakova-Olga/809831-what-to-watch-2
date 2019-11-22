import React from "react";
import renderer from 'react-test-renderer';
import MainScreen from '../main-screen/main-screen';
import films from "../../mocks/films.js";

it(`Main screen correctly renders`, () => {

  const tree = renderer
    .create(<MainScreen
      films={films}
      filmsInitial={films}
      countFilms={8}
      clickHandlerMore={() => {}}
      currentGenre={`All genres`}
      userData = {{
        id: 1,
        name: `Olga`,
        email: `test`,
        avatarUrl: `avatar`
      }}
    />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
