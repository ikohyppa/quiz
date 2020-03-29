// ./Requests/updateData.js

import axios from 'axios';
import { axiosBaseUrl } from './axiosBaseUrl';

axios.defaults.baseURL = axiosBaseUrl;

// UPDATE QUESTION
export const quiz = async (quiz_id, quiz, token) => {
    //console.log(`Update quiz ${quiz_id} title to ${quiz}`);
    const Url = '/update/quiz/';
    const result = await axios.put(Url, { params: { quiz_id: quiz_id, quiz: quiz } }, { headers: { token: token } });
    //console.log('Update quiz result');
    //console.log(result);
    //console.log(`Update quiz status ${result.status}`);
    return result.status;
};

// UPDATE QUESTION
export const question = async (question_id, question, token) => {
    //console.log(`Update question ${question_id} question to ${question}`);
    const Url = '/update/question/';
    const result = await axios.put(Url, { params: { question_id: question_id, question: question } }, { headers: { token: token } });
    //console.log('Update question result');
    //console.log(result);
    //console.log(`Update question status ${result.status}`);
    return result.status;
};

// UPDATE QUESTION, CLEAR TOPIC_ID
export const qnTopicClear = async (topic_id, token) => {
    //console.log(`Set topic_id to NULL in question records where topic_id ${topic_id}`);
    const Url = '/update/question/topic/clear/';
    const result = await axios.put(Url, { params: { topic_id: topic_id } }, { headers: { token: token } });
    //console.log('Update question result');
    //console.log(result);
    //console.log(`questionId ${result.data.question_id}`);
    return result.data.question_id;
};

// UPDATE QUESTION TOPIC_ID
export const qnTopic = async (question_id, topic_id, token) => {
    //console.log(`Update topic_id of the question to value ${topic_id}`);
    const Url = '/update/question/topic/';
    const result = await axios.put(Url, { params: { question_id: question_id, topic_id: topic_id } }, { headers: { token: token } });
    //console.log('Update question result');
    //console.log(result);
    //console.log(`Update question status: ${result.data.status}`);
    return result.data.status;
};

// UPDATE TOPIC
export const topic = async (topic_id, topic, token) => {
    //console.log(`Update topic ${topic_id} to value ${topic}`);
    const Url = '/update/topic/';
    const result = await axios.put(Url, { params: { topic_id: topic_id, topic: topic } }, { headers: { token: token } });
    //console.log('Update topic result');
    //console.log(result);
    //console.log(`Update topic status: ${result.data.status}`);
    return result.data.status;
};

// UPDATE OPTION TEXT
export const option = async (option_id, answer, token) => {
    //console.log(`Update option ${option_id} text ${answer}`);
    const Url = '/update/option/';
    const result = await axios.put(Url, { params: { option_id: option_id, answer: answer } }, { headers: { token: token } });
    //console.log('Update option result');
    //console.log(result);
    //console.log(`Update option status ${result.status}`);
    return result.status;
};


// UPDATE OPTION SELECTED
export const optSelected = async (option_id, selected, token) => {
    console.log(`Set selected ${selected} in option ${option_id}`);
    const Url = '/update/option/selected/';
    const result = await axios.put(Url, { params: { option_id: option_id, selected: selected } }, { headers: { token: token } });
    //console.log('Update option selected');
    //console.log(result);
    //console.log(`Request status: ${result.status}`);
    return result.status;
};

// UPDATE OPTION CORRECT
export const optCorrect = async (option_id, correct, token) => {
    //console.log(`Set correct ${correct} in option ${option_id}`);
    const Url = '/update/option/correct/';
    const result = await axios.put(Url, { params: { option_id: option_id, correct: correct } }, { headers: { token: token } });
    //console.log('Update option correct');
    //console.log(result);
    //console.log(`Request status ${result.status}`);
    return result.status;
};

// UPDATE SUBMITTED STATUS
export const submitted = async (quiz_id, token) => {
    //console.log(`Update quiz ${quiz_id} as submitted for current user`);
    const Url = '/update/quizuser/submitted';
    const result = await axios.put(Url, { params: { quiz_id: quiz_id} }, { headers: { token: token } });
    //console.log('Update quiz_user submitted request result');
    //console.log(`Request status ${result.status}`);
    return result.status;
};

// UPDATE OPTION SELECTED
export const userSelected = async (option_id, selected, token) => {
    console.log(`Update user_option table select as ${selected} for current user and option_id ${option_id}`);
    const Url = '/update/useroption/selected';
    const result = await axios.put(Url, { params: { option_id: option_id, selected: selected} }, { headers: { token: token } });
    //console.log('Update quiz_user submitted request result');
    //console.log(`Request status ${result.status}`);
    return result.status;
};
