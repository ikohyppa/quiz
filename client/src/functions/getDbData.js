// GetDbData.js

import * as get from '../requests/get';
import * as insert from '../requests/insert';

export default async function getDbData(quizId, adminStatus) {
  // Get questions for the current quiz
  const questions = await get.questions(quizId, JSON.parse(localStorage.getItem('token')));
  console.log('questions resutl');
  console.log(questions);
  // Create array for question_ids
  const questionIds = [];
  questions.forEach(question => {
    /* if (questionIds.indexOf(parseInt(question.question_id)) === -1)  */ questionIds.push(parseInt(question.question_id));
  });
  // Get topics and options for the questions
  const topics = await get.topics(questionIds, JSON.parse(localStorage.getItem('token')));
  const options = await get.options(questionIds, JSON.parse(localStorage.getItem('token')));
  const optionIds = options.map(option => option.option_id);
  console.log('optionIds');
  console.log(optionIds);

  // check is user_option table already has values for this user and these options
  const userOptions = await get.userOption(optionIds, JSON.parse(localStorage.getItem('token')));
  console.log('userOptions');
  console.log(userOptions);
  // forEach option
  // 1) if user is not admin option correct-property is set to NULL
  // 2) if no data exists user_option table selected values are set as false
  // 3) else selected value is set to it's value in user_option table
  await options.forEach(option => {
    if (!adminStatus) option.correct = null;
    if (userOptions.length === 0) {
      insert.userSelected(option.option_id, JSON.parse(localStorage.getItem('token')));
    } else {
      userOptions.forEach(userOption => {
        if (userOption.option_id === option.option_id) option.selected = userOption.selected;
      });
    }
  });

  // question data for the current quiz is structured by going through question-topic-option
  questions.forEach(question => {
    topics.forEach(topic => {
      if (topic.topic_id === question.topic_id) {
        question.topic = topic.topic;
      }
    });
    question.options = []; // a options:[] property is added to all question-objects, to push in options
    options.forEach(option => {
      if (option.question_id === question.question_id) question.options.push(option);
    });
  });
  return questions;
}
