
const player = require('../models/player')

module.exports = function (app) {
    app.get("/players/:id", async (req, res)=>{
        try {
            const id = req.params.id;
            const result = await player.getOne(id);
            res.json(result);
        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/pointstable",async (req, res)=>{
        try {
            const pageno = req.query.page;
            const yearList = await player.getYear();
            res.json(yearList);
        } catch (error) {
            console.error(error.message);
        }
    });
    
    app.get("/pointstable/:year", async (req, res)=>{
        try {
            const year = req.params.year;
            const result = await player.getTable(year);
            res.json(result);
        } catch (error) {
            console.error(error.message);
        }
    });
}