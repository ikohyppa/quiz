// ./components/AdminTopics.js

import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import * as del from '../requests/delete';
import * as update from '../requests/update';
import errorHandling from '../functions/errorHandling';

import InputTextField from '../components/InputTextField';

const AdminTopics = props => {
  const { topic, topic_id, index, dispatch, dispatchTopic } = props;

  const handleAddTopic = async newTopic => {
    try {
      await update.topic(
        topic_id,
        newTopic,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'adminChangeTopic2',
        topic_id: topic_id,
        topic: newTopic
      });
      dispatchTopic({
        type: 'adminChangeTopic',
        topic_id: topic_id,
        topic: newTopic
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleDeleteTopic = async () => {
    try {
      // topic_id in question table must be updated to NULL, before topic is deleted from topic table
      await update.qnTopicClear(
        topic_id,
        JSON.parse(localStorage.getItem('token'))
      );
      await del.topic(topic_id, JSON.parse(localStorage.getItem('token')));
      // topic is deleted from topics state
      dispatchTopic({
        type: 'adminDeleteTopic',
        topicIndex: index
      });
      // topic is deleted from every question in ever quiz in quizzes state
      dispatch({
        type: 'adminDeleteTopic',
        deletedTopic: topic
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div className='aling-buttons'>
      <InputTextField
        id='newTopicCaption'
        defaultValue={topic}
        size='small'
        onBlur={event => {
          handleAddTopic(event.target.value);
        }}
      />
      {/* Delete a topic button */}
      <IconButton onClick={handleDeleteTopic}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default AdminTopics;
