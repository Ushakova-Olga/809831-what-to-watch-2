import React from "react";
import PropTypes from "prop-types";

const FILTERS_COUNT = 9;

class ListGenres extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleFilterClick = this._handleFilterClick.bind(this);
  }

  _handleFilterClick(evt) {
    const {onClickFilter} = this.props;
    evt.preventDefault();
    onClickFilter(evt.target.textContent.toLowerCase());
  }

  _handleListGenres() {
    const {initialFilms} = this.props;
    const list = [];
    list.push(`All genres`);
    initialFilms.forEach((it) => {
      list.push(it.genre);
    });

    const set = new Set(list);
    return [...set].slice(0, FILTERS_COUNT);
  }

  render() {
    return (
      <ul className="catalog__genres-list">
        {this._handleListGenres().map((it) => {
          const nameClass = this.props.currentGenre.toLowerCase() === it.toLowerCase() ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`;
          return (
            <li
              className={nameClass}
              key={it}>
              <a href="#" className="catalog__genres-link" onClick={this._handleFilterClick}>{it}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

ListGenres.propTypes = {
  initialFilms: PropTypes.arrayOf(
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
        isFavorite: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
      }).isRequired).isRequired,
  onClickFilter: PropTypes.func,
  currentGenre: PropTypes.string.isRequired,
};

export default ListGenres;
