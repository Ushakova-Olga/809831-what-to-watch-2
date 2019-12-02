import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

class TabReviews extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentTab, indexTab, comments} = this.props;
    console.log(comments);
    if (currentTab === indexTab) {
      return <article className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {comments.map((it,i,arr) => {
            if (i < arr.length/2) {
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
                  </div>
            }
          })}
        </div>
        <div className="movie-card__reviews-col">
        {comments.map((it,i,arr) => {
          if (i >= arr.length/2) {
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
                </div>
          }
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
};

export default TabReviews;
