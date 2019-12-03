import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {BrowserRouter} from "react-router-dom";

it(`SignIn renders correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter><SignIn
        isAuthorizationRequired={true}
        submitHandler={jest.fn()}
      /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
