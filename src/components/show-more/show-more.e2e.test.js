import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMore from "../show-more/show-more";

Enzyme.configure({adapter: new Adapter()});

it(`Show more button correctly pressed button`, () => {
  const onClickMore = jest.fn();
  const componentShowMore = shallow(<ShowMore
    onClickMore={onClickMore}
  />);

  componentShowMore.find(`button`).simulate(`click`);
  expect(onClickMore).toHaveBeenCalledTimes(1);
});
