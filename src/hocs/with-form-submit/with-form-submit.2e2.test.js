import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withFormSubmit} from "./with-form-submit";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <form>
  <div className="rating">
  </div>

  <div className="add-review__text">
    <textarea></textarea>
    <div className="add-review__submit">
      <button className="add-review__btn" type="submit">Post</button>
    </div>
  </div>
</form>;
const MockComponentWrapped = withFormSubmit(MockComponent);

const uploadReview = jest.fn().mockImplementationOnce(() => Promise.resolve(`data`));
const store = {
  getState: () => {},
  subscribe: () => {},
  errorLoadingReview: ``,
  dispatch: () => {},
};

const event = {
  preventDefault: () => {}
};

const nonValidItem = shallow(<MockComponentWrapped store={store} uploadReview={uploadReview} id={1} loadComments={() => {}} errorLoadingReview={``} />);
const validItem = shallow(<MockComponentWrapped store={store} uploadReview={uploadReview} id={1} loadComments={() => {}} errorLoadingReview={``} />);

it(`Non valid form should not upload review`, () => {
  nonValidItem.setState({isFormValid: false});
  nonValidItem.instance()._onSubmit(event);
  expect(uploadReview).toHaveBeenCalledTimes(0);
});

it(`Valid form should upload review`, () => {
  validItem.setState({isFormValid: true});
  validItem.instance()._onSubmit(event);
  expect(uploadReview).toHaveBeenCalledTimes(1);
});
