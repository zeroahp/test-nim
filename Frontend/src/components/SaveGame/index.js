import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom'
import "./style.scss"
import { useDispatch,  } from 'react-redux';
import { setCurrentBoard,setPlayer2, setPlayer1, setTurn, setInitial,setIdBoard, setVersion, setGameMode, setSavedIdBoard, setSolvedBoard } from '../../redux/nimSlice';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { useEffect } from "react";
import gameService from "../../service/client/game.service";
import { data } from 'jquery';



function SaveGame(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {   
        e.preventDefault();      
        const idBoard = document.querySelector('.id__box .fill-id .input');   
        const data = await gameService.getIdBoard(idBoard.value);

        if(idBoard.value === ""  ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please fill in ID Board!",
                showConfirmButton: false,
                timer: 1500,
                customClass: { //dat class
                    title: 'custom-swal-title', // Define a custom class for the title
                }
            });
            return;
        }else if(data){
            dispatch(setPlayer1(data.player1));            
            dispatch(setPlayer2(data.player2));
            dispatch(setTurn(data.currentPlayer));
            dispatch(setCurrentBoard(data.currentBoard));
            dispatch(setSolvedBoard(data.solvedBoard))
            dispatch(setSavedIdBoard(data._id));
            dispatch(setIdBoard(data.idBoard));

            if( data.version === "Normal Game"){
                dispatch(setVersion("normal-game"));
            }else{
                dispatch(setVersion("misere-game"));
            }

            if(data.gameMode ==="Play with Bot"){
                dispatch(setGameMode("playwithBot"));
                navigate('/playvsbot');
            }else{
                dispatch(setGameMode("twoPlayer"));
                navigate('/two-player');
            }

        }else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "ID Board is not correct!",
                showConfirmButton: false,
                timer: 1500,
                customClass: { //dat class
                    title: 'custom-swal-title', // Define a custom class for the title
                }
            });
            return;
        }
    }

    useEffect(() => {
        dispatch(setCurrentBoard(data.currentBoard));
        dispatch(setInitial(data.currentBoard));
    }, []);


    return ( 
        <>
           <div className="container">
                <div className="saved-game">
                    <div className="row">
                        <div className="title">
                            NIM
                        </div>
                    </div>
                    <div className="row">
                        <div className="id__box">
                            <h4>Enter ID</h4>
                            
                            <form onSubmit={handleSubmit}>
                                <>
                                    <div className='fill-id'>
                                        <input 
                                            className='input'
                                            placeholder='Fill in here...'
                                        />
                                    </div>
                            
                                    <button type='submit' className='btn-submit'>Play</button>

                                </>
                               
                            </form>
                           
                        </div>
                    </div>
                </div>
           </div>

        </>
    )
    
}

export default SaveGame;