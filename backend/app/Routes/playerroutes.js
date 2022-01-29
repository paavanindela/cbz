
const pool = require('../db');
// const match = require('../models/match')

module.exports = function (app) {
    app.get("/players", async (req, res)=>{
        try {
            console.log('OK Working 1');
        } catch (error) {
            console.error(error.message);
        }
    });
}