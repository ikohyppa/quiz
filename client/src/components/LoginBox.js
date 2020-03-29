// ../components/LoginBox.js

import React, { useState } from 'react';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { QuizButton } from '../components/Buttons';
import '../css/app.css';

const LoginBox = props => {
  const { loginMethod, onClick } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='loginBox'>
      <form>
        <fieldset>
          <legend>
            <h3>
              <i>{loginMethod}</i>
            </h3>
          </legend>
          <div>
            <p>Käyttäjätunnus</p>
            <TextField id='username' type='text' maxsize='30' defaultValue='' />
            <p>Salasana</p>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              maxsize='30'
              defaultValue=''
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div>
            <QuizButton name={loginMethod} onClick={onClick} />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginBox;
