import {  useNavigate } from "react-router-dom";
import NimTwoPlayer from "../../components/TwoPlayer/index"
import { useSelector } from "react-redux";
import { useEffect } from "react";


function TwoPlayer(){

    const navigate = useNavigate();
    const player1 = useSelector((state) => state.NimGame.player1);
    const player2 = useSelector((state) => state.NimGame.player2);

    useEffect(() => {
        if(!(player1 && player2)){
            navigate('/');
        }
    }, [player1  && player2])
    return ( 
        <>
            {(player1 && player2) && <NimTwoPlayer/>}
            
        </>
    )
    
}

export default TwoPlayer;