import React from 'react';

import { Paper } from '@material-ui/core';
import { QuizButton } from '../components/Buttons';

import '../css/app.css';

const About = (props) => {
  const { setState } = props;
  return (
    <div margin={50}>
      <Paper className='info' elevation={3} variant='outlined'>
        <h3>
          Tervetuloa tenttimään. Valitse ensin "Kirjaudu" ja rekisteröidy ja/tai
          kirjaudu sisään.
        </h3>
        <h3>
          Kirjautumisen jälkeen valitsemalla "Tentit" saadaan lista tarjolla
          olevista tenteistä. Valitsemalla tentti pääsee tenttimään.
          <br />
          Tentit ovat monivalinta kysymyksiä, joissa oikeita vastauksia voi olla
          nolla - kaikki vastaukset.
          <br />
          Tentin voi jättää kesken ja palata uudelleen tenttimään, kirjautumalla
          sisään samalla käyttäjätunnuksella.
        </h3>
        <h3>
          Valitsemalla "Lähetä vastaukset" tulevan näkyviin oikeat vastaukset ja
          omat tulokset. Tämän jälkeen kyseisen tentin vastauksia ei voi enää
          muuttaa.
        </h3>
      </Paper>
      <QuizButton
        name='Sulje'
        onClick={() => {
          setState((prevState) => {
            return { ...prevState, showAbout: false };
          });
        }}
      />
    </div>
  );
};

export default About;
