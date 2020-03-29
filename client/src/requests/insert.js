// ./Requests/addData.js

import axios from 'axios';
import { axiosBaseUrl } from './axiosBaseUrl';

axios.defaults.baseURL = axiosBaseUrl;

// ADD QUIZ
export const quiz = async (quiz, token) => {
  console.log(`Add quiz ${quiz}`);
  const Url = '/insert/quiz/';
  const result = await axios.post(Url, { params: { quiz: quiz } }, { headers: { token: token } });
  //console.log('Add quiz result');
  //console.log(result);
  console.log(`Add quiz quiz_id ${result.data.quiz_id}`);
  return result.data.quiz_id;
};

// ADD TOPIC
export const topic = async (topic, token) => {
  console.log(`Add topic ${topic}`);
  const Url = '/insert/topic/';
  const result = await axios.post(Url, { params: { topic: topic } }, { headers: { token: token } });
  //console.log('Add topic results');
  //console.log(result);
  console.log(`Add quiz topic_id ${result.data.topic_id}`);
  return result.data.topic_id;
};

// ADD QUESTION
export const question = async (quiz_id, token) => {
  console.log(`Add question to quiz ${quiz_id}`);
  const Url = '/insert/question/';
  const result = await axios.post(Url, { params: { quiz_id: quiz_id } }, { headers: { token: token } });
  //console.log('Add question results');
  //console.log(results);
  console.log(`Add quiz question_id ${result.data.question_id}`);
  return result.data.question_id;
};

// INSERT OPTION
export const option = async (question_id, token) => {
  console.log(`Add option to question ${question_id}`);
  const Url = '/insert/option/';
  const result = await axios.post(Url, { params: { question_id: question_id } }, { headers: { token: token } });
  console.log('result');
  console.log(result);
  return result.data.option_id;
};

// INSERT QUIZ_USER IN REGISTER
export const quizuserReg = async (quiz_id, user_id) => {
  console.log(`Add record in quiz_user for quiz_id ${quiz_id} and user_id ${user_id}`);
  const Url = '/insert/quizuser/reg/';
  const result = await axios.post(Url, { params: { quiz_id: quiz_id, user_id: user_id } });
  console.log('Add quizuserReg record request result');
  console.log(result);
  console.log(`Status: ${result.status}`);
  return result.status;
};

// INSERT QUIZ_USER
export const quizuser = async (quiz_id, token) => {
  console.log(`Add record in quiz_user for quiz_id ${quiz_id}`);
  const Url = '/insert/quizuser/';
  const result = await axios.post(Url, { params: { quiz_id: quiz_id } }, { headers: { token: token } });
  console.log('Add quiz_user record request result');
  console.log(result);
  console.log(`Status: ${result.status}`);
  return result.status;
};

// INSERT USER_OPTION
export const userSelected = async (option_id, token) => {
  console.log(`Set selected value as false in user_option table for current user and option_id ${option_id}`);
  const Url = '/insert/useroption/selected/';
  const result = await axios.post(Url, { params: { option_id: option_id} }, { headers: { token: token } });
  //console.log('Insert user selected request result');
  //console.log(result);
  //console.log(`Request status: ${result.status}`);
  return result.status;
};
