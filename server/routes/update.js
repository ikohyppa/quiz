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
 ********* UPDATE DATA ********
 ******************************/

// UPDATE QUIZ
router.put('/quiz', verifyToken, async (req, res) => {
  const query = format('UPDATE quiz SET quiz = %L WHERE quiz_id = %L', req.body.params.quiz, req.body.params.quiz_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE QUESTION
router.put('/question', verifyToken, async (req, res) => {
  const query = format('UPDATE question SET question = %L WHERE question_id = %L', req.body.params.question, req.body.params.question_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE QUESTION TOPIC_ID
router.put('/question/topic/', verifyToken, async (req, res) => {
  const query = format('UPDATE question SET topic_id = %L WHERE question_id = %L', req.body.params.topic_id, req.body.params.question_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// CLEAR QUESTION TOPIC_ID
router.put('/question/topic/clear', verifyToken, async (req, res) => {
  const query = format('UPDATE question SET topic_id = null WHERE topic_id = %L', req.body.params.topic_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE OPTION TEXT
router.put('/option', verifyToken, async (req, res) => {
  const query = format('UPDATE _option SET answer = %L WHERE option_id = %L', req.body.params.answer, req.body.params.option_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE OPTION SELECTED
router.put('/option/selected', verifyToken, async (req, res) => {
  const query = format('UPDATE _option SET selected = %L WHERE option_id = %L', req.body.params.selected, req.body.params.option_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE OPTION SELECTED
router.put('/option/correct', verifyToken, async (req, res) => {
  const query = format('UPDATE _option SET correct = %L WHERE option_id = %L', req.body.params.correct, req.body.params.option_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE TOPIC
router.put('/topic', verifyToken, async (req, res) => {
  const query = format('UPDATE topic SET topic = %L WHERE topic_id = %L', req.body.params.topic, req.body.params.topic_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE QUIZ_USER SUBMITTED
router.put('/quizuser/submitted', verifyToken, async (req, res) => {
  const query = format('UPDATE quiz_user SET submitted = true WHERE quiz_id = %L AND user_id = %L', req.body.params.quiz_id, req.decoded.user_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// UPDATE USER_OPTION SELECTED
router.put('/useroption/selected', verifyToken, async (req, res) => {
  const query = format(
    'UPDATE user_option SET selected = %L WHERE option_id = %L AND user_id = %L',
    req.body.params.selected,
    req.body.params.option_id,
    req.decoded.user_id
  );
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});
