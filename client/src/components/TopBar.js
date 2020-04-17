// ./Components/AppBar.js

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { TopBarBtn } from '../components/Buttons';

export default function TopBar(props) {
  const { state, setState } = props;

  function setShowFalse() {
    setState((prevState) => {
      return {
        ...prevState,
        selectedQuiz: null,
        showAbout: false,
        showAdmin: false,
        showLogin: false,
        showQuizzes: false,
        submitted: false,
      };
    });
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        {state.isLoggedIn && (
          <h3>Hei {JSON.parse(localStorage.getItem('user'))}!</h3>
        )}
        {!state.isLoggedIn && (
          <TopBarBtn
            name={'Rekisteröidy'}
            onClick={() => {
              setShowFalse();
              setState((prevState) => {
                return {
                  ...prevState,
                  loginMethod: 'Rekisteröidy',
                  showLogin: true,
                };
              });
            }}
          />
        )}
        {!state.isLoggedIn && (
          <TopBarBtn
            name={'Kirjaudu'}
            onClick={() => {
              setShowFalse();
              setState((prevState) => {
                return {
                  ...prevState,
                  loginMethod: 'Kirjaudu',
                  showLogin: true,
                };
              });
            }}
          />
        )}
        {state.isLoggedIn && (
          <TopBarBtn
            name={'Tentit'}
            onClick={() => {
              setShowFalse();
              setState((prevState) => {
                return { ...prevState, showQuizzes: true };
              });
            }}
          />
        )}
        {state.isLoggedIn && state.isAdmin && (
          <TopBarBtn
            name={'Admin'}
            onClick={() => {
              setShowFalse();
              setState((prevState) => {
                return { ...prevState, showAdmin: true };
              });
            }}
          />
        )}
        {
          <TopBarBtn
            name={'Info'}
            onClick={() => {
              setShowFalse();
              setState((prevState) => {
                return { ...prevState, showAbout: true };
              });
            }}
          />
        }
        {state.isLoggedIn && (
          <TopBarBtn
            name={'Kirjaudu ulos'}
            onClick={() => {
              localStorage.setItem('token', '');
              localStorage.setItem('user', '');
              setShowFalse();
              setState((prevState) => {
                return { ...prevState, showLogout: true };
              });
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
