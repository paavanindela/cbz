

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
            const scorecard = await match.getSingle(id);
            res.json(scorecard);
        } catch (error) {
            console.error(error.message);
        }

    });

    app.get("/matches/comparison/:id", async (req, res) =>{
        try {
            const id = req.params.id;
            const result = await match.getComparison(id);
            res.json(result);
        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/matches/summary/:id", async (req, res) =>{
        try {
            const id = req.params.id;
            // const inning = req.query.inning;
            const result = await match.getSummary(id);
            res.json(result);
        } catch (error) {
            console.error(error.message);
        }

    });
}