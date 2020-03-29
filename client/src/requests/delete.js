// ./Requests/deleteData.js

import axios from 'axios';
import { axiosBaseUrl } from './axiosBaseUrl';

axios.defaults.baseURL = axiosBaseUrl;

// DELETE QUIZ
export const quiz = async (quiz_id, token) => {
  console.log(`Detele quiz ${quiz_id}`);
  const Url = '/delete/quiz/';
  await axios.delete(Url, { params: { quiz_id: quiz_id }, headers: { token: token } });
};

// DELETE QUESTION
export const question = async (question_id, token) => {
  console.log(`Detele question ${question_id}`);
  const Url = '/delete/question/';
  await axios.delete(Url, { params: { question_id: question_id }, headers: { token: token } });
};

// DELETE OPTIONS OF THE QUESTION
export const options = async (question_id, token) => {
  console.log(`Detele options of the question ${question_id}`);
  const Url = '/delete/options/';
  await axios.delete(Url, { params: { question_id: question_id }, headers: { token: token } });
};

// DELETE OPTION
export const option = async (option_id, token) => {
  console.log(`Detele option ${option_id}`);
  const Url = '/delete/option/';
  await axios.delete(Url, { params: { option_id: option_id }, headers: { token: token } });
};

// DELETE TOPIC
export const topic = async (topic_id, token) => {
  console.log(`Detele topic ${topic_id}`);
  const Url = '/delete/topic/';
  await axios.delete(Url, { params: { topic_id: topic_id }, headers: { token: token } });
};
