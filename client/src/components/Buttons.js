// ./Components/Buttons.js

import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from '../css/buttons';

export const OutlinedButton = props => {
  const classes = useStyles();
  const { onClick, name } = props;
  return (
    <>
      <Button
        className={classes.outlinedButton}
        variant='outlined'
        onClick={onClick}
      >
        {name}
      </Button>
    </>
  );
};

export const QuizButton = props => {
  const classes = useStyles();
  const { name, onClick } = props;
  return (
    <>
      <Button className={classes.quizButton} onClick={onClick}>
        {name}
      </Button>
    </>
  );
};

export const TopBarBtn = props => {
  const classes = useStyles();
  const { name, onClick } = props;
  return (
    <Button className={classes.topBarButton} onClick={onClick}>
      {name}
    </Button>
  );
};
