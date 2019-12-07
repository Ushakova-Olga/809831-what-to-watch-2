import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

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

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isAuthorizationRequired: state.isAuthorizationRequired,
  });

  return connect(mapStateToProps, null)(WithLogin);
});

export default withLogin;
