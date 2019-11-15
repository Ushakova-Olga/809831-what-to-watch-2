import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import films from "../../mocks/films";

import withVideoPlayerLarge from "./with-video-player-large";

Enzyme.configure({adapter: new Adapter()});

let component;

const mockComponent = ({videoRef, onPlayButtonClick, onFullScreenButtonClick}) => (
  <div className="player">
    <video className="player__video" ref={videoRef} >
    </video>

    <button type="button" className="player__exit">Exit</button>
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value="0" max="100"></progress>
          <div className="player__toggler">Toggler</div>
        </div>
        <div className="player__time-value">00:00:00</div>
      </div>

      <div className="player__controls-row">
        <button
          className="player__play"
          onClick={onPlayButtonClick}
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </button>

        <div className="player__name">Transpotting</div>
        <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>
);

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

it(`withVideoPlayerLarge iniial state set correctly`, () => {
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
