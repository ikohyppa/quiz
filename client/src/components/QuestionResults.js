// ./Components/QuestionResults.js

import React from 'react';

import '../css/app.css';
import correctEmoji from '../data/correctEmoji.png';

const QuestionResults = props => {
  const { submitted, question } = props;
  return (
    <div>
      {/* If quiz has been submitted "Oikein x/x" and corresponding emoji is shown below question (emoji TODO). */}
      <h2 className='questionResults'>
        {submitted &&
          'Oikein: ' +
            question.options.reduce((total, option) => {
              if (option.selected === option.correct) return total + 1;
              return total;
            }, 0) +
            '/' +
            question.options.reduce(total => {
              return total + 1;
            }, 0)}
        {submitted &&
        question.options.every(option => option.selected === option.correct) ? (
          <img
            src={correctEmoji}
            alt='Oikein!!!'
            width='30px'
            height='30px'
            align='top'
          />
        ) : null}
      </h2>
    </div>
  );
};

export default QuestionResults;
