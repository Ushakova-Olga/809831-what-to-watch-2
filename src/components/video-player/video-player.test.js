import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "../video-player/video-player";

it(`Video player correctly renders`, () => {
  const tree = renderer
    .create(<VideoPlayer
      previewVideoLink={``}
      previewImage={``}
      isPlaying={false}
      key={``}>
    </VideoPlayer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
