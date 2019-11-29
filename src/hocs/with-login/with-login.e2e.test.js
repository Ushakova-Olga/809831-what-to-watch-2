import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withLogin from "./with-login";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLogin(MockComponent);

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const nonAuthState = {
  isAuthorizationRequired: true,
};
const authState = {
  isAuthorizationRequired: false,
};
const nonAuthStore = mockStore(nonAuthState);
const authStore = mockStore(authState);

const nonAuthItem = mount(<BrowserRouter>
  <Provider store={nonAuthStore}>
    <MockComponentWrapped />
  </Provider>
</BrowserRouter>);

const authItem = mount(<BrowserRouter>
  <Provider store={authStore}>
    <MockComponentWrapped />
  </Provider>
</BrowserRouter>);

it(`element should be not div if isAuthorizationRequired = true`, () => {
  const element = nonAuthItem.find(`div`);
  expect(element).toHaveLength(0);
});

it(`element should be div if isAuthorizationRequired = false`, () => {
  const element = authItem.find(`div`);
  expect(element).toHaveLength(1);
});
