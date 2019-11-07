import React from "react";
import PropTypes from 'prop-types';

export default class ListGenres extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentFilter: `All genres`
    };
  }

  render(){
    return <ul>
      {this.getListGenres().map((it, i) => <li>
        it.genre
        </li>
      }
    </ul>;
  }

  getListGenres() {
    const {films} = this.props;
    const list = {};
    list.push(`All genres`);
    films.forEach((it) => {
      list.push(it.genre);
    });
    console.log(list);
    return list;
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
};

export default ListGenres;
