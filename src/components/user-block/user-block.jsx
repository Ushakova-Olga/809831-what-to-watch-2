import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserBlock = (props) => {
  const {isAuthorizationRequired, userData} = props;

  return isAuthorizationRequired ?
    <div className="user-block">
      <Link to={`/login`} className="user-block__link">Sign in</Link>
    </div>
    :
    <div className="user-block">
      <Link to={`/mylist`}>
        <div className="user-block__avatar">
          <img src={`https://htmlacademy-react-2.appspot.com${userData.avatarUrl}`} alt="User avatar" width="63" height="63" />
        </div>
      </Link>
    </div>;
};

UserBlock.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default UserBlock;
