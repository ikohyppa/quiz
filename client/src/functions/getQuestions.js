// ../functions/getQuestions.js

import * as get from '../requests/get';
import getDbData from '../functions/getDbData';
import errorHandling from '../functions/errorHandling';

const getQuestions = async (quiz_id, questions_length, isAdmin) => {
  let submitted = false;
  let correct = [];
  let questions = [];
  console.log(`getQuestions quiz_id: ${quiz_id}`);
  console.log(`questions: ${questions_length}`);
  try {
    // the submitted state of the current quiz for the current user is checked
    submitted = await get.submittedstatus(
      quiz_id,
      JSON.parse(localStorage.getItem('token'))
    );
    // on first time select quiz.questions.length is 0, and questions are get from DB
    if (questions_length === 0) {
      questions = await getDbData(quiz_id, isAdmin);
      // if the quiz has been submitted the correct answer are get from DB
      if (submitted) {
        correct = await get.correct(
          quiz_id,
          JSON.parse(localStorage.getItem('token'))
        );
      }
    }
    return [submitted, questions, correct];
  } catch (error) {
    errorHandling(error);
  }
};

export default getQuestions;
