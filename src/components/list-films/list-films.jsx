import React from "react";
import PropTypes from "prop-types";
import SmallCard from "../../components/small-card/small-card.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withTimer from "../../hocs/with-timer/with-timer.jsx";

const SmallCardWrapped = withActiveItem(withTimer(SmallCard));

const ListFilms = (props) => {
  const {films, filmsCount} = props;
  const reducerFilms = films.slice(0, filmsCount);

  return <div className="catalog__movies-list">
    {reducerFilms.map((it, i) => <SmallCardWrapped

      key={it.name + i}
      id={it.id}
      information={{
        name: it.name,
        previewImage: it.previewImage,
        genre: it.genre,
        released: it.released,
        posterImage: it.posterImage,
        backgroundImage: it.backgroundImage,
        previewVideoLink: it.previewVideoLink,
        scoresCount: it.scoresCount,
        description: it.description,
        director: it.director,
        runTime: it.runTime,
        rating: it.rating,
        videoLink: it.videoLink,
        isFavorite: it.isFavorite,
        id: it.id,
        starring: it.starring}}
      isPlaying={false}
    />)}
  </div>;
};

ListFilms.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        released: PropTypes.number.isRequired,
        posterImage: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired,
        previewVideoLink: PropTypes.string.isRequired,
        scoresCount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        runTime: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        videoLink: PropTypes.string.isRequired,
      }).isRequired).isRequired,
  filmsCount: PropTypes.number.isRequired,
};

export default ListFilms;
