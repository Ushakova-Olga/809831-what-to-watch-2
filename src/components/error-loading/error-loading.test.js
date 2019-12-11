import React from "react";
import renderer from "react-test-renderer";
import ErrorLoading from "./error-loading";

it(`Error loading component correctly renders`, () => {
  const tree = renderer.create(<ErrorLoading error={`error`} />).toJSON();
  expect(tree).toMatchSnapshot();
});
