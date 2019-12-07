import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import films from "../../mocks/films";

import withVideoPlayerLarge from "./with-video-player-large";

Enzyme.configure({adapter: new Adapter()});

let component;

const mockComponent = ({videoRef, onPlayButtonClick, onFullScreenButtonClick}) => <div>
  <video className="player__video" ref={videoRef} >
  </video>
  <button type="button" className="player__exit">Exit</button>
  <button className="player__play" onClick={onPlayButtonClick}>Pause</button>
  <button className="player__full-screen" onClick={onFullScreenButtonClick}>Full screen</button>
</div>;

mockComponent.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  ]),
};

const MockComponentWrapped = withVideoPlayerLarge(mockComponent);
const onPlayButtonClick = jest.fn();

component = mount(<MockComponentWrapped isLoading={false} onPlayButtonClick={onPlayButtonClick} information={films[0]} />);

jest
  .spyOn(window.HTMLMediaElement.prototype, `play`)
  .mockImplementation(() => {});

it(`withVideoPlayerLarge initial state set correctly`, () => {
  expect(component.state(`isPlaying`)).toBe(false);
  expect(component.state(`isFullscreen`)).toBe(false);
});

it(`click on PlayButton changes state`, () => {
  const button = component.find(`.player__play`);
  button.simulate(`click`);

  expect(component.state(`isPlaying`)).toBe(true);
});

it(`click on FullscreenButton changes state`, () => {
  const button = component.find(`.player__full-screen`);
  button.simulate(`click`);

  expect(component.state(`isFullscreen`)).toBe(true);
});
