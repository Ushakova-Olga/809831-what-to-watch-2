import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "../show-more/show-more";

it(`Show more button correctly renders`, () => {

  const tree = renderer
    .create(<ShowMore
      clickHandlerMore={() => {}}
    />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
