import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

class TabReviews extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentTab, indexTab, comments} = this.props;
    const commentsSorted = comments.sort((a, b) => moment(b.date) - moment(a.date));
    console.log(commentsSorted);
    const left = [];
    const right = [];
    commentsSorted.forEach((it, i, arr) => {
      if (i % 2 === 0) {
        left.push(it);
      } else {
        right.push(it);
      }
    });
    if (currentTab === indexTab) {
      return <article className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {left.map((it, i, arr) => {
            return <div className="review" key={it.id}>
              <blockquote className="review__quote">
                <p className="review__text">
                  {it.comment}
                </p>

                <footer className="review__details">
                  <cite className="review__author">{it.user.name}</cite>
                  <time className="review__date" dateTime={moment(it.date).format(`YYYY-MM-DD`)}>
                    {moment(it.date).format(`MMMM DD, YYYY`)}
                  </time>
                </footer>
              </blockquote>
              <div className="review__rating">{it.rating}</div>
            </div>;
          })}
        </div>
        <div className="movie-card__reviews-col">
          {right.map((it, i, arr) => {
            return <div className="review" key={it.id}>
              <blockquote className="review__quote">
                <p className="review__text">
                  {it.comment}
                </p>

                <footer className="review__details">
                  <cite className="review__author">{it.user.name}</cite>
                  <time className="review__date" dateTime={moment(it.date).format(`YYYY-MM-DD`)}>
                    {moment(it.date).format(`MMMM DD, YYYY`)}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{it.rating}</div>
            </div>;
          })}
        </div>
      </article>;
    }

    return null;
  }
}

TabReviews.propTypes = {
  currentTab: PropTypes.number.isRequired,
  indexTab: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired).isRequired,
};

export default TabReviews;
