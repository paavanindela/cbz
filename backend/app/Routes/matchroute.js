
const pool = require('../db');
const match = require('../models/match')

module.exports = function (app) {
    
    app.get("/matches",async (req, res)=>{
        try {
            const pageno = req.query.page;
            const matchlist = await match.getMultiple(pageno);
            res.json(matchlist);
        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/matches/:id", async (req, res) =>{
        try {
            const id = req.params.id;
            const scorecard = await match.getBatting(id);
            res.json(scorecard);
        } catch (error) {
            console.error(error.message);
        }

    });

    // app.get("/matches/total/:id", async (req, res) =>{
    //     try {
    //         const id = req.params.id;
    //         const inning = req.query.inning;
    //         const scorecard = await match.getTotal(id, inning);
    //         res.json(scorecard);
    //     } catch (error) {
    //         console.error(error.message);
    //     }

    // });

    // app.get("/matches/total/:id", async (req, res) =>{
    //     try {
    //         const id = req.params.id;
    //         const inning = req.query.inning;
    //         const scorecard = await match.getTotal(id, inning);
    //         res.json(scorecard);
    //     } catch (error) {
    //         console.error(error.message);
    //     }

    // });
}