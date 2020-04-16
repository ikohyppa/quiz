import React, { useContext } from 'react';

import * as get from '../requests/get';
import * as update from '../requests/update';

import { OutlinedButton } from '../components/Buttons';
import Question from '../components/Question';
import { QuizDispatch } from '../App';

const Quiz = (props) => {
  const { quiz, quizIndex, submitted, setSubmitted } = props;
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
    setSubmitted(!submitted);
  };

  return (
    <div>
      <h1>{quiz.quiz}</h1>
      {!submitted && (
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
            submitted={submitted}
          />
        ))}
      {!submitted && (
        <OutlinedButton name={'Lähetä vastaukset'} onClick={handleSubmit} />
      )}
    </div>
  );
};

export default Quiz;
