import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";

const SignIn = (props) => {
  const {isAuthorizationRequired, onSubmit, onChange, errorEmail, errorPassword, isFormValid, errorLogin} = props;
  const emailClass = errorEmail ? `sign-in__field sign-in__field--error` : `sign-in__field`;
  const passwordClass = errorPassword ? `sign-in__field sign-in__field--error` : `sign-in__field`;

  return isAuthorizationRequired ? <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <Link className="logo__link" to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <h1 className="page-title user-page__title">Sign in</h1>
    </header>

    <div className="sign-in user-page__content">
      <form action="#" className="sign-in__form" onSubmit={
        (evt) => {
          evt.preventDefault();
          const email = evt.target.querySelector(`#user-email`).value;
          const password = evt.target.querySelector(`#user-password`).value;
          onSubmit(email, password);
        }
      }
      onChange={
        (evt) => {
          evt.preventDefault();
          let email = ``;
          let password = ``;
          if (evt.target.name === `user-email`) {
            email = evt.target.value;
          }
          if (evt.target.name === `user-password`) {
            password = evt.target.value;
          }
          onChange(email, password);
        }
      }>
        <div className="sign-in__fields">
          <div className="sign-in__message">
            <p>{errorEmail}<br/>{errorPassword}</p>
          </div>
          {(errorLogin.length > 0) ?
            <div className="sign-in__message">
              <p>{errorLogin}</p>
            </div> : ``
          }
          <div className={emailClass}>
            <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className={passwordClass}>
            <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit" disabled={!isFormValid}>Sign in</button>
        </div>
      </form>
    </div>

    <footer className="page-footer">
      <div className="logo">
        <a href="main.html" className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div> : <Redirect to="/"></Redirect>;
};

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  errorEmail: PropTypes.string.isRequired,
  errorPassword: PropTypes.string.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  errorLogin: PropTypes.string.isRequired,
};

export default SignIn;
