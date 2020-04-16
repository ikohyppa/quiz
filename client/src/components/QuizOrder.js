// ../components/QuizOrder.js

import React, { useContext } from 'react';

import { OutlinedButton } from '../components/Buttons';
import {QuizDispatch} from '../App';


const QuizOrder = props => {
  const { quizOrder, setQuizOrder } = props;
  const dispatch = useContext(QuizDispatch);
  

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
