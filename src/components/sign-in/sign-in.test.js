import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {BrowserRouter} from "react-router-dom";

it(`SignIn renders correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter><SignIn
        isAuthorizationRequired={true}
        onSubmit={jest.fn()}
        errorLogin={``}
        errorEmail={``}
        errorPassword={``}
        isFormValid={true}
        onChange={jest.fn()}
      /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
