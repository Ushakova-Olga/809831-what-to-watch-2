import React from "react";
import renderer from "react-test-renderer";
import PageNotFound from "./page-not-found";

it(`Page not found component correctly renders`, () => {
  const tree = renderer.create(<PageNotFound/>).toJSON();
  expect(tree).toMatchSnapshot();
});
