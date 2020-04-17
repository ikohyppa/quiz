//QuizApp.js

import React, { useState, useEffect, useReducer } from 'react';

import './css/app.css';
import TopBar from './components/TopBar';
import Graph from './components/Graph';
import AdminQuizzes from './components/AdminQuizzes';
import AdminQuiz from './components/AdminQuiz';
import AdminAddNewQuiz from './components/AdminAddNewQuiz';
import AdminTopics from './components/AdminTopics';
import AdminAddNewTopic from './components/AdminAddNewTopic';
import AdminUpdateQuizTitle from './components/AdminUpdateQuizTitle';
import AdminAddNewQuestion from './components/AdminAddNewQuestion';
import Login from './components/Login';
import QuizSelect from './components/QuizSelect';
import QuizOrder from './components/QuizOrder';
import Quiz from './components/Quiz';
import About from './components/About';

import reducer from './QuizReducer';
import reducerTopic from './TopicReducer';

export const QuizDispatch = React.createContext(null);
export const TopicDispatch = React.createContext(null);

const QuizApp = () => {
  const [quizzes, dispatch] = useReducer(reducer, []);
  const [topics, dispatchTopic] = useReducer(reducerTopic, []);

  const initialState = {
    isAdmin: false, // admin status of the user, true = is admin
    isLoggedIn: false,
    loginMethod: '',
    quizOrder: true, // order of quiz titles, true = a->ö
    selectedQuiz: null, // is !null if a quiz is selected -> selected quiz is shown
    showAbout: false, // if true info page is shown
    showAdmin: false, // if true admin side is rendered
    showLogin: false, // if true 'Login' view is shown
    showLogout: false, // if true 'Logget out' view is shown
    showQuizzes: false, // if true buttons of available quizzes are shown
    submitted: false, // if true quiz is locked and correct answer options are shown
  };

  const [initialized, setInitialized] = useState(false); // has quizzes state been initialised or not
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // on first run !initialized is true
    // so quizData is get from localStorage or initialized with empty data
    if (!initialized) {
      // (if) if there is no data in loacalStorage,
      // both quizzes and topics states and localStorage are initialized with empty data
      // (else) else quizzes and topics states are initialized by localStorage
      // it assumed that if quizData is in localStorage, so is topicData
      if (!localStorage.getItem('quizData')) {
        localStorage.setItem('quizData', JSON.stringify([]));
        dispatch({ type: 'initialize', data: [] });
        localStorage.setItem('topicData', JSON.stringify([]));
        dispatchTopic({ type: 'initialize', data: [] });
      } else {
        const quizData = JSON.parse(localStorage.getItem('quizData'));
        dispatch({ type: 'initialize', data: quizData });
        const topicData = JSON.parse(localStorage.getItem('topicData'));
        dispatchTopic({ type: 'initialize', data: topicData });
      }
      setInitialized(true);
    }
    // after first run !initialized is false and localStorage is updated by data in states
    else {
      localStorage.setItem('quizData', JSON.stringify(quizzes));
      localStorage.setItem('topicData', JSON.stringify(topics));
    }
  }, [quizzes, topics]);

  return (
    <QuizDispatch.Provider value={dispatch}>
      <TopicDispatch.Provider value={dispatchTopic}>
        <div>
          {/* rendered if not logged out */}
          {!state.showLogout && (
            <div>
              {/* ******************* TOPBAR VIEW ********************** */}
              {/* ./components/TopBar.js, top level buttons */}
              <TopBar state={state} setState={setState}></TopBar>
              <div>
                {/* ******************* LOGIN VIEW ********************** */}
                {/* ./components/Login.js, register/login form */}
                {state.showLogin && (
                  <Login state={state} setState={setState}></Login>
                )}
                {/* ******************* USER VIEW ********************** */}
                {state.showQuizzes && (
                  <div className='flex-container'>
                    {/* if no quiz is selected quiz buttons and quizOrder button are rendered */}
                    {state.selectedQuiz === null && (
                      <div className='quiz'>
                        {quizzes.map((quiz, index) => (
                          <QuizSelect
                            key={quiz.quiz_id}
                            {...quiz}
                            index={index}
                            state={state}
                            setState={setState}
                          />
                        ))}
                        <QuizOrder state={state} setState={setState} />
                      </div>
                    )}
                    {/* if a quiz is selected, quiz is rendered */}
                    {state.selectedQuiz !== null && (
                      <div className='quiz'>
                        <Quiz
                          quiz={quizzes[state.selectedQuiz]}
                          quizIndex={state.selectedQuiz}
                          state={state}
                          setState={setState}
                        />
                      </div>
                    )}
                    {/* when quiz has been submitted the results graph is rendered */}
                    {state.submitted && (
                      <div>
                        <Graph quiz={quizzes[state.selectedQuiz]}></Graph>
                      </div>
                    )}
                  </div>
                )}
                {/*'******************* ADMIN VIEW ********************** */}
                {state.showAdmin && (
                  <div className='quiz'>
                    <div>
                      {/* if no quiz is selected modify quiz buttons box and modify topics box are rendered */}
                      {state.selectedQuiz == null && (
                        <form className='adminContainer'>
                          <fieldset className='adminSet'>
                            <legend>
                              <h3>Muokkaa tenttejä!</h3>
                            </legend>
                            {quizzes.map((quiz, index) => (
                              <AdminQuizzes
                                key={quiz.quiz_id}
                                {...quiz}
                                index={index}
                                state={state}
                                setState={setState}
                              />
                            ))}
                            <AdminAddNewQuiz state={state} />
                          </fieldset>
                          <fieldset className='adminSet'>
                            <legend>
                              <h3>Muokkaa aihepiireja!</h3>
                            </legend>
                            {topics.map((topic, index) => (
                              <AdminTopics
                                key={topic.topic_id}
                                {...topic}
                                index={index}
                              />
                            ))}
                            <AdminAddNewTopic />
                          </fieldset>
                        </form>
                      )}
                    </div>
                    <div>
                      {/* if a quiz is selected, admin view of quiz questions is rendered */}
                      {state.selectedQuiz !== null && (
                        <div className='quiz'>
                          <AdminUpdateQuizTitle
                            {...quizzes[state.selectedQuiz]}
                            quizIndex={state.selectedQuiz}
                          />
                          {quizzes[state.selectedQuiz].questions.map(
                            (question, questionIndex) => (
                              <AdminQuiz
                                key={question.question_id}
                                {...question}
                                quizIndex={state.selectedQuiz}
                                questionIndex={questionIndex}
                                topics={topics}
                              />
                            )
                          )}
                          <AdminAddNewQuestion
                            {...quizzes[state.selectedQuiz]}
                            selectedQuiz={state.selectedQuiz}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* ******************* ABOUT VIEW ********************** */}
          {state.showAbout && <About setState={setState} />}
          {/* ******************* LOGGED OUT VIEW ********************** */}
          {state.showLogout && (
            <div>
              <h1 className='quiz'>Hyvä yritys. Parempi tuuri ensikerralla.</h1>
            </div>
          )}
        </div>
      </TopicDispatch.Provider>
    </QuizDispatch.Provider>
  );
};

export default QuizApp;
