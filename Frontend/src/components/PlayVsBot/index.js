import Board from "../Board/index"
import SavedBoard from "../SaveBoard/index"
import "./style.scss"
import user1 from "../../asset/images/1.png"
import bot from "../../asset/images/3.png"
import {  useSelector } from "react-redux"
import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"
import Swal from 'sweetalert2/src/sweetalert2.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function TwoPlayer(){
    
    const userName1 = useSelector((state) => state.NimGame.player1);
    const userName2 = useSelector((state) => state.NimGame.player2);
    const savedBoard = useSelector((state) => state.NimGame.savedIdBoard);
    console.log("saveboar", savedBoard);
    const currentPlayer = useSelector((state) => state.NimGame.currentplayer);
    const version = useSelector((state) => state.NimGame.version);
    const navigate = useNavigate();

    useEffect(() => {
        const activeOne = document.querySelector(".col-2 .user1");
        const activeTwo = document.querySelector(".col-2 .user2");
    
        if (currentPlayer === userName1) {
            activeOne.classList.add("active");
            activeTwo.classList.remove("active");
        } 
        else if(currentPlayer === userName2){//chua xong
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
            <div className="container playvsBot">
            
                <div className="playvsBot-menu">
                    <div className="one">
                        <p className="btn-back" onClick={handleBack} >
                            Exit
                        </p>
                        
                    </div>
                    <div className="version-game">
                        {version}
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

                    {savedBoard ? 
                    (
                    <div className="col-8">
                        <SavedBoard />
                    </div>
                    )
                    :
                    (<div className="col-8">
                        <Board />
                    </div>)
                    }
                    

                    <div className="col-2 user">
                        <img src={bot} alt="User 2"/>
                        <div className="info-user user2">
                            <span className="userName">Bot</span>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    )
    
}

export default TwoPlayer;