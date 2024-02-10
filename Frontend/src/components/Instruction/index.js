import { Link } from 'react-router-dom';
import './style.scss'
function Intruction() {

    const piles = [];
    for (let i = 1; i <= 6; i++) {
        piles.push(i);
    }

    return (
        <>
            <div className='container instruction'>
                
                <div className='box-instruction'>
                    <h2>INSTRUCTION</h2>

                    <div className='box-contain'>
                        <div className='box-left'>
                            <div className="nim-history">
                                <h4>Nim History</h4>
                                <p>Nim is a simple combinatory game with finite possibilities. <br/>
                                    But unlike tic-tac-toe, that other game of limited possibilities,<br/> 
                                    there is tremendous variety in both Nim's conception and <br/>implementation. 
                                    The theory of the Nim game was discovered <br/>by mathematics professor Charles 
                                    Bouton at Harvard University <br/>in 1901. In fact, Bouton, who wanted to use 
                                    the game to <br/> demonstrate the advantage of the binary number system,<br/> found a 
                                    simple formula, with which, from the state of play, <br/>players can determine 
                                    correct moves immediately.
                                </p>
                            </div>
                            <div className="how-to-play">
                                <h4>How To Play</h4>
                                <p>Nim is a mathematical game of strategy in which two players <br/>take turns removing
                                    (or "nimming") objects from distinct <br/>heaps or piles. On each turn, a player must
                                    remove at least one<br/> object, and may remove any number of objects provided <br/>they 
                                    all come from the same heap or pile. Depending on<br/> the version being played, the
                                    goal of the game is either to avoid <br/>taking the last object or to take the last
                                    object. <strong> Two Version</strong>
                                    </p>
                            </div>
                        </div>

                        <div className='box-right'>
                            {piles.map((value, index) => (
                            <div key={index} className={`col-${value}`}>
                                {[...Array(value)].map((_, subIndex) => (
                                    <span key={subIndex}></span>
                                ))}
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className='row normal-game'>
                        <p className='version normal-game'>
                        <strong> ••• Normal Game: </strong>Players take turns taking any number
                            of stones from one of the piles. Whoever takes the last of the stones wins!
                        </p>
                    </div>
                    <div className='row misere-game'>
                        <p className='version misere-game'>
                        <strong> ••• Misère Game: </strong> Players take turns taking any number
                            of stones from one of the piles. Whoever takes the last of the stones loses.
                        </p>
                    </div>
                </div>  
                <div className='btn-play'>
                    <Link className='' to={`/home`}>Play</Link>
                </div>              
            </div>
            
        </>
    )
}

export default Intruction;