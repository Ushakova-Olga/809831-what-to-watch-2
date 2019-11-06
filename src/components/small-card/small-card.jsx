import React from "react";
import PropTypes from 'prop-types';
import VideoPlayer from "../../components/video-player/video-player.jsx";

class SmallCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this.timerId = null;
    this._cardMouseEnterHandler = this._cardMouseEnterHandler.bind(this);
  }

  _cardMouseEnterHandler() {
    this.setState({isPlaying: !this.state.isPlaying});
    this.props.onCardMouseEnter();
    // this.props.clickHandler();
  }

  render() {
    const {information, clickHandler, onCardMouseLeave, id} = this.props;
    const {isPlaying} = this.state;
    const {name, img, genre, year, posterlarge, cover, src, rating, ratingCount, description, actors} = information;

    return <article className="small-movie-card catalog__movies-card"
      onClick={() => {
        window.location.href = `/details`;
        clickHandler();
      }}
      onMouseEnter={() => {
        this.timerId = setTimeout(this._cardMouseEnterHandler, 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(this.timerId);
        onCardMouseLeave();
        this.setState({isPlaying: !this.state.isPlaying});
      }}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          src={src}
          img={`img/${img}`}
          isPlaying={isPlaying}
          clickHandler={clickHandler}
          key={`v${id}`}>
        </VideoPlayer>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" >{name}</a>
      </h3>
    </article>;
  }
}

SmallCard.propTypes = {
  information: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    posterlarge: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    ratingCount: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
  }).isRequired,
  clickHandler: PropTypes.func,
  onCardMouseEnter: PropTypes.func,
  onCardMouseLeave: PropTypes.func,
  id: PropTypes.number.isRequired,
};

export default SmallCard;
