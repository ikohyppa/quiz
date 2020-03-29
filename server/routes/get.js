const Router = require('express-promise-router');
const format = require('pg-format');

const db = require('../db');
const verifyToken = require('./verifyToken');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

/******************************
 ********** GET DATA **********
 ******************************/

// GET ALL QUIZ_IDs
router.get('/quizzes/', async (req, res) => {
  console.log('GET all quizzes req.query');
  //console.log(req.query);
  const query = format('SELECT quiz_id FROM quiz',);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET QUIZZES RELATED TO A USER
router.get('/quizzes/user', verifyToken, async (req, res, next) => {
  console.log('GET quizzes req.query');
  //console.log(req.query);
  const query = format(
    'SELECT quiz_id, quiz FROM quiz WHERE quiz_id IN (SELECT quiz_id FROM quiz_user WHERE user_id = %L) ORDER BY quiz_id',
    req.query.user_id
  );
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET A QUIZ
router.get('/quiz', verifyToken, async (req, res) => {
  console.log('GET quiz req.query');
  //console.log(req.query);
  const query = format('SELECT quiz_id FROM quiz WHERE quiz = %L', req.query.quiz);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows[0]);
});

// GET QUESTIONS RELATED TO A QUIZ
router.get('/questions', verifyToken, async (req, res) => {
  //console.log('GET questions req.query');
  //console.log(req.query);
  const query = format('SELECT quiz_id, question_id, question, topic_id FROM question WHERE quiz_id IN (%L) ORDER BY question_id', req.query.quiz_id);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET OPTIONS RELATED TO A SET QUESTIONS
router.get('/options', verifyToken, async (req, res) => {
  //console.log('GET options req.query');
  //console.log(req.query);
  const query = format(
    'SELECT question_id, option_id, answer, correct, selected FROM _option WHERE question_id IN (%L) ORDER BY option_id',
    req.query.questionids
  );
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET CORRECT ANSWERS RELATED TO A QUIZ
router.get('/correct', verifyToken, async (req, res) => {
  console.log('GET correct req.query');
  console.log(req.query);
  const query = format(
    'SELECT question_id, option_id, correct FROM _option WHERE question_id IN (SELECT question_id FROM question WHERE quiz_id = %L) ORDER BY option_id',
    req.query.quiz_id
  );
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET TOPICS RELATED TO A SET QUESTIONS
router.get('/topics', verifyToken, async (req, res) => {
  //console.log('GET topics req.query');
  //console.log(req.query);
  const query = format(
    'SELECT topic_id, topic FROM topic WHERE topic_id IN (SELECT topic_id FROM question WHERE question_id IN (%L)) ORDER BY topic',
    req.query.questionids
  );
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET A TOPIC
router.get('/topic', verifyToken, async (req, res) => {
  console.log('GET topic req.query');
  //console.log(req.query);
  const query = format('SELECT topic_id FROM topic WHERE topic = %L ORDER BY topic_id', req.query.topic);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows[0]);
});

// GET ALL TOPICS FOR ADMIN
router.get('/topics/all', verifyToken, async (req, res) => {
  console.log('GET all topics req.query');
  console.log(req.query);
  const query = format('SELECT topic_id, topic FROM topic ORDER BY topic');
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET SUBMITTED STATUS
router.get('/substatus', verifyToken, async (req, res) => {
  console.log('GET submittedStatus req.query');
  console.log(req.query);
  const query = format('SELECT submitted FROM quiz_user WHERE quiz_id = %L AND user_id = %L', req.query.quiz_id, req.decoded.user_id);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});

// GET USER_OPTION OPTION_ID
router.get('/useroption', verifyToken, async (req, res) => {
  console.log('GET useroption req.query');
  console.log(req.query);
  const query = format('SELECT option_id, selected FROM user_option WHERE user_id = %L AND option_id IN (%L)', req.decoded.user_id, req.query.optionIds);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  res.send(rows);
});
