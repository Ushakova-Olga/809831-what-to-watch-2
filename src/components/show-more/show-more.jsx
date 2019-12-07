import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {onClickMore} = props;

  return (
    <div className="catalog__more">
      <button
        onClick={onClickMore}
        className="catalog__button"
        type="button">
          Show more
      </button>
    </div>
  );
};

ShowMore.propTypes = {
  onClickMore: PropTypes.func.isRequired
};

export default ShowMore;
