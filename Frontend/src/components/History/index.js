import './style.scss';
import { useEffect, useState } from "react";
import gameService from "../../service/client/game.service";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/src/sweetalert2.js'

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


    const handleDetail = async(e) => {        
        const tdValues = Array.from(e.currentTarget.querySelectorAll('td')).map(td => td.innerText);

        const getIteam = await gameService.getItemDetail(tdValues[0])
        console.log("getIteam.solvedBoard", getIteam);
        let solvedBoardHTML = "<div><strong>Solved Board:</strong><ul>";
        getIteam.solvedBoard.forEach((item, index) => {
            // Kiểm tra xem item có thuộc tính player hay không để hiển thị thông tin tương ứng
            if (item.player) {
                solvedBoardHTML += `<li> <strong> Player: ${item.player} </strong>
                                        <ul>
                                            <li>
                                                Stones Removed: ${item.stonesRemoved}
                                            </li>
                                            <li>
                                                Row Index: ${item.rowIndex}
                                            </li>
                                        </ul>
                                    </li>`;
            } else {
                solvedBoardHTML += `<li> <strong> Player: ${item.playerTurn} </strong>
                                        <ul>
                                            <li>
                                                Stones Removed: ${item.stonesRemoved}
                                            </li>
                                            <li>
                                                Row Index: ${item.rowIndex}
                                            </li>
                                        </ul>
                                    </li>`;
            }
        });
        solvedBoardHTML += "</ul></div>";

        Swal.fire({
            title: "GAME DETAILS",
            html: `
            <div style="color:black; width:500px; text-align: left">
            <p><strong>Version:</strong> ${getIteam.version}</p>
                <p><strong>Game Mode:</strong> ${getIteam.gameMode}</p>
                <p><strong>Player 1:</strong> ${getIteam.player1}</p>
                <p><strong>Player 2:</strong> ${getIteam.player2}</p>
                <p><strong>Current Board:</strong> ${getIteam.initialBoard.join(', ')}</p>
                <p><strong>Turn:</strong> ${getIteam.turn}</p>
                <p><strong>Winner:</strong> ${getIteam.winner}</p>
                ${solvedBoardHTML} 
            </div>
        `,
            width:500,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, []);


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
                                <th >Version</th>
                                <th >Game mode</th>
                                <th>Player 1</th>
                                <th>Player 2</th>
                                <th>Board</th>
                                <th>Winner</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getData.map((item, index) => (
                                <tr onClick={handleDetail} key={index} className="history-item" data-toggle="modal" data-target="#exampleModalCenter">
                                    <th scope="row">{index + 1}</th>
                                    <td style={{display: "none" }}>{item._id}</td>
                                    <td>{item.version}</td>
                                    <td>{item.gameMode}</td>
                                    <td>{item.player1}</td>
                                    <td>{item.player2}</td>
                                    <td>{item.initialBoard.join(', ')}</td>
                                    <td>{item.winner}</td>
                                    <td>{item.createAt}</td>
                                </tr>                                
                            ))}                        
                        </tbody>
                    </table>        
                </div> 

                <div className='btn-play'>
                    <Link className='' to={`/home`}>Play</Link>
                </div>        
            </div>
        </>
                   
    )
}

export default History;
