import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

Enzyme.configure({adapter: new Adapter()});
const handlerSubmitForm = jest.fn();
const handlerChangeForm = jest.fn();
const componentSignIn = shallow(<SignIn
  isAuthorizationRequired={true}
  onSubmit={handlerSubmitForm}
  errorLogin={``}
  errorEmail={``}
  errorPassword={``}
  isFormValid={true}
  onChange={handlerChangeForm} />);

it(`Sign in form onSubmit workes correctly`, () => {

  const evt = {
    preventDefault: () => {},
    target: {querySelector: (selector) => {
      switch (selector) {
        case `#user-email`:
          return {value: `test@test.ru`};
        case `#user-password`:
          return {value: `123`};
      }
      return null;
    }}};

  componentSignIn.find(`.sign-in__form`).at(0).simulate(`submit`, evt);
  expect(handlerSubmitForm).toHaveBeenCalledTimes(1);
  expect(handlerSubmitForm).toHaveBeenNthCalledWith(1, `test@test.ru`, `123`);
});

it(`Sign in form onChange workes correctly`, () => {

  const evt2 = {
    preventDefault: () => {},
    target: {
      name: `user-email`,
      value: `test@test.ru`,
    }
  };

  const evt3 = {
    preventDefault: () => {},
    target: {
      name: `user-password`,
      value: `123`,
    }
  };

  componentSignIn.find(`.sign-in__form`).at(0).simulate(`change`, evt2);
  expect(handlerChangeForm).toHaveBeenCalledTimes(1);
  expect(handlerChangeForm).toHaveBeenNthCalledWith(1, `test@test.ru`, ``);

  componentSignIn.find(`.sign-in__form`).at(0).simulate(`change`, evt3);
  expect(handlerChangeForm).toHaveBeenCalledTimes(2);
  expect(handlerChangeForm).toHaveBeenNthCalledWith(2, ``, `123`);
});
