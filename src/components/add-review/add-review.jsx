import React from 'react';
import PropTypes from 'prop-types';

const AddReview = (props) => {
  const {films, submitHandler, id, userData} = props;

  const information = films.find((it) => it.id === id);

  return <section className="movie-card movie-card--full">
    <div className="movie-card__header">
      <div className="movie-card__bg">
        <img src={information.backgroundImage} alt={information.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <a href="movie-page.html" className="breadcrumbs__link">{information.name}</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={`https://htmlacademy-react-2.appspot.com${userData.avatarUrl}`} alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <div className="movie-card__poster movie-card__poster--small">
        <img src={information.posterImage} alt={information.ame} width="218" height="327" />
      </div>
    </div>

    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={(evt) => {
        evt.preventDefault();
        const text = evt.target.querySelector(`#review-text`).value;
        const rating = evt.target.querySelector(`.rating__input:checked`).value;
        submitHandler(text, rating);
      }}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  </section>;
};

AddReview.propTypes = {
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
  clickHandler: PropTypes.func,
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  id: PropTypes.number.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AddReview;