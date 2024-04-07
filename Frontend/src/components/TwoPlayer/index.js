import Board from "../Board/index"
import "./style.scss"
import user1 from "../../asset/images/1.png"
import user2 from "../../asset/images/2.png"
// import computer from "../../asset/images/3.png"
import {  useSelector } from "react-redux"
import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"
import Swal from 'sweetalert2/src/sweetalert2.js'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TwoPlayer(){
    
    const userName1 = useSelector((state) => state.NimGame.player1);
    const userName2 = useSelector((state) => state.NimGame.player2);
    // const playerRandom = useSelector((state) => state.NimGame.turn);
    const currentPlayer = useSelector((state) => state.NimGame.currentplayer);
    const navigate = useNavigate();
    console.log("currentPlayer 2", currentPlayer);

    useEffect(() => {
        const activeOne = document.querySelector(".col-2 .user1");
        const activeTwo = document.querySelector(".col-2 .user2");
    
        if (currentPlayer === userName1) {
            activeOne.classList.add("active");
            activeTwo.classList.remove("active");
        } 
        else if(currentPlayer === userName2){
            activeOne.classList.remove("active");
            activeTwo.classList.add("active");
        }
    }, [currentPlayer]);


    const handleBack = () => {
        Swal.fire({
            title: "Exit game?",
            text: "Exit before the game ends will not save the result!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!"
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // Người dùng nhấn vào nút "No!"
                return;
            }else{
                navigate("/home")
            }
        });
    }
    return (
        <>
            <div className="container twoPlayer">

                <div className="twoPlayer-menu">
                    <div className="one">
                        <p className="btn-back" onClick={handleBack} >
                            Exit
                        </p>
                        
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <div class="dropdown-content">
                            <Link className='back-home'  to={`/home`}>Home</Link>
                            <Link className='back-instruction'  to={`/instruction`}>Instruction</Link>
                            <Link className='back-home'  to={`/game-mode`}>Game Mode</Link>
                        </div>
                    </div>
                </div>
                <div className="row two">
                    
                    <div className="col-2 user">
                        <img src={user1} alt="User 1"/>
                        <div className="info-user user1">
                            <span className="userName">{userName1}</span>
                        </div>
                    </div>

                    <div className="col-8">
                        <Board />
                    </div>

                    <div className="col-2 user">
                        <img src={user2} alt="User 2"/>
                        <div className="info-user user2">
                            <span className="userName">{userName2}</span>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    )
    
}

export default TwoPlayer;