import React from "react";
import PropTypes from "prop-types";

const ErrorLoading = (props) => {
  const {error} = props;
  return (
    <h1 style={{textAlign: `center`, marginTop: `200px`, lineHeight: `2em`}}>Произошла ошибка {error}. Попробуйте загрузить страницу попозже.</h1>
  );
};

ErrorLoading.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorLoading;
