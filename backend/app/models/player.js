const pool = require('../db');

async function getOne(id) {

  const info = await pool.query(
    "SELECT * FROM player WHERE player_id = $1",
    [id]
  );

  const battingstats = await pool.query(
    "SELECT * FROM batting_stats WHERE striker=$1",
    [id]
  );

  const battingscores = await pool.query(
    "SELECT match_id, runs FROM batting_scorecard WHERE striker=$1 ORDER BY match_id",
    [id]
  )

  const bowlingstats = await pool.query(
    "SELECT * FROM bowling_stats WHERE bowler=$1",
    [id]
  );

  const bowlingscore = await pool.query(
    "SELECT match_id, runs, wickets FROM bowling_card WHERE bowler=$1 ORDER BY match_id",
    [id]
  );


  return {
    'info': info.rows[0],
    'battingstats': battingstats.rows[0],
    'battingchart': battingscores.rows,
    'bowlingstats': bowlingstats.rows[0],
    'bowlingchart': bowlingscore.rows,
  }
}

async function getYear() {
  const data = await pool.query(
    "SELECT distinct season_year FROM match",
  );

  return {
    'years': data.rows,
  }
}

async function getTable(year) {

  const data = await pool.query(
    "SELECT * FROM points_table WHERE season_year=$1",
    [year]
  );

  return {
    'data': data.rows,
  }
}




module.exports = {
  getOne,
  getTable,
  getYear,
}