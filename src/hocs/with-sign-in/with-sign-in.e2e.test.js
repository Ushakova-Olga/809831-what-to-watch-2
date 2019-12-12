import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withSignIn from "./with-sign-in";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <form></form>;
const MockComponentWrapped = withSignIn(MockComponent);

const signIn = jest.fn();
const store = {
  getState: () => {},
  subscribe: () => {},
  errorLogin: ``,
  dispatch: () => {},
};

const item = shallow(<MockComponentWrapped store={store} onChange={signIn} errorLogin={``} />);

it(`withSignIn correctly changes state isFormValid`, () => {
  item.setState({isFormValid: false, errorEmail: ``, errorPassword: ``});
  item.instance()._handleFormChange(`test`, ``);
  expect(item.state().isFormValid).toEqual(false);
  item.setState({isFormValid: false, errorEmail: ``, errorPassword: ``});
  item.instance()._handleFormChange(``, `12`);
  expect(item.state().isFormValid).toEqual(false);
});

it(`withSignIn form correctly changes state isFormValid`, () => {
  item.setState({isFormValid: false, errorEmail: ``, errorPassword: ``});
  item.instance()._handleFormChange(`test@test.ru`, ``);
  expect(item.state().isFormValid).toEqual(false);
  item.setState({isFormValid: false, errorEmail: ``, errorPassword: ``});
  item.instance()._handleFormChange(``, `1234`);
  expect(item.state().isFormValid).toEqual(true);
});
