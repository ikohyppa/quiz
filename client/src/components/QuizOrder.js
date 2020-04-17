// ../components/QuizOrder.js

import React, { useContext } from 'react';

import { OutlinedButton } from '../components/Buttons';
import { QuizDispatch } from '../App';

const QuizOrder = (props) => {
  const { state, setState } = props;
  const dispatch = useContext(QuizDispatch);

  const toggleOrder = () => {
    // quizzes is sorted, opposite the current order
    dispatch({
      type: 'toggleQuizOrder',
      order: !state.quizOrder,
    });
    // quizOrder state is toggled
    setState((prevState) => {
      return { ...prevState, quizOrder: !prevState.quizOrder };
    });
  };

  let buttonName = state.quizOrder
    ? 'Järjestä tentit Ö->A'
    : 'Järjestä tentit A->Ö';

  return <OutlinedButton name={buttonName} onClick={toggleOrder} />;
};

export default QuizOrder;
