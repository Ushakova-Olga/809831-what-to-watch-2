import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs";
import films from "../../mocks/films";
import comments from "../../mocks/comments";

Enzyme.configure({adapter: new Adapter()});

let componentTabs;
const onMouseClickChild = jest.fn();

componentTabs = shallow(
    <Tabs
      information={films[5]}
      comments={comments}
      onMouseClickChild={onMouseClickChild}
      currentTab={0}
    >
    </Tabs>
);

it(`state on tab element works correctly`, () => {
  const elementTab = componentTabs.find(`.movie-nav__link`).at(1);
  elementTab.simulate(`click`, {preventDefault() {}});
  expect(onMouseClickChild).toBeCalledTimes(1);
  expect(onMouseClickChild).toHaveBeenNthCalledWith(1, 1);
});
