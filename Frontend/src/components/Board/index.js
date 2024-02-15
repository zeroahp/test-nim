import "./style.scss"
import { calculateNimSum } from "../../utils/caculator";
import { useSelector } from "react-redux";
import {setCurrentBoard, setWinner, setCurrentPlayer, setInitial} from '../../redux/nimSlice'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import gameService from "../../service/client/game.service";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Link , useNavigate} from 'react-router-dom'
import { generateRandomNumberOfPileArray, generateRandomStoneArray } from "../../utils/generateRandom";



function Board() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //req store
    const player1 = useSelector((state) => state.NimGame.player1);
    const player2 = useSelector((state) => state.NimGame.player2);
    const currentBoard = useSelector((state) => state.NimGame.currentBoard);
    const randomPlayer = useSelector((state) => state.NimGame.turn);
    const gameMode = useSelector((state) => state.NimGame.gameMode);    
    const version = useSelector((state) => state.NimGame.version);    
    const initialBoard = useSelector((state) => state.NimGame.initialBoard);    
    //usestate
    const [currentPlayer, setcurrentPlayer] = useState(randomPlayer);
    const [currentRow, setcurrentRow] = useState(null);
    const [solveBoard, setSolveBoard] = useState([]); 
    
    const stones = currentBoard;
    const sum = stones.reduce((total, current) => total + current, 0);
    const [stonesRemoved, setStonesRemoved] = useState(sum);

    //random-playger
    useEffect(() => {
        if(randomPlayer ){
            dispatch(setCurrentPlayer(randomPlayer));
            setcurrentPlayer(randomPlayer);
        }
        // Swal.fire({
        //     title: `It starts with "${randomPlayer}" turn to play! `,
        //     width: 600,
        //     padding: "3em",
        //     color: "#716add",
        //     background: "#fff",
        //   });
    }, []);

    //setCurrentPlayer-turn
    useEffect(() => {
        dispatch(setCurrentPlayer(currentPlayer));
        
        if (currentPlayer === player2 && player2 === 'Bot') {
            setTimeout(() => {
                handleBotRemove();   
            }, 3000);
        }
    }, [currentPlayer])
        

    //remove-stones
    const handleRemove = async(rowIndex, colIndex) => {    
        if(gameMode === 'Two Player'){
            if(currentPlayer === player1 || (currentPlayer === player2)){
                if(rowIndex >= 0 && rowIndex < currentBoard.length 
                    && colIndex >= 0 && colIndex < currentBoard[rowIndex] )
                    {
                        let newBoard = [...currentBoard];
                        await setcurrentRow(rowIndex);

                        if (currentRow === null) {
                            // Nếu chưa có hàng nào được ghim, ghim hàng đang xử lý
                            newBoard[rowIndex] -= 1;
                            await dispatch(setCurrentBoard(newBoard));
                            
                            if (newBoard[rowIndex] === 0) {
                                // Nếu đã loại bỏ hết đá từ một hàng, chuyển lượt cho người chơi khác
                                handleChangeTurn();
                            }
                        }
                        
                        
                        if ((rowIndex === currentRow)) {
                            // Chỉ xử lý nếu đang ở hàng đã được ghim
                            newBoard[rowIndex] -= 1;
            
                            await dispatch(setCurrentBoard(newBoard));
            
                            if (newBoard[rowIndex] === 0) {
                                // Nếu đã loại bỏ hết đá từ một hàng, chuyển lượt cho người chơi khác
                                handleChangeTurn();
                            }
                        }
    
                        //Nếu tất cả các giá trị trong mảng đều bằng 0
                        if (newBoard.every(value => value === 0)) {

                            let winner = '';
                            if(version === "Normal Game"){
                                winner = currentPlayer;
                            }else{
                                winner = (currentPlayer === player1 ? player2 : player1) 
                            }

                            await gameService.postData({
                                player1: player1,
                                player2: player2,
                                currentBoard: initialBoard,
                                solveBoard: solveBoard,
                                turn: randomPlayer,
                                gameMode: gameMode,
                                winner: winner,
                            })


                            Swal.fire({
                                title: `Congratulation "${winner}"!`,
                                imageUrl: require("../../asset/gif/4b8.gif"),
                                imageWidth: 350,
                                imageHeight: 250,
                                imageAlt: "Custom image",
                                width: 400,
                                showCancelButton: true,
                                confirmButtonColor: "#413565",
                                cancelButtonColor: "#000",
                                confirmButtonText: "Back Home",
                                cancelButtonText: "Result"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                  navigate("/home")
                                }else{
                                    navigate("/history")
                                }
                              });
    
                            await dispatch(setWinner(currentPlayer));
                              console.log("chay", solveBoard);
                            //post-data
                            
    
                        }
                }
            }
        }
        else if(gameMode === "Play with Bot"){
            if(currentPlayer=== player1){
                if(rowIndex >= 0 && rowIndex < currentBoard.length 
                    && colIndex >= 0 && colIndex < currentBoard[rowIndex] )
                    {
                        let newBoard = [...currentBoard];
                        let cntRemove = 0;
                        await setcurrentRow(rowIndex);
                        
                        if (currentRow === null) {
                            // Nếu chưa có hàng nào được ghim, ghim hàng đang xử lý
                            newBoard[rowIndex] -= 1;
                            cntRemove++;
                            await setStonesRemoved((prevStonesRemoved) => prevStonesRemoved + cntRemove);

                            if (newBoard[rowIndex] === 0) {
                                newBoard.splice(rowIndex,1);
                                // Nếu đã loại bỏ hết đá từ một hàng, chuyển lượt cho người chơi khác
                                handleChangeTurn();
                            }
                            await dispatch(setCurrentBoard(newBoard));

                        }
                        
                        if (rowIndex === currentRow) {
                            // Chỉ xử lý nếu đang ở hàng đã được ghim
                            newBoard[rowIndex] -= 1;            
                            cntRemove++;
                            await setStonesRemoved((prevStonesRemoved) => prevStonesRemoved + cntRemove);

                            if (newBoard[rowIndex] === 0) {
                                // remove phan tu  = 0
                                newBoard.splice(rowIndex,1);
                                // Nếu đã loại bỏ hết đá từ một hàng, chuyển lượt cho người chơi khác
                                handleChangeTurn();
                            }
                            await dispatch(setCurrentBoard(newBoard));

                        }
  
                        // Nếu tất cả các giá trị trong mảng đều bằng 0
                        if (newBoard.every(value => value === 0)) {
                            
                            let winner = '';
                            
                            if(version === "Normal Game"){
                                winner = currentPlayer;
                            }else{
                                winner = (currentPlayer === player1 ? player2 : player1) 
                            }

                            Swal.fire({
                                title: `Congratulation "${winner}"!`,
                                imageUrl: require("../../asset/gif/4b8.gif"),
                                imageWidth: 350,
                                imageHeight: 250,
                                imageAlt: "Custom image",
                                width: 400,
                                showCancelButton: true,
                                confirmButtonColor: "#413565",
                                cancelButtonColor: "#000",
                                confirmButtonText: "Back Home",
                                cancelButtonText: "Result"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                  navigate("/home")
                                }else{
                                    navigate("/history")
                                }
                              });                            
    
                            await dispatch(setWinner(winner));
                            console.log("winner", winner);
                            // await setwinner(currentPlayer);
    
                            //post-data
                            await gameService.postData({
                                player1: player1,
                                player2: player2,
                                currentBoard: initialBoard,
                                turn: randomPlayer,
                                gameMode: gameMode,
                                winner: winner,
                                solvedBoard: solveBoard,
                            })
    
                        }
                }
            }
        }   
    }
    

    const handleBotRemove = async() => {
        calculateBotRemove();   
    }

    console.log("currentBoard", currentBoard);
    const calculateBotRemove = async() => {        
        let nimSum = calculateNimSum(currentBoard, currentBoard.length);
        
        if(version === "Normal Game"){
            if(nimSum !== 0){
                for(let rowIndex = 0; rowIndex < currentBoard.length; rowIndex++){
                    const currentStones = currentBoard[rowIndex];
                    const stonesRemoved = currentBoard[rowIndex] ^ nimSum;
                  
                    if(stonesRemoved < currentBoard[rowIndex]){
                        let newBoard = [...currentBoard];
    
                        if(stonesRemoved === 0){
                            newBoard[rowIndex] = currentBoard[rowIndex] - currentBoard[rowIndex];  
                            Swal.fire({
                                position: "top-end",
                                title: `Bot removed "${currentBoard[rowIndex]}" piles "${[rowIndex]}"!`,
                                showConfirmButton: false,
                                timer: 3000
                            });       
                        }else{
                            newBoard[rowIndex] = currentBoard[rowIndex] - stonesRemoved;
                            Swal.fire({
                                position: "top-end",
                                title: `Bot removed "${stonesRemoved}" piles "${[rowIndex]}"!`,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        }
    
                        setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
                            playerTurn : currentPlayer,
                            stonesRemoved: currentStones,
                         }]);
                
                        if (newBoard[rowIndex] === 0) {
                            // handleChangeTurn();
                            newBoard.splice(rowIndex,1);
                        }
                        await dispatch(setCurrentBoard(newBoard));
                        
    
                        if(nimSum === currentBoard[rowIndex] && currentBoard.length === 1 ){
                            let emptyBoard = [...currentBoard];
                            emptyBoard[rowIndex] = currentBoard[rowIndex] - currentBoard[rowIndex];
                            await dispatch(setCurrentBoard(emptyBoard));
    
                            if (emptyBoard.every(value => value === 0)) {
    
                                let winner = '';
                                
                                if(version === "Normal Game"){
                                    winner = currentPlayer;
                                }else{
                                    winner = (currentPlayer === player1 ? player2 : player1) 
                                }
    
                                Swal.fire({
                                    title: `Congratulation "${currentPlayer}"!`,
                                    imageUrl: require("../../asset/gif/4b8.gif"),
                                    imageWidth: 350,
                                    imageHeight: 250,
                                    imageAlt: "Custom image",
                                    width: 400,
                                    showCancelButton: true,
                                    confirmButtonColor: "#413565",
                                    cancelButtonColor: "#000",
                                    confirmButtonText: "Back Home",
                                    cancelButtonText: "Result"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                      navigate("/home")
                                    }else{
                                        navigate("/history")
                                    }
                                  });
    
                                await dispatch(setWinner(winner));
        
                                //post-data
                                await gameService.postData({
                                    player1: player1,
                                    player2: player2,
                                    currentBoard: initialBoard,
                                    turn: randomPlayer,
                                    gameMode: gameMode,
                                    winner: winner,
                                    solvedBoard: solveBoard,
                                })   
                            }   
                        }
                        break;
                    }   
                }
                BotChangeTurn(); 
            }
            else
            {
                getRandomRemove();
                BotChangeTurn();
            }   
        } else if(version === "Misère game"){
            let tmp = [...currentBoard];
            let i, i1 = 0, index = 0;
            for(i = 0 ; i < tmp.length ; i++){
                if(tmp[i] === 1){
                    i1++;
                    console.log("i1", i1);
                }else if(tmp[i] > 1){
                    index = i;
                }
            }
            console.log("index", index);

            if(i1 === (currentBoard.length - 1)){
                console.log("chay-------");
                console.log("tmp.length", tmp.length);
                if(tmp.length % 2){
                    tmp[index] =  tmp[index] - ( tmp[index] - 1);
                }else{
                    tmp[index] =  tmp[index] -  tmp[index];
                }

                console.log("tmp", tmp[index]);
                if (tmp[index] === 0) {
                    console.log("tmp === 0");
                    tmp.splice(index,1);
                }
                await dispatch(setCurrentBoard(tmp));
                Swal.fire({
                    position: "top-end",
                    title: `Bot removed "${currentBoard[index]}" piles "${[index]}"!`,
                    showConfirmButton: false,
                    timer: 3000
                });
                BotChangeTurn(); 
            }
            else{
                if(nimSum !== 0){
                    console.log("nim-sum != 0");
                    console.log("nim-sum", nimSum);
                    for(let rowIndex = 0; rowIndex < currentBoard.length; rowIndex++){
                        const currentStones = currentBoard[rowIndex];
                        const stonesRemoved = currentBoard[rowIndex] ^ nimSum;
                    console.log("stonesRemoved", stonesRemoved);
                    console.log(" currentBoard[rowIndex]",  currentBoard[rowIndex]);
                      
                        if(stonesRemoved < currentBoard[rowIndex]){
                            let newBoard = [...currentBoard];
        
                            if(stonesRemoved === 0){
                                newBoard[rowIndex] = currentBoard[rowIndex] - currentBoard[rowIndex];  
                                Swal.fire({
                                    position: "top-end",
                                    title: `Bot removed "${currentBoard[rowIndex]}" piles "${[rowIndex]}"!`,
                                    showConfirmButton: false,
                                    timer: 3000
                                });       
                            }else{
                                newBoard[rowIndex] = currentBoard[rowIndex] - stonesRemoved;
                                Swal.fire({
                                    position: "top-end",
                                    title: `Bot removed "${stonesRemoved}" piles "${[rowIndex]}"!`,
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                            }
                    
                            if (newBoard[rowIndex] === 0) {
                                newBoard.splice(rowIndex,1);
                            }

                            setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
                                playerTurn : currentPlayer,
                                stonesRemoved: currentStones,
                             }]);
        
                           
                            await dispatch(setCurrentBoard(newBoard));
                            
        
                            if(nimSum === currentBoard[rowIndex] && currentBoard.length === 1 ){
                                let emptyBoard = [...currentBoard];
                                emptyBoard[rowIndex] = currentBoard[rowIndex] - currentBoard[rowIndex];
                                await dispatch(setCurrentBoard(emptyBoard));
        
                                if (emptyBoard.every(value => value === 0)) {
        
                                    let winner = '';
                                    
                                    if(version === "Normal Game"){
                                        winner = currentPlayer;
                                    }else{
                                        winner = (currentPlayer === player1 ? player2 : player1) 
                                    }
        
                                    Swal.fire({
                                        title: `Congratulation "${winner}"!`,
                                        imageUrl: require("../../asset/gif/4b8.gif"),
                                        imageWidth: 350,
                                        imageHeight: 250,
                                        imageAlt: "Custom image",
                                        width: 400,
                                        showCancelButton: true,
                                        confirmButtonColor: "#413565",
                                        cancelButtonColor: "#000",
                                        confirmButtonText: "Back Home",
                                        cancelButtonText: "Result"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                          navigate("/home")
                                        }else{
                                            navigate("/history")
                                        }
                                      });
        
                                    await dispatch(setWinner(winner));
            
                                    //post-data
                                    await gameService.postData({
                                        player1: player1,
                                        player2: player2,
                                        currentBoard: initialBoard,
                                        turn: randomPlayer,
                                        gameMode: gameMode,
                                        winner: winner,
                                        solvedBoard: solveBoard,
                                    })   
                                }   
                            }
                            break;
                        }   
                    }
                    BotChangeTurn(); 
                }
                else
                {
                    getRandomRemove();
                    BotChangeTurn();
                } 
                }
            }
    
        
        
    }


    const getRandomRemove = async() => {
        const rowIndex = Math.floor(Math.random() * currentBoard.length);
        const stonesRemoved = 1 +  Math.floor(Math.random() * currentBoard[rowIndex]);

        let newBoard = [...currentBoard];
        
        newBoard[rowIndex] = currentBoard[rowIndex] - stonesRemoved;
        // setcurrentRow(rowIndex);
        Swal.fire({
            position: "top-end",
            title: `Bot removed "${stonesRemoved} piles ${rowIndex}"!`,
            showConfirmButton: false,
            timer: 3000
        });

        setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
            playerTurn : currentPlayer,
            stonesRemoved: stonesRemoved,
         }]);

        if (newBoard[rowIndex] === 0) {
            newBoard.splice(rowIndex,1);
            BotChangeTurn();
        }
        await dispatch(setCurrentBoard(newBoard));

        return {rowIndex, stonesRemoved};
    }
    
    const handleChangeTurn = async () => {  
        let sum = currentBoard.reduce((total, current) => total + current, 0);
        let newMove = { player: currentPlayer, stonesRemoved: (stonesRemoved - sum ), rowIndex: currentRow };
        setSolveBoard([...solveBoard, newMove]);

        await setcurrentRow(null);
        await setStonesRemoved(sum);
        setcurrentPlayer(currentPlayer === player1 ? player2 : player1);      

    };
    console.log("SolveBoard", solveBoard);

    const BotChangeTurn = async() => {
        setcurrentPlayer(currentPlayer === player1 ? player2 : player1);      
    }

    const handleChangeBoard = async() => {
        const randomBoard = generateRandomStoneArray(generateRandomNumberOfPileArray(4),10);
        await dispatch(setCurrentBoard(randomBoard));
        await dispatch(setInitial(randomBoard));
    }

    
    return (
        <>
            <div className="board">
                {currentBoard.length > 0 ? (
                    <div className="board-element">
                        <table>
                            <tbody>
                                {currentBoard.map((value, rowIndex) => (
                                    
                                    <tr className="board-row" key={rowIndex}>

                                        {value > 0 ? (
                                            //Array.from tạo một mảng mới từ một đối tượng có chiều dài xác định.
                                            Array.from({ length: value }, (_,colIndex) => (
                                                <td 
                                                    key={`${rowIndex}-${colIndex}`}
                                                    onClick={() => handleRemove(rowIndex, colIndex)}
                                                >
                                                    <span className="board-cell"></span>
                                                </td>
                                            ))
                                        ):(
                                            <td key={rowIndex}></td>
                                        )}
                                    </tr>
                                ) )}
                             </tbody> 
                        </table>
                        
                        
                    </div> 
                ) 
                : (
                    <p>Error</p>
                )  
                }
            </div>
            <div className="btn-control">
                <button className="control change-turn" onClick={handleChangeTurn}>
                    Change Turn
                </button>

                <button className="control change-board" onClick={handleChangeBoard}>Change Board</button>
            </div>
        </>
    )
}

export default Board;
