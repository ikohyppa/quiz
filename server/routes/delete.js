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
 ********* DELETE DATA *********
 ******************************/

// DELETE QUIZ
router.delete('/quiz', verifyToken, async (req, res) => {
  //console.log(`Delete quiz ${req.query.quiz_id}`);
  console.log('DELETE quiz req.query');
  console.log(req.query);
  const query = format('DELETE FROM quiz WHERE quiz_id = %L', req.query.quiz_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows);
});

// DELETE QUESTION
router.delete('/question', verifyToken, async (req, res) => {
  //console.log(`Delete question: ${req.query.question_id}`);
  console.log('DELETE question req.query');
  console.log(req.query);
  const query = format('DELETE FROM question WHERE question_id = %L', req.query.question_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows);
});

// DELETE OPTION OF THE QUESTION
router.delete('/options', verifyToken, async (req, res) => {
  //console.log(`Delete options of the question: ${req.query.question_id}`);
  console.log('DELETE options req.query');
  console.log(req.query);
  const query = format('DELETE FROM _option WHERE question_id = %L', req.query.question_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows);
});

// DELETE OPTION
router.delete('/option', verifyToken, async (req, res) => {
  //console.log(`Delete option: ${req.query.option_id}`);
  console.log('DELETE option req.query');
  console.log(req.query);
  const query = format('DELETE FROM _option WHERE option_id = %L', req.query.option_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows);
});

// DELETE TOPIC
router.delete('/topic', verifyToken, async (req, res) => {
  //console.log(`Delete topic ${req.query.topic_id}`);
  console.log('DELETE topic req.query');
  console.log(req.query);
  const query = format('DELETE FROM topic WHERE topic_id = %L', req.query.topic_id);
  console.log(query);
  const { rows } = await db.query(query);
  res.send(rows);
});
