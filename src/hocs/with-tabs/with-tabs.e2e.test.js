import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTabs from "./with-tabs";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withTabs(MockComponent);

it(`withTabs HOC correctly saving number of tab to state`, () => {
  const component = shallow(<MockComponentWrapped />);
  component.instance().onMouseClickChild(1);
  expect(component.state().currentTab).toEqual(1);
});
