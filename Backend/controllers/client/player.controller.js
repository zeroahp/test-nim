// const modelData = require("../../model/database.model");
const modelPlayer= require("../../model/playerSchema");

module.exports.playerGet = async (req, res) => {
    const player = await modelPlayer.find({
        deleted: false,
    })
    res.send(player);
}

module.exports.playerPost = async (req, res) => {

    if(req.body.user1 && req.body.user2){
        let nimObject = {
            user1: req.body.user1,
            user2: req.body.user2,
            currentBoard: req.body.currentBoard,
            computer: req.body.bot,
            turn: req.body.turn,
            solvedBoard: req.body.solvedBoard,
            gameMode: req.body.gameMode,
            winner : req.body.winner,
            createAt: new Date(),
           
        }
        
        const newNim = new modelData(nimObject);
        await newNim.save();
        console.log("Data saved successfully");
        res.send("Data saved successfully");
        
    }
    
}