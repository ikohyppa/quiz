import React from 'react';

import * as update from '../requests/update';
import errorHandling from '../functions/errorHandling';

import InputTextField from '../components/InputTextField';

const AdminUpdateQuizTitle = props => {
  const { quiz, quiz_id, quizIndex, dispatch } = props;

  const handleUpdateQuizTitle = async updatedTitle => {
    try {
      await update.quiz(
        quiz_id,
        updatedTitle,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'adminChangeQuiz',
        quiz: updatedTitle,
        quizIndex: quizIndex
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <InputTextField
      defaultValue={quiz}
      size='medium'
      onBlur={event => handleUpdateQuizTitle(event.target.value)}
    />
  );
};

export default AdminUpdateQuizTitle;
