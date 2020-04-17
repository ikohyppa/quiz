import React, { useContext } from 'react';

import * as get from '../requests/get';
import * as update from '../requests/update';

import { OutlinedButton } from '../components/Buttons';
import Question from '../components/Question';
import { QuizDispatch } from '../App';

const Quiz = (props) => {
  const { quiz, quizIndex, state, setState } = props;
  const dispatch = useContext(QuizDispatch);

  const handleSubmit = async () => {
    await update.submitted(
      quiz.quiz_id,
      JSON.parse(localStorage.getItem('token'))
    );
    const correct = await get.correct(
      quiz.quiz_id,
      JSON.parse(localStorage.getItem('token'))
    );
    dispatch({
      type: 'addCorrect',
      quizIndex: quizIndex,
      correct: correct,
    });
    setState(prevState => {
      return {...prevState, submitted: true}
    })
  };

  return (
    <div>
      <h1>{quiz.quiz}</h1>
      {!state.submitted && (
        <OutlinedButton name={'Lähetä vastaukset'} onClick={handleSubmit} />
      )}

      {true &&
        quiz.questions.map((question, questionIndex) => (
          <Question
            key={question.question_id}
            {...question}
            question={question}
            quizIndex={quizIndex}
            questionIndex={questionIndex}
            submitted={state.submitted}
          />
        ))}
      {!state.submitted && (
        <OutlinedButton name={'Lähetä vastaukset'} onClick={handleSubmit} />
      )}
    </div>
  );
};

export default Quiz;
