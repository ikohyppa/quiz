// ./Components/Question.js

import React from 'react';

import '../css/app.css';
import * as update from '../requests/update';
import errorHandling from '../functions/errorHandling';
import { UserCheckBox, CorrectCheckBox } from '../components/CheckBoxes';
import QuestionResults from '../components/QuestionResults';

const Question = props => {
  const { question, quizIndex, questionIndex, submitted, dispatch } = props;

  const handleClick = async (selected, option_id, optionIndex) => {
    try {
      // update option_selected true/false into user_option in DB
      await update.userSelected(
        option_id,
        selected,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'userChangeCheck',
        value: selected,
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        optionIndex: optionIndex
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div>
      <h3 variant='h6'>
        {questionIndex + 1}. {question.question}
      </h3>

      <div className='questionContainer'>
        <div>
          {/* Question's options are mapped to create checkbox-option lines */}
          {question.options.map((option, optionIndex) => (
            <div key={option.option_id}>
              {console.log(`option_id ${option.option_id}`)}
              <UserCheckBox
                submitted={submitted}
                checked={option.selected}
                onChange={event =>
                  handleClick(
                    event.target.checked,
                    option.option_id,
                    optionIndex
                  )
                }
              ></UserCheckBox>
              {/* Correct options are rendered only if quiz has been submitted */}
              {submitted && (
                <CorrectCheckBox
                  correct={option.selected === option.correct}
                  checked={option.correct}
                />
              )}
              {option.answer}
              {/* options as text is always last element on mapped line */}
            </div>
          ))}
        </div>
        <QuestionResults submitted={submitted} question={question} />
      </div>
    </div>
  );
};

function questionPropsAreEqual(prevQuestion, nextQuestion) {
  // If checkbox of a question is toggled, the question is re-rendered
  if (
    !prevQuestion.options.every(
      (option, i) => option.selected === nextQuestion.options[i].selected
    )
  ) {
    return false;
  }
  // All questions are re-rendered if 'Näytä oikeat vastaukset' is toggled
  if (prevQuestion.submitted !== nextQuestion.submitted) {
    return false;
  }
  // if a question properties have not changed, returned value is 'true' and the question is NOT re-rendered
  return true;
}

//Question is only executed/re-rendered if React.memo equality chech function questionPropsAreEqual returns 'false'
const MemoizedQuestion = React.memo(Question, questionPropsAreEqual);

export default MemoizedQuestion;
