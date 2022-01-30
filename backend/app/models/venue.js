const pool = require('../db');

async function getList() {
  
  const data = await pool.query(
     "SELECT venue_id, venue_name FROM venue",
  );
  
  return {
    'data':data.rows
  }
}

async function getOne(id) {
  
    const data = await pool.query(
       "SELECT * FROM venue_view WHERE venue_id=$1", [id]
    );
    const data1 = await pool.query(
        "SELECT season_year, score FROM first_inning WHERE venue_id=$1", [id]
    );
    
    return {
      'data':data.rows[0],
      'graph': data1.rows
    }
  }

  async function post(body) {
    const {venue_name, city_name, country_name, capacity} = body; 
    const data = await pool.query(
        "INSERT INTO venue (venue_name, city_name, country_name, capacity) values($1,$2,$3,$4) RETURNING *"
        , [venue_name, city_name, country_name, capacity]
    );
    
    
    return {
      'data':data.rows[0]
    }
  }

module.exports = {
    getList,
    getOne,
    post
}