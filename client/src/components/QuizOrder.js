// ../components/QuizOrder.js

import React from 'react';

import { OutlinedButton } from '../components/Buttons';

const QuizOrder = props => {
  const { dispatch, quizOrder, setQuizOrder } = props;

  const toggleOrder = () => {
    // quizzes is sorted, opposite the current order
    dispatch({
      type: 'toggleQuizOrder',
      order: !quizOrder
    });
    // quizOrder state is toggled
    setQuizOrder(!quizOrder);
  };

  let buttonName = quizOrder ? 'Järjestä tentit Ö->A' : 'Järjestä tentit A->Ö';

  return <OutlinedButton name={buttonName} onClick={toggleOrder} />;
};

export default QuizOrder;
