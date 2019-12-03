import React from "react";
import renderer from "react-test-renderer";

import Tabs from "./tabs";
import films from "../../mocks/films";
import comments from "../../mocks/comments";

it(`Tabs component renders correctly`, () => {
  const tree = renderer
    .create(
        <Tabs
          information={films[5]}
          comments={comments}
          currentTab={0}
        >
        </Tabs>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
