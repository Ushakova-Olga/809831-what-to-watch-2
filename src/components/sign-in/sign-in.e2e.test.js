import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

Enzyme.configure({adapter: new Adapter()});

it(`Sign in form onSubmit worked correctly`, () => {

  const handlerSubmitForm = jest.fn();
  const componentSignIn = shallow(<SignIn
    isAuthorizationRequired={true}
    onSubmit={handlerSubmitForm}
    errorLogin={``}
    errorEmail={``}
    errorPassword={``}
    isFormValid={true}
    onChange={jest.fn()} />);

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
