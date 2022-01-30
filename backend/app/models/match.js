
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
    "SELECT * FROM playing_eleven WHERE match_id=$1", 
    [id]
  );
  const match_info = await pool.query(
    "SELECT * FROM match_info WHERE id=$1", 
    [id]
  );
  const umpires = await pool.query(
    "SELECT umpire_name FROM umpire_match natural join umpire where match_id=$1",
    [id]
  );

  // const data = helper.emptyOrRows(rows);

  return {
    'batting1': batting1.rows,
    'batting2': batting2.rows,
    'total1': total1.rows[0],
    'total2': total2.rows[0],
    'bowling1': bowling1.rows,
    'bowling2': bowling2.rows,
    'info': match_info.rows[0],
    'umpires': umpires.rows,
    'playingXI': playingeleven.rows
  }
}

async function getComparison(id) {

  const inning1 = await pool.query(
    "SELECT ball_no, runs, wickets FROM worm WHERE match_id=$1 AND innings_no=$2 ORDER BY ball_no", 
    [id, 1]
  );
  const inning2 = await pool.query(
    "SELECT ball_no, runs, wickets FROM worm WHERE match_id=$1 AND innings_no=$2 ORDER BY ball_no", 
    [id, 2]
  );
  const summary = await pool.query(
    "SELECT * FROM worm_summary WHERE match_id=$1",
    [id]
  );
  // const data = helper.emptyOrRows(rows);

  return {
    'inning1': inning1.rows,
    'inning2': inning2.rows,
    'summary': summary.rows[0]
  }
}

async function getSummary(id) {

  const total1 = await pool.query(
    "SELECT total, wickets, over FROM total WHERE id=$1 AND inning=$2", 
    [id, 1]
  );
  const total2 = await pool.query(
    "SELECT total, wickets, over  FROM total WHERE id=$1 AND inning=$2", 
    [id, 2]
  );
  const summary = await pool.query(
    "SELECT * FROM worm_summary WHERE match_id=$1",
    [id]
  );
  const batting1 = await pool.query(
    "SELECT striker, runs, balls, player_name FROM match_summary1 where match_id=$1 AND innings_no=$2",
    [id,1]
  )
  const batting2 = await pool.query(
    "SELECT striker, runs, balls, player_name FROM match_summary1 where match_id=$1 AND innings_no=$2",
    [id,2]
  )
  const bowling1 = await pool.query(
    "SELECT bowler, runs, wickets, 1.0*balls/6.0 as over, player_name FROM match_summary2 where match_id=$1 AND innings_no=$2",
    [id,1]
  )
  const bowling2 = await pool.query(
    "SELECT bowler, runs, wickets, 1.0*balls/6.0 as over, player_name FROM match_summary2 where match_id=$1 AND innings_no=$2",
    [id,2]
  )
  const season_year = await pool.query(
    "SELECT season_year FROM match where match_id=$1",
    [id]
  ) 
  // const data = helper.emptyOrRows(rows);
  const per_runs1 = await pool.query(
    "SELECT * FROM percentage_runs where match_id=$1 and innings_no=$2",
    [id, 1]
  )
  const per_runs2 = await pool.query(
    "SELECT * FROM percentage_runs where match_id=$1 and innings_no=$2",
    [id, 2]
  ) 
  return {
    'total1': total1.rows[0],
    'total2': total2.rows[0],
    'summary': summary.rows[0],
    'batting1': batting1.rows,
    'batting2': batting2.rows,
    'bowling1': bowling1.rows,
    'bowling2': bowling2.rows,
    'runsChart1': per_runs1.rows[0],
    'runsChart2': per_runs2.rows[0],
    'season_year': season_year.rows[0].season_year
  }
}

module.exports = {
  getMultiple,
  getSingle,
  getComparison,
  getSummary,

}