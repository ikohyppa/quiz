import axios from 'axios';
import { axiosBaseUrl } from './axiosBaseUrl';

axios.defaults.baseURL = axiosBaseUrl;

// GET ALL QUIZZ_IDs
export const allQuizzes = async () => {
  //console.log(`Get all quizzes request`);
  const Url = '/get/quizzes/';
  const result = await axios.get(Url);
  //console.log(`Request ALL QUIZZES result:`);
  //console.log(result.data);
  return result.data;
};

// GET QUIZZES RELATED TO A USER
export const quizzes = async (user_id, token) => {
    //console.log(`Get quizzes request for user: ${userId}`);
    const Url = '/get/quizzes/user';
    const result = await axios.get(Url, { params: { user_id: user_id }, headers: { token: token } });
    //console.log(`Request QUIZZES result:`);
    //console.log(result.data);
    return result.data;
};

// GET QUIZ BY QUIZ TITLE
export const quiz = async (quiz, token) => {
  console.log(`Get a quiz ${quiz}`);
  const Url = '/get/quiz/';
  let result = await axios.get(Url, { params: { quiz: quiz }, headers: { token: token } });
  console.log(`Axios request quiz result:`);
  console.log(result);
  return result.data.quiz_id;
};

// GET QUESTIONS RELATED TO A QUIZ
export const questions = async (quiz_id, token) => {
  console.log(`Get question request for quiz: ${quiz_id}`);
  const Url = '/get/questions/';
  let result = await axios.get(Url, { params: { quiz_id: quiz_id }, headers: { token: token } });
  console.log(`GET questions request result:`);
  console.log(result);
  console.log('results.data');
  console.log(result.data);
  return result.data;
};

// GET OPTIONS RELATED TO A SET QUESTIONS
export const options = async (questionIds, token) => {
  //console.log(`Get options request for questions: ${questionIds}`);
  const Url = '/get/options/';
  let result = await axios.get(Url, { params: { questionids: questionIds }, headers: { token: token } });
  //console.log(`Request select result:`);
  //console.log(result.data);
  return result.data;
};

// GET CORRECT ANSWERS FOR OPTIONS RELATED TO THE QUIZ
export const correct = async (quiz_id, token) => {
  //console.log(`Get correct answers request for the quiz: ${quiz_id}`);
  const Url = '/get/correct/';
  let result = await axios.get(Url, { params: { quiz_id: quiz_id }, headers: { token: token } });
  console.log(`Get correct request result:`);
  console.log(result.data);
  return result.data;
};

// GET TOPICS RELATED TO A SET QUESTIONS
export const topics = async (questionIds, token) => {
  //console.log(`Get topics request for questions: ${questionIds}`);
  const Url = '/get/topics/';
  let result = await axios.get(Url, { params: { questionids: questionIds }, headers: { token: token } });
  //console.log(`Request select result:`);
  //console.log(result.data);
  return result.data;
};

// GET ALL TOPICS FOR ADMIN
export const alltopics = async token => {
  //console.log(`Get all topics request`);
  const Url = '/get/topics/all/';
  let result = await axios.get(Url, { headers: { token: token } });
  //console.log(`Request select result:`);
  console.log(result.data);
  return result.data;
};

// GET A TOPIC
export const topic = async (topic, token) => {
  console.log(`Get a topic ${topic}`);
  const Url = '/get/topic/';
  let result = await axios.get(Url, { params: { topic: topic }, headers: { token: token } });
  console.log(`Axios request topic result:`);
  console.log(result.data);
  return result.data.topic_id;
};

// GET SUBMITTED STATUS
export const submittedstatus = async (quiz_id, token) => {
  console.log(`Get the submitted status of the quiz ${quiz_id} for the current user`);
  const Url = '/get/substatus/';
  const result = await axios.get(Url, { params: { quiz_id: quiz_id }, headers: { token: token } });
  console.log(`Axios get submittedStatus request result:`);
  console.log(result.data);
  return result.data[0].submitted;
};

// GET USER_OPTION STATUS
export const userOption = async (optionIds, token) => {
  console.log(`Get the user_option records for the current user`);
  const Url = '/get/useroption/';
  const result = await axios.get(Url, { params: { optionIds: optionIds }, headers: { token: token } });
  console.log(`Axios get userOption request result:`);
  console.log('result');
  console.log(result);
  console.log(`result.data: ${result.data}`);
  return result.data;
};