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
            idBoard: req.body.idBoard,
            player1: req.body.player1,
            player2: req.body.player2,
            currentBoard: req.body.currentBoard,
            initialBoard: req.body.initialBoard,
            currentPlayer: req.body.currentPlayer,
            turn: req.body.turn,
            solvedBoard: req.body.solvedBoard,
            gameMode: req.body.gameMode,
            version: req.body.version,
            winner : req.body.winner,
            createAt: new Date(),
           
        }
        
        const newNim = new modelData(nimObject);
        await newNim.save();
        console.log("Data saved successfully");
        res.send("Data saved successfully");  
    } 
}

module.exports.nimPut = async (req, res) => {
    const id = req.params.id;
    console.log("", req.body);

    // if(req.body.player1 && req.body.player2){
        let nimObject = {
            idBoard: req.body.idBoard,
            player1: req.body.player1,
            player2: req.body.player2,
            initialBoard: req.body.initialBoard,
            currentBoard: req.body.currentBoard,
            currentPlayer: req.body.currentPlayer,
            turn: req.body.turn,
            solvedBoard: req.body.solvedBoard,
            gameMode: req.body.gameMode,
            version: req.body.version,
            winner : req.body.winner,
            createAt: new Date(),
        }
        await modelData.updateOne({
            _id: id
        }, nimObject);
        console.log("nimObject", nimObject);
        console.log("Update uccessfully");
        res.send("Update successfully");  
    // } 
}

module.exports.nimGetId = async (req, res, next) => {
    const id = req.params.id;

    const getItem = await modelData.findOne({
        _id: id,
        deleted: false
    });

    console.log(getItem);
    res.send(getItem);
}

module.exports.nimGetIdBoard = async (req, res, next) => {
    const id = req.params.idBoard;

    const getItem = await modelData.findOne({
        idBoard: id,
        deleted: false
    });

    console.log(getItem);
    res.send(getItem);
}

