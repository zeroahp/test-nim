import './style.scss';
import { useEffect, useState } from "react";
import gameService from "../../service/client/game.service";
import { Link } from 'react-router-dom';

function History() {
    const [getData, setGetData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await gameService.getData();
            setGetData(response);
        } catch (error) {
            console.error('ERROR OCCURRED:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(getData); 

    return (
        <>
            <div className='history-title'>
                <h4>HISTORY</h4>
            </div>
            <div className='container history'>
            
            <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                <table className="table table-striped table-dark"  > 
                    <thead>
                        <tr>
                            <th>No</th>
                            <th >Game mode</th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Board</th>
                            <th>Turn</th>
                            <th>Winner</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData.map((item, index) => (
                            <tr key={index} className="history-item">
                                <th scope="row">{index + 1}</th>
                                <td>{item.gameMode}</td>
                                <td>{item.player1}</td>
                                <td>{item.player2}</td>
                                <td>{item.currentBoard.join(', ')}</td>
                                <td>{item.turn}</td>
                                <td>{item.winner}</td>
                                <td>{item.createAt}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
                <div className='btn-play'>
                    <Link className='' to={`/home`}>Play</Link>
                </div>   
            </div>     
                     
        </div>
        </>
                   
    )
}

export default History;
