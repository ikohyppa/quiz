// ../components/Quiz.js

import React, {useContext} from 'react';

import errorHandling from '../functions/errorHandling';
import getQuestions from '../functions/getQuestions';
import { QuizButton } from '../components/Buttons';
import {QuizDispatch} from '../App';

const QuizSelect = props => {
  const {
    quiz,
    quiz_id,
    questions,
    index,
    statusAdmin,
    setSelectedQuiz,
    setSubmitted
  } = props;

  const dispatch = useContext(QuizDispatch);

  const handleGetQuestions = async (quiz_id, questions_length, statusAdmin) => {
    try {
      const [submitted, questions, correct] = await getQuestions(
        quiz_id,
        questions_length,
        statusAdmin
      );
      if (questions_length === 0) {
        dispatch({
          type: 'addDbQuestions',
          questions: questions,
          index: index
        });
        if (submitted) {
          dispatch({
            type: 'addCorrect',
            quizIndex: index,
            correct: correct
          });
        }
      }
      // when quizzes data is ready setSelectedQuiz is used to show the quiz
      setSelectedQuiz(index);
      // showCorrct state is set according to the submitted state
      setSubmitted(submitted);
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <QuizButton
      name={quiz}
      onClick={() => handleGetQuestions(quiz_id, questions.length, statusAdmin)}
    />
  );
};

export default QuizSelect;
