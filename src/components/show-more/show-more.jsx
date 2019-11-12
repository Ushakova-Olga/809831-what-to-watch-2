import React from "react";
import PropTypes from 'prop-types';

const ShowMore = (props) => {
  const {clickHandlerMore} = props;
  console.log(clickHandlerMore);

  return (
    <div className="catalog__more">
      <button
        onClick={clickHandlerMore}
        className="catalog__button"
        type="button">
          Show more
      </button>
    </div>
  );
};

ShowMore.propTypes = {
  clickHandlerMore: PropTypes.func.isRequired
};

export default ShowMore;
