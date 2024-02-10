const modelData = require("../../model/database.model");

module.exports.nimGet = async (req, res) => {
    const nim = await modelData.find({
        deleted: false,
    })
    res.send(nim);
}

module.exports.nimPost = async (req, res) => {

    if(req.body.player1 && req.body.player2){
        let nimObject = {
            player1: req.body.player1,
            player2: req.body.player2,
            currentBoard: req.body.currentBoard,
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