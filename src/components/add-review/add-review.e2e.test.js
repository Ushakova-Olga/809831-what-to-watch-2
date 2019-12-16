import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review";
import films from "../../mocks/films.js";

Enzyme.configure({adapter: new Adapter()});

const handlerChangeForm = jest.fn();
const handlerSubmitForm = jest.fn();
const componentAddReview = shallow(<AddReview
  films={films}
  id={0}
  userData={{id: 1, name: `fake`, email: `test@mail.ru`, avatarUrl: ``}}
  error={``}
  isFormValid={true}
  onChange={handlerChangeForm}
  onSubmit={handlerSubmitForm}
  errorReview={``}
  isBlocking={false} />);

it(`Add review form onChande worked correctly`, () => {
  const eventFirst = {currentTarget: {querySelector: (selector) => {
    switch (selector) {
      case `.add-review__textarea`:
        return {value: `test`};
      case `.rating__input:checked`:
        return {value: 3};
    }
    return null;
  }}};

  componentAddReview.find(`.add-review__form`).at(0).simulate(`change`, eventFirst);
  expect(handlerChangeForm).toHaveBeenCalledTimes(1);
  expect(handlerChangeForm).toHaveBeenNthCalledWith(1, 3, `test`);

});

it(`Add review form onSubmit worked correctly`, () => {
  const eventSecond = {
    preventDefault: () => {},
    currentTarget: {querySelector: (selector) => {
      switch (selector) {
        case `.add-review__textarea`:
          return {value: `test test`};
        case `.rating__input:checked`:
          return {value: 5};
      }
      return null;
    }}};

  componentAddReview.find(`.add-review__form`).at(0).simulate(`submit`, eventSecond);
  expect(handlerSubmitForm).toHaveBeenCalledTimes(1);
  expect(handlerSubmitForm).toHaveBeenNthCalledWith(1, 5, `test test`);
});
