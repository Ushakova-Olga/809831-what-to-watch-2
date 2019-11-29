import React from "react";
import Enzyme, {mount} from "enzyme";
import withActiveItem from "./with-active-item.jsx";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);
const activeItem = mount(<MockComponentWrapped />);

it(`WithActiveItem первоначально возвращает false`, () => {
  expect(activeItem.state().isActive).toEqual(false);
});

it(`WithActiveItem при наведении переключает isActive`, () => {
  activeItem.instance().overMouseHandler();
  expect(activeItem.state().isActive).toEqual(true);
});
