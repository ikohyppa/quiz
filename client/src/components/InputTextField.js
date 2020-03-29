// ./components/TextInputs

import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../css/textInput.js';

const InputTextField = props => {
  const { id, label, defaultValue, size, style, onBlur } = props;
  const classes = useStyles();
  return (
    <TextField
      className={classes.root}
      id={id}
      label={label}
      defaultValue={defaultValue}
      size={size}
      style={style}
      onBlur={onBlur}
      variant='outlined'
    />
  );
};

export default InputTextField;
