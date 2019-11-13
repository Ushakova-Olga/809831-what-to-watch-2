import React from "react";
import PropTypes from 'prop-types';
import SmallCard from "../../components/small-card/small-card.jsx";
import withActiveItem from '../../hoc/with-active-item/with-active-item.jsx';

const SmallCardWrapped = withActiveItem(SmallCard);

class ListFilms extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {films, clickHandler, countFilms} = this.props;
    const reducerFilms = films.slice(0, countFilms);

    return <div className="catalog__movies-list">
      {reducerFilms.map((it, i) => <SmallCardWrapped

        key={it.name + i}
        id={i}
        information={{name: it.name, img: it.img, genre: it.genre, year: it.year, posterlarge: it.posterlarge, cover: it.cover, src: it.src, rating: it.rating, ratingCount: it.ratingCount, description: it.description, actors: it.actors}}
        clickHandler={clickHandler}
        isPlaying={false}
      />)}
    </div>;
  }
}

ListFilms.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
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
      }).isRequired).isRequired,
  clickHandler: PropTypes.func,
  countFilms: PropTypes.number.isRequired,
};

export default ListFilms;
