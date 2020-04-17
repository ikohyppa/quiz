import React, { useState, useContext } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import * as del from '../requests/delete';
import * as update from '../requests/update';
import errorHandling from '../functions/errorHandling';
import getQuestions from '../functions/getQuestions';
import { QuizButton } from '../components/Buttons';
import { QuizDispatch } from '../App';

const AdminQuizzes = (props) => {
  const { quiz, quiz_id, questions, index, state, setState } = props;

  const [modifyTitle, setModifyTitle] = useState(false);
  const dispatch = useContext(QuizDispatch);

  const toggleEditQuizName = async (newQuizName, quiz_id, index) => {
    try {
      await update.quiz(
        quiz_id,
        newQuizName,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'adminChangeQuiz',
        quiz: newQuizName,
        quizIndex: index,
      });
      setModifyTitle(false);
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleGetQuestions = async (quiz_id, questions_length, isAdmin) => {
    try {
      const [submitted, questions, correct] = await getQuestions(
        quiz_id,
        questions_length,
        isAdmin
      );
      if (questions_length === 0) {
        dispatch({
          type: 'addDbQuestions',
          questions: questions,
          index: index,
        });
        if (submitted) {
          dispatch({
            type: 'addCorrect',
            quizIndex: index,
            correct: correct,
          });
        }
      }
      // when quizzes data is ready setSelectedQuiz is used to show the quiz
      setState((prevState) => {
        return { ...prevState, selectedQuiz: index };
      });
      // showCorrct state is set according to the submitted state
      setState((prevState) => {
        return { ...prevState, submitted: submitted };
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const deleteQuiz = async () => {
    try {
      //?? pitäisikö tässä tarkistaa että tentti löytyi DBsta ennenkuin se tuhotaan quizzes??
      await del.quiz(quiz_id, JSON.parse(localStorage.getItem('token')));
      dispatch({
        type: 'adminDeleteQuiz',
        quizIndex: index,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div>
      {/* QuizButton is toggled between Modify Quiz Title and get Quiz questions */}
      {modifyTitle ? (
        <QuizButton
          name={
            <input
              defaultValue={quiz}
              onBlur={(event) => {
                toggleEditQuizName(event.target.value, quiz_id, index);
              }}
            />
          }
        />
      ) : (
        <QuizButton
          name={quiz}
          onClick={() =>
            handleGetQuestions(quiz_id, questions.length, state.isAdmin)
          }
        />
      )}
      {/* Modify quiz title button */}
      <IconButton onClick={() => setModifyTitle(!modifyTitle)}>
        <EditIcon />
      </IconButton>
      {/* Delete quiz button */}
      <IconButton onClick={deleteQuiz}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default AdminQuizzes;
