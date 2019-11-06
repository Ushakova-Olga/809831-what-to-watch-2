import React from "react";
import renderer from "react-test-renderer";

import Tabs from "./tabs";
import films from "../../mocks/films";

it(`Tabs component renders correctly`, () => {
  const tree = renderer
    .create(
        <Tabs information={films[5]}>
        </Tabs>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
