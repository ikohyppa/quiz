// ../functions/login.js

import jwt_decode from 'jwt-decode';

import * as auth from '../requests/auth';
import * as get from '../requests/get';
import * as insert from '../requests/insert';
import errorHandling from '../functions/errorHandling';

const login = async loginMethod => {
  try {
    let loginName = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (loginMethod === 'Rekisteröidy') {
      const register = await auth.register(loginName, password);
      if (register.auth) {
        window.alert(
          `Rekisteröityminen onnistui. Tervetuloa tenttimään ${loginName}!`
        );
      }
      // User is given rights to all open quizzes
      const quizIds = await get.allQuizzes();
      await quizIds.forEach(quiz => {
        insert.quizuserReg(quiz.quiz_id, register.user_id);
      });
    }

    let quizData = [];
    let topicData = [];
    let status = '';
    const login = await auth.login(loginName, password);
    if (login.auth) {
      const token = login.token;
      localStorage.setItem('token', JSON.stringify(login.token));
      const decoded = jwt_decode(token);
      const username = decoded.username;
      status = decoded.status;
      const user_id = decoded.user_id;
      localStorage.setItem('user', JSON.stringify(username));
      if (loginMethod === 'Kirjaudu') {
        window.alert(
          `Kirjautuminen onnistui. Tervetuloa tenttimään ${loginName}!`
        );
      }
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';

      // quizzes the user is authorized to see are fetched from DB
      quizData = await get.quizzes(
        user_id,
        JSON.parse(localStorage.getItem('token'))
      );
      // questions:[] property is added to every quiz
      quizData.forEach(quiz => {
        quiz.questions = [];
      });
      // if user status is admin also topics are fetched from DB
      if (status === 'admin') {
        topicData = await get.alltopics(
          JSON.parse(localStorage.getItem('token'))
        );
      }
    }
    return [login.auth, status, quizData, topicData];
  } catch (error) {
    errorHandling(error);
    document.getElementById('newPassword').value = '';
  }
};

export default login;
