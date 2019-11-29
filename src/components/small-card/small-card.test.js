import React from "react";
import renderer from "react-test-renderer";
import SmallCard from "../small-card/small-card";
import films from "../../mocks/films.js";

it(`Small card correctly renders`, () => {
  const tree = renderer
    .create(<SmallCard information={films[0]} id={0} isActive={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
