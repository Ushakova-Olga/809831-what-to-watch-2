import React from "react";
import PropTypes from 'prop-types';

class ListFilms extends React.PureComponent {
  const {films} = props;

  constructor(props) {
    super(props);

    this.state = {
      filmIndex: -1,
    };
  }

  render() {
    const {films, clickHandler} = this.props;
    const {filmIndex} = this.state;

    return
      <div className="catalog__movies-list">
        {films.map((it, i, arr) => <SmallCard key={it.name + i} information={it} clickHandler={clickHandler} />)}
      </div>
  }
};

ListFilms.propTypes = {
  name: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
};

export default ListFilms;
