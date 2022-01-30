const venue = require('../models/venue')

module.exports = function(app) {
    app.get("/venue", async (req, res)=>{
        try {
            
            const result = await venue.getList();
            res.json(result);
        } catch (error) {
            console.error(error.message);
        }
    });
    app.get("/venue/:id", async (req, res)=>{
        try {
            const id = await req.params.id
            const result = await venue.getOne(id);
            res.json(result);
        } catch (error) {
            console.error(error.message);
        }
    });

    app.post("/venue", async (req,res)=>{
        try {
            const result = await venue.post(req.body);
            res.json(result); 
        } catch (err) {
            console.log(err.message);
        }
    });
}