import React from "react";
import renderer from "react-test-renderer";

import TabReviews from "./tab-reviews";
import films from "../../mocks/films";

it(`TabReviews component renders correctly`, () => {
  const tree = renderer
    .create(
        <TabReviews currentTab={0} indexTab={0} information={films[5]}>
        </TabReviews>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
