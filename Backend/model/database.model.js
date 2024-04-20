const mongoose = require('mongoose')

const databaseSchema = new mongoose.Schema(
  {
    idBoard : String,
    player1: String,
    player2: String,
    initialBoard:{
      type: Array,
      default: [],
    },
    currentBoard: {
      type: Array,
      default: [],
    },
    currentPlayer: String,
    turn: String,
    solvedBoard: {
      type: Array,
      default: []
    },
    version: String,
    gameMode: String,
    winner : String,
    createAt: Date,
    deleted: {
      type: Boolean,
      default: false
    }
  }
)

const Database = mongoose.model("Database", databaseSchema, 'database');

module.exports = Database;