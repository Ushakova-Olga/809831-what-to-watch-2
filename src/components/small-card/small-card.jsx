import React from "react";
import PropTypes from 'prop-types';

const SmallCard = (props) => {

  const {information, clickHandler} = props;
  const {name, img} = information;

  return <>
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={`img/${img}`} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onmouseover={() => {clickHandler(information)}}>{name}</a>
      </h3>
    </article>
  </>;
};

ListFilms.propTypes = {
  name: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
};

export default ListFilms;
