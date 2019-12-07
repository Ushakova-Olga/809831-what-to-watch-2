import React from "react";
import renderer from "react-test-renderer";
import SmallCard from "../small-card/small-card";
import films from "../../mocks/films.js";
import {BrowserRouter} from "react-router-dom";

it(`Small card correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter><SmallCard information={films[0]} id={0} isActive={false} /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
