import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in';

it(`SignIn renders correctly`, () => {
  const tree = renderer.create(
      <SignIn
        isAuthorizationRequired={true}
        submitHandler={jest.fn()}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});