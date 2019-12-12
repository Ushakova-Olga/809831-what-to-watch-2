import React from "react";
import renderer from "react-test-renderer";
import TabDetails from "./tab-overview";
import films from "../../mocks/films";

it(`TabDetails component renders correctly`, () => {
  const tree = renderer
    .create(
        <TabDetails currentTab={0} indexTab={0} information={films[5]}>
        </TabDetails>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
