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
 ********** INSERT DATA **********
 ******************************/

// INSERT QUIZ
router.post('/quiz', verifyToken, async (req, res) => {
  //console.log('req');
  //console.log(req);
  const query = format('INSERT INTO quiz (quiz) VALUES (%L) RETURNING quiz_id', req.body.params.quiz);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// INSERT QUESTION
router.post('/question', verifyToken, async (req, res) => {
  const query = format('INSERT INTO question (quiz_id) VALUES (%L) RETURNING question_id', req.body.params.quiz_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// INSERT OPTION
router.post('/option', verifyToken, async (req, res) => {
  const query = format('INSERT INTO _option (question_id) VALUES (%L) RETURNING option_id', req.body.params.question_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows[0]);
});

// INSERT TOPIC
router.post('/topic', verifyToken, async (req, res) => {
  const query = format('INSERT INTO topic (topic) VALUES (%L) RETURNING topic_id', req.body.params.topic);
  console.log(query);
  const { rows } = await db.query(query);
  console.log(`rows[0] ${rows[0]}`);
  res.send(rows[0]);
});

// INSERT QUIZ_USER REGISTER
router.post('/quizuser/reg', async (req, res) => {
  const query = format('INSERT INTO quiz_user (quiz_id, user_id) VALUES (%L, %L)', req.body.params.quiz_id, req.body.params.user_id);
  console.log(query);
  const { rows } = await db.query(query);
  console.log(`rows[0] ${rows[0]}`);
  res.send(rows[0]);
});

// INSERT QUIZ_USER
router.post('/quizuser', verifyToken, async (req, res) => {
  //console.log('req.decoded.user_id');
  //console.log(req.decoded.user_id);
  const query = format('INSERT INTO quiz_user (quiz_id, user_id) VALUES (%L, %L) RETURNING quiz_id', req.body.params.quiz_id, req.decoded.user_id);
  console.log(query);
  const { rows } = await db.query(query);
  console.log(`rows[0] ${rows[0]}`);
  res.send(rows[0]);
});

// UPDATE USER_OPTION SELECTED
router.post('/useroption/selected', verifyToken, async (req, res) => {
  const query = format(
    'INSERT INTO user_option (user_id, option_id, selected) VALUES (%L, %L, false)',
    req.decoded.user_id,
    req.body.params.option_id,
  );
  console.log(query);
  const { rows } = await db.query(query);
  console.log(`rows[0] ${rows[0]}`);
  res.send(rows[0]);
});
