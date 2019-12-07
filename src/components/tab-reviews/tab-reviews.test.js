import React from "react";
import renderer from "react-test-renderer";

import TabReviews from "./tab-reviews";
import films from "../../mocks/films";
import comments from "../../mocks/comments";

it(`TabReviews component renders correctly`, () => {
  const tree = renderer
    .create(
        <TabReviews
          currentTab={0}
          indexTab={0}
          information={films[5]}
          comments={comments}
        >
        </TabReviews>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
