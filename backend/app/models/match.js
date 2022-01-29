
const helper = require('../helper');
const config = require('../config/config');
const pool = require('../db');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.perPage);
  const rows = await pool.query(
     "SELECT * FROM match_summary OFFSET $1 LIMIT $2",
    [offset, 10]
  );
  
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  
  return {
    'data':data.rows,
    meta
  }
}

async function getSingle(id) {
  const batting1 = await pool.query(
    "SELECT * FROM batting_scorecard WHERE match_id=$1 AND innings_no=$2", 
    [id, 1]
  );
  const batting2 = await pool.query(
    "SELECT * FROM batting_scorecard WHERE match_id=$1 AND innings_no=$2", 
    [id, 2]
  );
  const bowling1 = await pool.query(
    "SELECT * FROM bowling_card WHERE match_id=$1 AND innings_no=$2", 
    [id, 1]
  );
  const bowling2 = await pool.query(
    "SELECT * FROM bowling_card WHERE match_id=$1 AND innings_no=$2", 
    [id, 2]
  );
  const total1 = await pool.query(
    "SELECT * FROM total WHERE id=$1 AND inning=$2", 
    [id, 1]
  );
  const total2 = await pool.query(
    "SELECT * FROM total WHERE id=$1 AND inning=$2", 
    [id, 2]
  );
  const playingeleven = await pool.query(
    "SELECT * FROM total WHERE match_id=$1", 
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    'batting1': batting1.rows,

  }
}

// async function getTotal(id,inning) {
//   const rows = await pool.query(
//     "SELECT * FROM total WHERE id=$1 AND inning=$2", 
//     [id, inning]
//   )
//   const data = helper.emptyOrRows(rows);

//   return {
//     'data': data.rows
//   }
// }

module.exports = {
  getMultiple,
  getSingle

}