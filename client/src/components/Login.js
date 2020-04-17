// ../components/Login.js

import React, { useContext } from 'react';

import errorHandling from '../functions/errorHandling';
import login from '../functions/login';
import LoginBox from '../components/LoginBox';
import { QuizDispatch } from '../App';
import { TopicDispatch } from '../App';

const Login = (props) => {
  const { state, setState } = props;

  const dispatch = useContext(QuizDispatch);
  const dispatchTopic = useContext(TopicDispatch);

  const handleLogin = async (loginMethod) => {
    try {
      const [loginOk, status, quizData, topicData] = await login(loginMethod);
      if (loginOk) {
        dispatch({ type: 'initialize', data: quizData });
        dispatch({ type: 'toggleQuizOrder', order: true });
        if (status === 'admin') {
          dispatchTopic({
            type: 'initialize',
            data: topicData,
          });
        }
        setState((prevState) => {
          return {
            ...prevState,
            isAdmin: status === 'admin',
            isLoggedIn: true,
            showLogin: false,
          };
        });
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <LoginBox
      loginMethod={state.loginMethod}
      onClick={() => handleLogin(state.loginMethod)}
    />
  );
};

export default Login;
