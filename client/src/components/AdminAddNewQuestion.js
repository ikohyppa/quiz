import React, { useContext } from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

import * as insert from '../requests/insert';
import errorHandling from '../functions/errorHandling';
import { QuizDispatch } from '../App';

const AdminAddNewQuestion = (props) => {
  const { quiz_id, selectedQuiz } = props;
  const dispatch = useContext(QuizDispatch);

  const handleAddNewQuestion = async () => {
    try {
      // empty question is added into DB and into topics state
      // empty question gets current quiz quiz_id and generated question_id
      const question_id = await insert.question(
        quiz_id,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'adminAddQuestion',
        quizIndex: selectedQuiz,
        quiz_id: quiz_id,
        question_id: question_id,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <h3>
      <i>Lisää kysymys</i>
      {/* Add a new question button is shown below existing questions */}
      <IconButton onClick={handleAddNewQuestion}>
        <AddCircleOutlineIcon />
      </IconButton>
    </h3>
  );
};

export default AdminAddNewQuestion;
