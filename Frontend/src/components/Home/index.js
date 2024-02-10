import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import "./style.scss"
import { setVersion } from '../../redux/nimSlice';
import { useDispatch } from 'react-redux';

function Home(){

    const dispatch = useDispatch();

    const handleVersion= async(e) => {
        const version = e.target;
        const gameVersion = version.classList.value;
        console.log("gameVersion", gameVersion);
        
        await dispatch(setVersion(gameVersion))
    }

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
                        <div className="home__box">
                            {/* <div className="box two_player">
                                <Link className='twoPlayer' onClick={handleGameMode} to={`/info-user`}>Two Player</Link>
                            </div>
                            <div className="box play_vs_bot">
                                <Link className='playwithBot' onClick={handleGameMode} to={`/info-user`}>Play vs Bot</Link>
                            </div> */}
                            <div className="box normal-game">
                                <Link className='normal-game' onClick={handleVersion} to={`/game-mode`}>Normal Game</Link>
                            </div>
                            <div className="box misere-game">
                                <Link className='misere-game' onClick={handleVersion} to={`/game-mode`}>Misère game</Link>
                            </div>
                            <div className="box instruction">
                                <Link className='instruction' to={`/instruction`}>Instruction</Link>
                            </div>
                            <div className="box history">
                                <Link className='' to={`/history`}>History</Link>
                            </div>
                        </div>
                    </div>
                </div> 
           </div>

        </>
    )
    
}

export default Home;