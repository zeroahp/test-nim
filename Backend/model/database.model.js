const mongoose = require('mongoose')

const databaseSchema = new mongoose.Schema(
  {
    player1: String,
    player2: String,
    currentBoard: {
      type: Array,
      default: [],
    },
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