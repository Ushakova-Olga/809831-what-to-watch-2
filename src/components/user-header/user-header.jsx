import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserHeader = (props) => {
  const {isAuthorizationRequired, userData} = props;

  return isAuthorizationRequired ?
    <header className="page-header">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        <Link to={`/login`} className="user-block__link">Sign in</Link>
      </div>
    </header>
    :
    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        <Link to={`/mylist`}>
          <div className="user-block__avatar">
            <img src={`https://htmlacademy-react-2.appspot.com${userData.avatarUrl}`} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      </div>
    </header>;
  }


export default UserHeader;
