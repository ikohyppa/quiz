// ./Components/CheckBoxes.js

import React from 'react';
import CheckBox from '@material-ui/core/Checkbox';
import { useStyles } from '../css/checkboxes';

export const UserCheckBox = props => {
  const { submitted, checked, onChange } = props;
  return (
    <>
      <CheckBox
        color='primary'
        disabled={submitted}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export const CorrectCheckBox = props => {
  const { correct, checked } = props;
  const classes = useStyles(props);
  return (
    <>
      <CheckBox
        className={classes.checked}
        disabled={true}
        correct={correct}
        checked={checked}
      />
    </>
  );
};

