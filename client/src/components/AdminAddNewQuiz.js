import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import * as get from '../requests/get';
import * as insert from '../requests/insert';
import errorHandling from '../functions/errorHandling';

import InputTextField from '../components/InputTextField';

const AdminAddNewQuiz = props => {
  const { dispatch, quizOrder } = props;

  const handleClick = async () => {
    try {
      const quiz = document.getElementById('newQuizTitle').value;
      let quiz_id;
      // first it is checked if quiz is already listed in DB by the lenght of returned SELECT query
      quiz_id = await get.quiz(quiz, JSON.parse(localStorage.getItem('token')));
      // if the quiz is new (quiz_id = null)
      if (!quiz_id) {
        // new quiz is added into DB
        const quiz_id = await insert.quiz(
          quiz,
          JSON.parse(localStorage.getItem('token'))
        );
        // new quiz is added into quizzes state
        dispatch({
          type: 'adminAddQuiz',
          quiz: quiz,
          quiz_id: quiz_id
        });
        // after adding a new quiz, quizzes are sorted according current order
        // quizOrder is not toggled after sorting
        dispatch({
          type: 'toggleQuizOrder',
          order: quizOrder // use current quiz order
        });
        //
        // newQuizTitle text field is cleared
        document.getElementById('newQuizTitle').value = null;
        // current admin user is given rights to a new quiz
        // ?? admin pitäisi myös pystyä antamaan valmiin tentin oikeidet muille käyttäjille ??
        await insert.quizuser(
          quiz_id,
          JSON.parse(localStorage.getItem('token'))
        );
      } else {
        window.alert('Tämän niminen tentti on jo järjestelmässä.');
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div className='aling-buttons'>
      <InputTextField id='newQuizTitle' label='Lisää uusi tentti' />
      <IconButton onClick={handleClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

export default AdminAddNewQuiz;
