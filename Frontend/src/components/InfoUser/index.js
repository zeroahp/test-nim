import 'bootstrap/dist/css/bootstrap.min.css';
import { Link , useNavigate} from 'react-router-dom'
import "./style.scss"
import { useDispatch,  } from 'react-redux';
import {setCurrentBoard} from '../../redux/nimSlice'
import { setPlayer2, setPlayer1, setTurn, setBot, setInitial } from '../../redux/nimSlice';
import { useSelector } from 'react-redux';
import { randomString } from "../../utils/generateRandom";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { generateRandomNumberOfPileArray, generateRandomStoneArray } from "../../utils/generateRandom";
import { useEffect } from "react";


function InfoUser(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //set-info
    const randomBoard = generateRandomStoneArray(generateRandomNumberOfPileArray(4),10);
    useEffect(() => {
        dispatch(setCurrentBoard(randomBoard));
        dispatch(setInitial(randomBoard));
    }, []);

    const handleSubmit = async (e) => {   
        e.preventDefault();
        if(gameMode === 'Two Player'){
            const playerOneName = document.querySelector('.info__box .user1 .info-input');
            const playerTwoName = document.querySelector('.info__box .user2 .info-input');
        
            
            if((playerOneName.value === "" && playerTwoName.value === "") || (playerOneName.value === "" || playerTwoName.value === "") ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Please fill in your name!",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { //dat class
                        title: 'custom-swal-title', // Define a custom class for the title
                    }
                });
                return;
            }
            dispatch(setPlayer1(playerOneName.value));
            dispatch(setPlayer2(playerTwoName.value));

            const randomTurn =  await randomString(playerOneName.value, playerTwoName.value);

            await dispatch(setTurn(randomTurn));
            navigate('/two-player');
        }else{
            const playerThreeName = document.querySelector('.info__box .user3 .info-input');
            if(playerThreeName.value === "" ){
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Please fill in your name!",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { //dat class
                        title: 'custom-swal-title', // Define a custom class for the title
                    }
                });
                return;
            }
            dispatch(setPlayer1(playerThreeName.value));
            dispatch(setPlayer2('Bot'));

            await dispatch(setTurn(playerThreeName.value));
            navigate('/playvsbot');
        }
    }

    //game-mode
    const gameMode = useSelector((state) => state.NimGame.gameMode);   


    return ( 
        <>
           <div className="container">
                <div className="home">
                    <div className="row">
                        <div className="home__title">
                            NIM
                        </div>
                    </div>
                    <div className="row">
                        <div className="info__box">
                            <h4>Enter Name</h4>
                            
                            <form onSubmit={handleSubmit}>
                                {gameMode === "Two Player" ? (
                                    <>
                                        <div className='info user1'>
                                        <p>Player 1</p>
                                        <input 
                                            className='info-input'
                                            placeholder='Fill in here...'
                                        />
                                        </div>
                                        <div className='info user2'>
                                            <p>Player 2</p>
                                            <input 
                                                className='info-input'
                                                placeholder='Fill in here...'/>
                                        </div>
                                
                                        <button type='submit' className='btn-submit'>Play</button>

                                    </>
                                ) : (
                                    <>
                                        <div className='info user3'>
                                        <input 
                                            className='info-input'
                                            placeholder='Fill in here...'
                                        />
                                        </div>
                                        <button type='submit' className='btn-submit'>Play</button>
                       
                                        {/* <Link to={`/two-player`} type='submit'>Play</Link> */}
                                    </>
                                )}
                                
                            </form>
                           
                        </div>
                    </div>
                </div>
           </div>

        </>
    )
    
}

export default InfoUser;