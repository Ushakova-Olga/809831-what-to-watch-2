import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withLogin = ((Component) => {
  const WithLogin = (props) => {
    const {isAuthorizationRequired} = props;
    if (isAuthorizationRequired) {
      return <Redirect to="/login" />;
    } else {
      return <Component
        {...props}
      />;
    }
  };

  WithLogin.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired,
  };

  return WithLogin;
});

export default withLogin;
