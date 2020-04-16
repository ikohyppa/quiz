// ../components/Login.js

import React, { useContext } from 'react';

import errorHandling from '../functions/errorHandling';
import login from '../functions/login';
import LoginBox from '../components/LoginBox';
import { QuizDispatch } from '../App';
import { TopicDispatch } from '../App';

const Login = (props) => {
  const { setShowLogin, setStatusLogin, setStatusAdmin, loginMethod } = props;

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
        setShowLogin(false);
        setStatusLogin(true);
        setStatusAdmin(status === 'admin');
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <LoginBox
      loginMethod={loginMethod}
      onClick={() => handleLogin(loginMethod)}
    />
  );
};

export default Login;
