// ./Components/Admin.js

import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import '../css/app.css';

import * as get from '../requests/get';
import * as del from '../requests/delete';
import * as insert from '../requests/insert';
import * as update from '../requests/update';
import errorHandling from '../functions/errorHandling';

import InputTextField from '../components/InputTextField';
import { UserCheckBox } from '../components/CheckBoxes';
import { QuizDispatch } from '../App';
import { TopicDispatch } from '../App';

const AdminQuiz = (props) => {
  const {
    question,
    question_id,
    topic,
    options,
    quizIndex,
    questionIndex,
    topics,
  } = props;

  const dispatch = useContext(QuizDispatch);
  const dispatchTopic = useContext(TopicDispatch);

  const handleUpdateQuestion = async (updatedQuestion) => {
    try {
      await update.question(
        question_id,
        updatedQuestion,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'adminChangeQuestion',
        question: updatedQuestion,
        quizIndex: quizIndex,
        questionIndex: questionIndex,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      // firs all optios of the question all delete
      await del.options(question_id, JSON.parse(localStorage.getItem('token')));
      // then the question itself is deleted
      await del.question(
        question_id,
        JSON.parse(localStorage.getItem('token'))
      );
      // then the question (and options) are deleted from quizzes state
      dispatch({
        type: 'adminDeleteQuestion',
        quizIndex: quizIndex,
        questionIndex: questionIndex,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleUpdateTopic = async (updatedTopic) => {
    try {
      // first it is checked if topic is already listed in DB by the lenght of returned SELECT query
      let topic_id = await get.topic(
        updatedTopic,
        JSON.parse(localStorage.getItem('token'))
      );
      // the topic is new if (topic_id !== null)
      if (!topic_id) {
        // add new topic into topic table in DB and returning new topic_id
        topic_id = await insert.topic(
          updatedTopic,
          JSON.parse(localStorage.getItem('token'))
        );
        // add new topic into topics state
        dispatchTopic({
          type: 'adminAddTopic',
          topic_id: topic_id,
          topic: updatedTopic,
        });
      }
      // in any case (new or old topic) topic_id is updated into question table in DB
      await update.qnTopic(
        question_id,
        topic_id,
        JSON.parse(localStorage.getItem('token'))
      );
      // and topic is updated into quizzes-state
      dispatch({
        type: 'adminChangeTopic',
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        topic_id: topic_id,
        topic: updatedTopic,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const toggleCheckBox = async (option_id, optionIndex, correct) => {
    try {
      // update option.correct true/false into in DB
      await update.optCorrect(
        option_id,
        correct,
        JSON.parse(localStorage.getItem('token'))
      );
      // update option_correct true/false into in quizzes state
      dispatch({
        type: 'adminChangeCheck',
        value: correct,
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        optionIndex: optionIndex,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleUpdateOption = async (option_id, optionIndex, updatedOption) => {
    try {
      await update.option(
        option_id,
        updatedOption,
        JSON.parse(localStorage.getItem('token'))
      );
      // update option text into in quizzes state
      dispatch({
        type: 'adminChangeOption',
        value: updatedOption,
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        optionIndex: optionIndex,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleDeleteOption = async (option_id, optionIndex) => {
    try {
      // delete option from DB
      await del.option(option_id, JSON.parse(localStorage.getItem('token')));
      // delete option from quizzes state
      dispatch({
        type: 'adminDeleteOption',
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        optionIndex: optionIndex,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleAddOption = async () => {
    try {
      const option_id = await insert.option(
        question_id,
        JSON.parse(localStorage.getItem('token'))
      );
      dispatch({
        type: 'adminAddOption',
        quizIndex: quizIndex,
        questionIndex: questionIndex,
        question_id: question_id,
        option_id: option_id,
      });
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <div className='quiz'>
      <form>
        <fieldset>
          <legend>
            <h3>
              <i>Kysymys {questionIndex + 1}: </i>
            </h3>
          </legend>
          <div className='aling-buttons'>
            <InputTextField
              defaultValue={question}
              size='small'
              style={{ width: 500 }}
              onBlur={(event) => handleUpdateQuestion(event.target.value)}
            />
            <IconButton onClick={handleDeleteQuestion}>
              <DeleteIcon />
            </IconButton>
          </div>
          <div className='aling-buttons'>
            <h3>
              <i>Aihepiiri: </i>
            </h3>
            <input
              list='topics'
              type='text'
              defaultValue={topic}
              onBlur={(event) => handleUpdateTopic(event.target.value)}
            />
            <datalist id='topics'>
              {topics.map((topic, i) => (
                <option key={topic.topic + i} value={topic.topic} />
              ))}
            </datalist>
          </div>
          <div>
            <h3>
              <i>Vastausvaihtoehdot: </i>
            </h3>
            {/* Question options are mapped for checkboxes */}
            {options.map((option, optionIndex) => (
              <div className='aling-buttons' key={option.option_id}>
                <UserCheckBox
                  checked={option.correct}
                  onChange={(event) =>
                    toggleCheckBox(
                      option.option_id,
                      optionIndex,
                      event.target.checked
                    )
                  }
                />
                <InputTextField
                  defaultValue={option.answer}
                  size='small'
                  style={{ width: 400 }}
                  onBlur={(event) =>
                    handleUpdateOption(
                      option.option_id,
                      optionIndex,
                      event.target.value
                    )
                  }
                />
                <IconButton
                  onClick={() =>
                    handleDeleteOption(option.option_id, optionIndex)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <div>
              <h3>
                <i>Lisää vastausvaihtoehto</i>
                <IconButton onClick={handleAddOption}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </h3>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

//Rules for rerendering Kysymys
function adminPropsAreEqual(prevQuestion, nextQuestion) {
  //if aihepiiri is changed
  if (prevQuestion.topic !== nextQuestion.topic) {
    return false;
  }
  //if vastaus is deleted or new added
  if (prevQuestion.options.length !== nextQuestion.options.length) {
    return false;
  }
  //if checkbox is toggled, notice !
  if (
    !prevQuestion.options.every(
      (option, i) => option.correct === nextQuestion.options[i].correct
    )
  ) {
    return false;
  }
  //if vastaus-teksti is modified
  if (
    !prevQuestion.options.every(
      (option, i) => option.answer === nextQuestion.options[i].answer
    )
  ) {
    return false;
  }

  return true;
}

const MemoizedAdmin = React.memo(AdminQuiz, adminPropsAreEqual);
export default MemoizedAdmin;
