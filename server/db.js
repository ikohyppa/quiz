const { Pool } = require('pg');

if (process.env.SSL === 'false') {
  SSL = false;
} else {
  SSL = true;
}

const pool = new Pool({
  host: process.env.HOST || process.env.LOCAL_HOST,
  database: process.env.DB || process.env.LOCAL_DB,
  port: process.env.DBPORT || process.env.LOCAL_DBPORT,
  user: process.env.USER || process.env.LOCAL_USER,
  password: process.env.PW || process.env.LOCAL_PW,
  ssl: SSL
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
