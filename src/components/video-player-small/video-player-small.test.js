import React from "react";
import renderer from "react-test-renderer";
import VideoPlayerSmall from "../video-player-small/video-player-small";

it(`Video player small correctly renders`, () => {
  const tree = renderer
    .create(<VideoPlayerSmall
      previewVideoLink={``}
      previewImage={``}
      isPlaying={false}
      key={``}>
    </VideoPlayerSmall>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
