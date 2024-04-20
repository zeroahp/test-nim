import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import "./style.scss"
import { setGameMode } from '../../redux/nimSlice';
import { useDispatch, useSelector } from 'react-redux';

function GameMode(){

    const dispatch = useDispatch();
    

    const handleGameMode = (e) => {
        const gameMode = e.target;
        const gameModeValue = gameMode.classList.value;
        dispatch(setGameMode(gameModeValue))
    }
    const version = useSelector((state) => state.NimGame.version);
    console.log(version);

    return ( 
        <>
           <div className="container gameMode">
                <div className="gameMode">
                        <div className="gameMode__title">
                            NIM
                        </div>
                    <div className="row">
                        <div className="gameMode__box">

                            <div className="box two_player">
                                <Link className='twoPlayer' onClick={handleGameMode} to={`/info-user`}>Two Player</Link>
                            </div>
                            <div className="box play_vs_bot">
                                <Link className='playwithBot' onClick={handleGameMode} to={`/info-user`}>Play vs Bot</Link>
                            </div>
                        </div>
                    </div>
                </div>
           </div>

        </>
    )
    
}

export default GameMode;