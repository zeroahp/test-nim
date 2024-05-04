import gameService from "../service/client/game.service";
export const postData = (player1, player2, initialBoard, 
    currentBoard, randomPlayer, gameMode, version, winner, solveBoard) =>{

    gameService.postData({
        player1: player1,
        player2: player2,
        initialBoard:initialBoard,
        currentBoard: currentBoard,
        turn: randomPlayer,
        gameMode: gameMode,
        version: version,
        winner: winner,
        solvedBoard: solveBoard,
    }).then(() => {
        
    }).catch(error => {
        console.error("Error while posting data:", error);
    });
}