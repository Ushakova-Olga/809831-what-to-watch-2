import React from "react";
import PropTypes from 'prop-types';
import UserBlock from "../../components/user-block/user-block.jsx";
import ListFilms from "../../components/list-films/list-films.jsx";

const FavoriteList = (props) => {
  const {isAuthorizationRequired, userData, films, countFilms, clickHandler} = props;

  return <>
  <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <a href="main.html" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <h1 className="page-title user-page__title">My list</h1>

      <UserBlock isAuthorizationRequired={isAuthorizationRequired} userData={userData} />
    </header>



    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ListFilms films={films} countFilms={countFilms} clickHandler={clickHandler} />
    </section>
  </div>
  </>;
  }


export default FavoriteList;
