import React, { useContext } from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import * as get from '../requests/get';
import * as insert from '../requests/insert';
import errorHandling from '../functions/errorHandling';
import '../css/app.css';

import InputTextField from '../components/InputTextField';
import { TopicDispatch } from '../App';

const AdminAddNewTopic = () => {
  const dispatchTopic = useContext(TopicDispatch);

  const handleAddNewTopic = async () => {
    try {
      const topic = document.getElementById('newTopic').value;
      // first it is checked if topic is already listed in DB by the lenght of returned SELECT query
      let topic_id = await get.quiz(
        topic,
        JSON.parse(localStorage.getItem('token'))
      );
      // if the topic is new (topic_id = null)
      if (!topic_id) {
        // topic is added into DB and into topics state
        const topic_id = await insert.topic(
          topic,
          JSON.parse(localStorage.getItem('token'))
        );
        dispatchTopic({
          type: 'adminAddTopic',
          topic_id: topic_id,
          topic: topic,
        });
      }
      document.getElementById('newTopic').value = '';
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div className='aling-buttons'>
      <InputTextField id='newTopic' label='Lisää uusi aihepiiri' size='small' />
      <IconButton onClick={handleAddNewTopic}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

export default AdminAddNewTopic;
