import React from "react";
import renderer from "react-test-renderer";
import VideoPlayerLarge from "../video-player-large/video-player-large";
import films from "../../mocks/films";

it(`VideoPlayerLarge renders correctly`, () => {
  const mockRef = React.createRef();
  const component = renderer
    .create(
        <VideoPlayerLarge
          information={films[0]}
          videoRef={mockRef}
          isPlaying={false}
          isLoading={false}
          isFullscreen={false}
          progress={0}
          runTime={0}
          onPlayButtonClick={() => {}}
          onFullScreenButtonClick={() => {}}
        />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
