//QuizApp.js

import React, { useState, useEffect, useReducer, createContext } from 'react';

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

  const [initialized, setInitialized] = useState(false); // has quizzes state been initialised or not
  const [showLogout, setShowLogout] = useState(false); // if true 'Logget out' view is shown
  const [showLogin, setShowLogin] = useState(false); // if true 'Login' view is shown
  const [showQuizzes, setShowQuizzes] = useState(false); // if true buttons of available quizzes are shown
  const [selectedQuiz, setSelectedQuiz] = useState(null); // is !null if a quiz is selected -> selected quiz is shown
  const [submitted, setSubmitted] = useState(false); // if true quiz is locked and correct answer options are shown
  const [showAdmin, setShowAdmin] = useState(false); // if true admin side is rendered
  const [quizOrder, setQuizOrder] = useState(true); // boolean based on which quizzes are ordered a->ö / ö->a
  const [statusLogin, setStatusLogin] = useState(false);
  const [statusAdmin, setStatusAdmin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');

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
          {!showLogout && (
            <div>
              {/* ******************* TOPBAR VIEW ********************** */}
              {/* ./components/TopBar.js, top level buttons */}
              <TopBar
                statusAdmin={statusAdmin}
                statusLogin={statusLogin}
                setLoginMethod={setLoginMethod}
                setSelectedQuiz={setSelectedQuiz}
                setShowAbout={setShowAbout}
                setShowAdmin={setShowAdmin}
                setShowLogin={setShowLogin}
                setShowLogout={setShowLogout}
                setShowQuizzes={setShowQuizzes}
                setSubmitted={setSubmitted}
              ></TopBar>
              <div>
                {/* ******************* LOGIN VIEW ********************** */}
                {/* ./components/Login.js, register/login form */}
                {showLogin && (
                  <Login
                    setShowLogin={setShowLogin}
                    setStatusLogin={setStatusLogin}
                    setStatusAdmin={setStatusAdmin}
                    setQuizOrder={setQuizOrder}
                    loginMethod={loginMethod}
                  ></Login>
                )}
                {/* ******************* USER VIEW ********************** */}
                {showQuizzes && (
                  <div className='flex-container'>
                    {/* if no quiz is selected quiz buttons and quizOrder button are rendered */}
                    {selectedQuiz === null && (
                      <div className='quiz'>
                        {quizzes.map((quiz, index) => (
                          <QuizSelect
                            key={quiz.quiz_id}
                            {...quiz}
                            index={index}
                            statusAdmin={statusAdmin}
                            setSelectedQuiz={setSelectedQuiz}
                            setSubmitted={setSubmitted}
                          />
                        ))}
                        <QuizOrder
                          quizOrder={quizOrder}
                          setQuizOrder={setQuizOrder}
                        />
                      </div>
                    )}
                    {/* if a quiz is selected, quiz is rendered */}
                    {selectedQuiz !== null && (
                      <div className='quiz'>
                        <Quiz
                          quiz={quizzes[selectedQuiz]}
                          quizIndex={selectedQuiz}
                          submitted={submitted}
                          setSubmitted={setSubmitted}
                        />
                      </div>
                    )}
                    {/* when quiz has been submitted the results graph is rendered */}
                    {submitted && (
                      <div>
                        <Graph quiz={quizzes[selectedQuiz]}></Graph>
                      </div>
                    )}
                  </div>
                )}
                {/*'******************* ADMIN VIEW ********************** */}
                {showAdmin && (
                  <div className='quiz'>
                    <div>
                      {/* if no quiz is selected modify quiz buttons box and modify topics box are rendered */}
                      {selectedQuiz == null && (
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
                                statusAdmin={statusAdmin}
                                setSelectedQuiz={setSelectedQuiz}
                                setSubmitted={setSubmitted}
                              />
                            ))}
                            <AdminAddNewQuiz quizOrder={quizOrder} />
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
                      {selectedQuiz !== null && (
                        <div className='quiz'>
                          <AdminUpdateQuizTitle
                            {...quizzes[selectedQuiz]}
                            quizIndex={selectedQuiz}
                          />
                          {quizzes[selectedQuiz].questions.map(
                            (question, questionIndex) => (
                              <AdminQuiz
                                key={question.question_id}
                                {...question}
                                quizIndex={selectedQuiz}
                                questionIndex={questionIndex}
                                topics={topics}
                              />
                            )
                          )}
                          <AdminAddNewQuestion
                            {...quizzes[selectedQuiz]}
                            selectedQuiz={selectedQuiz}
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
          {showAbout && <About setShowAbout={setShowAbout} />}
          {/* ******************* LOGGED OUT VIEW ********************** */}
          {showLogout && (
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
