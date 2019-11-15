import React from "react";
import PropTypes from 'prop-types';

class ListGenres extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  render() {
    return (
      <ul className="catalog__genres-list">
        {this.getListGenres().map((it) => {
          const nameClass = this.props.currentGenre.toLowerCase() === it.toLowerCase() ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`;
          return (
            <li
              className={nameClass}
              key={it}>
              <a href="#" className="catalog__genres-link" onClick={this.onFilterClick}>{it}</a>
            </li>
          );
        })}
      </ul>
    );
  }

  onFilterClick(evt) {
    const {clickFilterHandler} = this.props;
    evt.preventDefault();
    clickFilterHandler(evt.target.textContent.toLowerCase());
  }

  getListGenres() {
    const list = [];
    list.push(`All genres`);
    films.forEach((it) => {
      list.push(it.genre);
    });

    const set = new Set(list);
    return [...set];
  }
}

ListGenres.propTypes = {
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
  clickFilterHandler: PropTypes.func,
  currentGenre: PropTypes.string.isRequired,
};

export default ListGenres;
