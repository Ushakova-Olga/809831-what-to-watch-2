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
    const {films, clickHandler} = this.props;
    const {filmIndex} = this.state;
    return <div className="catalog__movies-list">
        {films.map((it, i, arr) => <SmallCard key={it.name + i} information={it} clickHandler={clickHandler} />)}
      </div>;
  }
};

ListFilms.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  clickHandler: PropTypes.func,
};

export default ListFilms;
