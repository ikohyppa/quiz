// ./Components/AppBar.js

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { TopBarBtn } from '../components/Buttons';

export default function TopBar(props) {
  const {
    statusAdmin,
    statusLogin,
    setLoginMethod,
    setSelectedQuiz,
    setShowAbout,
    setShowAdmin,
    setShowLogin,
    setShowLogout,
    setShowQuizzes,
    setSubmitted
  } = props;
  function setShowFalse() {
    setShowLogin(false);
    setSelectedQuiz(null);
    setShowAdmin(false);
    setShowAbout(false);
    setShowQuizzes(false);
    setSubmitted(false);
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        {statusLogin && (
          <h3>Hei {JSON.parse(localStorage.getItem('user'))}!</h3>
        )}
        {!statusLogin && (
          <TopBarBtn
            name={'Rekisteröidy'}
            onClick={() => {
              setShowFalse();
              setShowLogin(true);
              setLoginMethod('Rekisteröidy');
            }}
          />
        )}
        {!statusLogin && (
          <TopBarBtn
            name={'Kirjaudu'}
            onClick={() => {
              setShowFalse();
              setShowLogin(true);
              setLoginMethod('Kirjaudu');
            }}
          />
        )}
        {statusLogin && (
          <TopBarBtn
            name={'Tentit'}
            onClick={() => {
              setShowFalse();
              setShowQuizzes(true);
            }}
          />
        )}
        {statusLogin && statusAdmin && (
          <TopBarBtn
            name={'Admin'}
            onClick={() => {
              setShowFalse();
              props.setShowAdmin(true);
            }}
          />
        )}
        {
          <TopBarBtn
            name={'Info'}
            onClick={() => {
              setShowFalse();
              setShowAbout(true);
            }}
          />
        }
        {statusLogin && (
          <TopBarBtn
            name={'Kirjaudu ulos'}
            onClick={() => {
              localStorage.setItem('token', '');
              localStorage.setItem('user', '');
              setShowFalse();
              setShowLogout(true);
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
