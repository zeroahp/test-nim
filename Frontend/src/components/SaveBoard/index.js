import "./style.scss"
import { calculateNimSum } from "../../utils/caculator";
import { useSelector } from "react-redux";
import {setCurrentBoard, setWinner, setCurrentPlayer, setSavedBoard} from '../../redux/nimSlice'
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import gameService from "../../service/client/game.service";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { useNavigate} from 'react-router-dom'
import {  randomIdBoard } from "../../utils/generateRandom";

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
    const initialBoard = useSelector((state) => state.NimGame.currentBoard);    
    const solved = useSelector((state) => state.NimGame.solvedBoard);    
    const updateSolvedBoard = solved;
    const idBoard = useSelector((state) => state.NimGame.savedBoard);    
    console.log("updateSolvedBoard", updateSolvedBoard);

    //usestate
    const [currentPlayer, setcurrentPlayer] = useState(randomPlayer);
    const [currentRow, setcurrentRow] = useState();
    const [solveBoard, setSolveBoard] = useState([]); 
    
    const [stonesRemoved, setStonesRemoved] = useState([]);
    const [botRemoved, SetBotRemoved] = useState();
    
    //random-playger
    useEffect(() => {
        if(randomPlayer ){
            dispatch(setCurrentPlayer(randomPlayer));
            setcurrentPlayer(randomPlayer);
        }
        Swal.fire({
            title: `It starts with "${randomPlayer}" turn to play! `,
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff",
          });
        SetBotRemoved(5);
        setcurrentRow(null);
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
        
    
    useEffect(() => {
        let sum = 0;
        for(let i = 0; i< initialBoard.length ; i++){
            sum += initialBoard[i];
        }
        setStonesRemoved(sum) //test
    }, []);

    
    let updatedSolvedBoard = [...updateSolvedBoard, ...solveBoard];
    //[put] data backend
    useEffect(() => {
        if (currentBoard.every(value => value === 0)) {
            let winner = '';
                                    
            if(version === "Normal Game"){
                winner = currentPlayer;
            }else{
                winner = (currentPlayer === player1 ? player2 : player1) 
            }

           
            gameService.putData(idBoard,{
                currentBoard: currentBoard,
                solvedBoard: updatedSolvedBoard,
                winner: winner,
            })
        }       
    }, [solveBoard]);   

    
    //Save Game
    const handleSaveBoard = async() => {
        const idBoard = randomIdBoard();
        gameService.putData(idBoard,{
            idBoard: idBoard,
            player1: player1,
            player2: player2,
            currentBoard: currentBoard,
            currentPlayer: currentPlayer,
            turn: randomPlayer,
            gameMode: gameMode,
            version: version,
            // solvedBoard: updatedSolvedBoard,
        })
        console.log((currentPlayer));

        Swal.fire({
            title: "Save game?",
            text: `ID Board "${idBoard}"!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes!",
          })
    }

    //set-auto-changTurn
    useEffect(() => {
        console.log("------------------co chay vao day");
        let sum = 0;
        for(let i = 0; i< currentBoard.length ; i++){
            sum += currentBoard[i];
            
        }
        if((currentBoard[currentRow] - 1) === 0){
            setcurrentPlayer(currentPlayer === player1 ? player2 : player1);      
            setcurrentRow(null);

            let newMove = { 
                player: currentPlayer, 
                stonesRemoved: 1, 
                rowIndex: currentRow 
            };
            setSolveBoard([...solveBoard, newMove]);

            if(currentBoard[currentRow] === 1){
                setStonesRemoved(sum-1);
            }
        }

    }, [currentRow]);

    //human-remove-stones
    const handleRemove = async(rowIndex, colIndex) => {    
        if(gameMode === 'Two Player'){
            if(currentPlayer === player1 || (currentPlayer === player2)){
                if(rowIndex >= 0 && rowIndex < currentBoard.length 
                    && colIndex >= 0 && colIndex < currentBoard[rowIndex] )
                    {
                        let newBoard = [...currentBoard];
                        let updatedRow = rowIndex; 
                        if (currentRow === null) {
                            // Nếu chưa có hàng nào được ghim, ghim hàng đang xử lý
                            await setcurrentRow(updatedRow);
                        
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
                        
                        if (currentRow === null) {
                            // Nếu chưa có hàng nào được ghim, ghim hàng đang xử lý
                            newBoard[rowIndex] -= 1;
                            await setcurrentRow(rowIndex);
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

                            if (newBoard[rowIndex] === 0) {
                                // remove phan tu  = 0
                                newBoard.splice(rowIndex,1);
                                // Nếu đã loại bỏ hết đá từ một hàng, chuyển lượt cho người chơi khác
                                handleChangeTurn();
                            }
                            await dispatch(setCurrentBoard(newBoard));

                        }

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
    
                            await dispatch(setWinner(currentPlayer));                      
    
                        }
                }
            }
        }   
    }
    
    const handleBotRemove = async() => {
        calculateBotRemove();   
    }

    const calculateBotRemove = async() => {   
        let nimSum = calculateNimSum(currentBoard, currentBoard.length);
        if(version === "Normal Game"){
            if(nimSum !== 0){
                for(let rowIndex = 0; rowIndex < currentBoard.length; rowIndex++){
                    const xNimsum = currentBoard[rowIndex] ^ nimSum;
                  
                    if(xNimsum < currentBoard[rowIndex]){
                        let newBoard = [...currentBoard];
                        let stonesRemove = currentBoard[rowIndex] - xNimsum;
                        newBoard[rowIndex] = currentBoard[rowIndex] - stonesRemove;
                    
                        
                        Swal.fire({
                            position: "top-end",
                            title: `Bot removed "${stonesRemove}" piles in row "${[rowIndex]}"!`,
                            showConfirmButton: false,
                            timer: 3000
                        });
    
                        setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
                            player : currentPlayer,
                            stonesRemoved: stonesRemove,
                            rowIndex: rowIndex,
                         }]);
                        setStonesRemoved(stonesRemoved - stonesRemove);

                
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
        else if(version === "Misère game"){
            let tmp = [...currentBoard];
            let i, i1 = 0, index = 0;
            //truong hop dat biet tinh special_case
            for(i = 0 ; i < tmp.length ; i++){
                console.log("tmp[i]", tmp[i]);
                if(tmp[i] === 1){
                    i1++;
                    console.log("i1", i1);
                }else if(tmp[i] > 1){
                    index = i;
                }
            }
            
            //special_case
            if(i1 === (currentBoard.length - 1)){
                let stonesRemove;
                if(tmp.length % 2){///neu so dong soi hien tai la le
                    stonesRemove = ( tmp[index] - 1);
                    tmp[index] =  tmp[index] - stonesRemove;
                }else{
                    stonesRemove = tmp[index];
                    tmp[index] =  tmp[index] -  stonesRemove;
                }

                setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
                    player : currentPlayer,
                    stonesRemoved: stonesRemove,
                    rowIndex: index,
                }]);
                setStonesRemoved(stonesRemoved - stonesRemove);

                if (tmp[index] === 0) {
                    tmp.splice(index,1);
                }
                await dispatch(setCurrentBoard(tmp));

                Swal.fire({
                    position: "top-end",
                    title: `Bot removed "${stonesRemove}" piles in row "${[index]}"!`,
                    showConfirmButton: false,
                    timer: 3000
                });
                BotChangeTurn(); 
            }
            else{
                if(nimSum !== 0){
                    for(let rowIndex = 0; rowIndex < currentBoard.length; rowIndex++){
                        const xNimsum = currentBoard[rowIndex] ^ nimSum;
                      
                        if(xNimsum < currentBoard[rowIndex]){
                            let newBoard = [...currentBoard];
                            let stonesRemove = currentBoard[rowIndex] - xNimsum;
                            newBoard[rowIndex] = currentBoard[rowIndex] - stonesRemove;
                        
                            
                            Swal.fire({
                                position: "top-end",
                                title: `Bot removed "${stonesRemove}" piles in row "${[rowIndex]}"!`,
                                showConfirmButton: false,
                                timer: 3000
                            });
        
                            setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
                                player : currentPlayer,
                                stonesRemoved: stonesRemove,
                                rowIndex: rowIndex,
                             }]);
                            setStonesRemoved(stonesRemoved - stonesRemove);

                    
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
            title: `Bot removed ${stonesRemoved} piles in row ${rowIndex}!`,
            showConfirmButton: false,
            timer: 3000
        });
        await SetBotRemoved(stonesRemoved);

        setSolveBoard((prevSolveBoard) => [...prevSolveBoard, { 
            player : currentPlayer,
            stonesRemoved: stonesRemoved,
            rowIndex: rowIndex,
         }]);

        if (newBoard[rowIndex] === 0) {
            newBoard.splice(rowIndex,1);
            BotChangeTurn();
        }
        await dispatch(setCurrentBoard(newBoard));

        return {rowIndex, stonesRemoved};
    }


    //set-changTurn
    const handleChangeTurn = async(e) => {  
        if(currentRow !== null){
            let sum = 0;
            for(let i = 0; i< currentBoard.length ; i++){
                sum += currentBoard[i];
            }
            console.log("sum", sum);
            console.log("stonesRemoved", stonesRemoved);
        
            if((currentBoard[currentRow] - 1) === 0){
                sum -=1 ;
            }

            let newMove = { 
                player: currentPlayer, 
                stonesRemoved: (stonesRemoved - sum), 
                rowIndex: currentRow 
            };
            console.log("new move", newMove);
            setSolveBoard([...solveBoard, newMove]);

            setStonesRemoved(sum);
            await setcurrentRow(null);
            setcurrentPlayer(currentPlayer === player1 ? player2 : player1);      
        }else{
            return;
        }
    };


    const BotChangeTurn = async() => {
        setcurrentPlayer(currentPlayer === player1 ? player2 : player1);     
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
                <button className="control change-turn"  title="Change turns when you have removed a stone or automatically change turns if you have removed the last stone in a row. " 
                onClick={handleChangeTurn}>
                    Change Turn
                </button>

                <button  className="control save-board"  onClick={handleSaveBoard}>
                    Save Board
                </button>

                {/* <button className="control change-board" 
                title="The board can only be changed if no moves have been made. Only one change allowed." 
                onClick={handleChangeBoard}>
                    Change Board
                </button> */}
            </div>
        </>
    )
}

export default Board;
