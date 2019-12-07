import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTimer from "./with-timer";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withTimer(MockComponent);
const onMouseEnter = jest.fn();
const onMouseLeave = jest.fn();

it(`withTimer HOC correctly running callback onMouseEnter after 1000ms and callback onMouseLeave`, () => {
  const component = shallow(<MockComponentWrapped onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);
  component.instance()._handleMouseEnter();

  setTimeout(() => {
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  }, 1000);

  component.instance()._handleMouseLeave();
  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
