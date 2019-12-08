import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideoPlayerSmall from "./with-video-player-small";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <video/>;
const MockComponentWrapped = withVideoPlayerSmall(MockComponent);

const videoRefPlaying = {
  pause: jest.fn(),
  play: jest.fn(),
  load: jest.fn(),
  readyState: 2,
};

const videoRefNotPlaying = {
  pause: jest.fn(),
  play: jest.fn(),
  load: jest.fn(),
  readyState: 2,
};

it(`WithVideoPlayerSmall correctly play and paysed in dependence of prop isPlaying`, () => {
  const componentPlaying = shallow(<MockComponentWrapped isPlaying={false} previewImage={``} previewVideoLink={``} />);
  const componentNotPlaying = shallow(<MockComponentWrapped isPlaying={true} previewImage={``} previewVideoLink={``} />);
  componentPlaying.instance()._videoRef.current = videoRefPlaying;
  componentNotPlaying.instance()._videoRef.current = videoRefNotPlaying;
  componentPlaying.setProps({isPlaying: true});
  componentNotPlaying.setProps({isPlaying: false});
  expect(componentPlaying.instance()._videoRef.current.play).toHaveBeenCalledTimes(1);
  expect(componentNotPlaying.instance()._videoRef.current.pause).toHaveBeenCalledTimes(1);
  expect(componentNotPlaying.instance()._videoRef.current.load).toHaveBeenCalledTimes(1);
});
