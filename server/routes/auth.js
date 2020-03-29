const Router = require('express-promise-router');
const format = require('pg-format');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const db = require('../db');
const saltRounds = 10;

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

// REGISTER A NEW USER
router.post('/register', async (req, res) => {
  //first it is checked if username is already reserved
  const query = format('SELECT username FROM _user WHERE username = %L', req.body.params.username);
  console.log(query);
  const { rows } = await db.query(query);
  console.log('rows:');
  console.log(rows);
  // if username is already reserved in DB returned rows is NOT EMPTY
  if (rows.length !== 0)
    return res.status(403).send({ auth: false, message: 'Username already reserved in Database.', username: req.body.params.username });
  if (rows.length === 0) {
    // password is crypted
    console.log('in bcrypt');
    bcrypt.hash(req.body.params.password, saltRounds, async function(err, hash) {
      if (err) return res.status(403).send({ auth: false, message: 'Failed to bcrypt password.' });
      req.body.params.password = hash;
      console.log(`hash: ${hash}`);
      // user information (username, bcrypted password) is added into quiz_user table in DB
      const query = format(
        'INSERT INTO _user (username, password) VALUES (%L, %L) RETURNING username, user_id',
        req.body.params.username,
        req.body.params.password
      );

      console.log(query);
      const { rows } = await db.query(query);
      console.log('rows');
      console.log(rows);
      res.send({ auth: true, username: rows[0].username, user_id: rows[0].user_id });
    });
  }
});

// LOGIN A USER
router.post('/login', async (req, res, next) => {
  try {
    //first it is checked if user is found in the DB
    //res.send(`täällä`);
    const query = format('SELECT user_id, username, password, status FROM _user WHERE username = %L', req.body.params.username);
    console.log(query);
    //res.send(`query:  ${query}`);
    const { rows } = await db.query(query);
    //res.send(`rows:  ${rows}`);
    console.log('rows:');
    console.log(rows);
    // if username is not found in DB
    if (rows.length === 0) {
      return res.status(403).send({ auth: false, message: 'Failed to find user in Database.' });
    }
    //password is compared to the crypted one in the DB
    await bcrypt.compare(req.body.params.password, rows[0].password, function(err, result) {
      if (err) return res.status(403).send({ auth: false, message: 'Failed to authenticate password.' });
      // if passwords match userName and token are send back
      if (result === true) {
        var token = jwt.sign({ user_id: rows[0].user_id, username: rows[0].username, status: rows[0].status }, config.secret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token });
        // else error status 403 is send back
      } else {
        return res.status(403).send({ auth: false, message: 'Incorrect password.' });
      }
    });
  } catch (error) {
    res.send(`server error:  ${error.message}`);
  }
});
