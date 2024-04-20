import { createSlice } from "@reduxjs/toolkit";

const nimSlice = createSlice ({
    name: "NimGame",
    initialState:{
        player1: null,
        player2: null,
        turn: null,
        currentplayer:null,
        initialBoard:[],
        currentBoard:[],
        version:null,
        solvedBoard: [],
        gameMode: null,
        winner : null,
        autoSolve: false,
        savedBoard: null,
    },

    reducers: {
        setPlayer1 : (state, action) => {
            state.player1 = action.payload;
        },

        setPlayer2 : (state, action) => {
            state.player2 = action.payload;
        },

        setCurrentBoard: (state, action) => {
            state.currentBoard = action.payload;
        },
        setSavedBoard : (state, action) => {
            state.savedBoard = action.payload;
        },
        setSolvedBoard: (state, action) => {
            state.solvedBoard = action.payload;
        },
        setInitial: (state, action) => {
            state.initialBoard = action.payload;
        },
        setVersion: (state, action) => {
            switch (action.payload) {
                case "normal-game":
                    state.version = "Normal Game";
                    break;
                case "misere-game":
                    state.version = "Misère game";
                    break;
                default:
                    break;
            }
        },

        setGameMode: (state, action) => {
            switch (action.payload) {
                case "twoPlayer":
                    state.gameMode = "Two Player";
                    break;
                case "playwithBot":
                    state.gameMode = "Play with Bot";
                    break;
                default:
                    break;
            }
        },
        setTurn: (state, action) => {
            state.turn = action.payload;
        },
        setCurrentPlayer: (state, action) => {
            state.currentplayer = action.payload;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },

        setAutoSolve: (state, action) => {
            state.autoSolve = action.payload;
        },

        resetNim: state => {
            return {
                ...state,
                player1: null,
                player2: null,
                turn: null,
                currentplayer:null,
                currentBoard:[],
                initialBoard:[],
                version:null,
                solvedBoard: [],
                gameMode: null,
                winner : null,
                autoSolve: false,
                savedBoard: null,
            }
        }
    }
})

export const {
    setPlayer1,
    setPlayer2,
    setAutoSolve,
    setCurrentBoard,
    setGameMode,
    setSolvedBoard,
    setWinner,
    setVersion,
    setTurn,
    setCurrentPlayer,
    setInitial,
    resetNim,
    setSavedBoard
} = nimSlice.actions;

export const getInitialState = (state) => state.NimGame.initialState;

export default nimSlice.reducer;
