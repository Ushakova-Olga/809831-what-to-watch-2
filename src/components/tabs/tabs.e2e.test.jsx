import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "./tabs";
import films from "../../mocks/films";

Enzyme.configure({adapter: new Adapter()});

let componentTabs;

componentTabs = shallow(
    <Tabs information={films[5]}>
    </Tabs>
);

it(`state on tab element works correctly`, () => {
  const elementTab = componentTabs.find(`.movie-nav__link`).at(1);
  elementTab.simulate(`click`, {preventDefault() {}});
  expect(componentTabs.state(`currentTab`)).toBe(1);
});
