import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block";
import {BrowserRouter} from "react-router-dom";

it(`UserBlock component renders correctly`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <UserBlock
        isAuthorizationRequired={true}
        userData={{id: 1, name: `fake`, email: `test@mail.ru`, avatarUrl: ``}}
      >
      </UserBlock>
    </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
