import React from "react";
import PropTypes from 'prop-types';
import SmallCard from "../../components/small-card/small-card.jsx";

class ListFilms extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      filmIndex: -1,
    };
  }

  render() {
    const {films, clickHandler, countFilms} = this.props;
    console.log(films);
    const reducerFilms = films.slice(0, countFilms);
    console.log(reducerFilms);

    return <div className="catalog__movies-list">
      {reducerFilms.map((it, i) => <SmallCard
        key={it.name + i}
        id={i}
        information={{name: it.name, img: it.img, genre: it.genre, year: it.year, posterlarge: it.posterlarge, cover: it.cover, src: it.src, rating: it.rating, ratingCount: it.ratingCount, description: it.description, actors: it.actors}}
        clickHandler={clickHandler}
        isPlaying={false}
        onCardMouseEnter={() => {
          this.setState({filmIndex: i});
        }}
        onCardMouseLeave={() => {
          this.setState({filmIndex: -1});
        }}
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
};

export default ListFilms;
