import NimPlayVsBot from "../../components/PlayVsBot/index"
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PlayVsBot(){
    const navigate = useNavigate();
    const player1 = useSelector((state) => state.NimGame.player1);
    useEffect(() => {
        if(!(player1)){
            navigate('/');
        }
    }, [player1])
    return ( 
        <>
           {player1 &&<NimPlayVsBot />}
        </>
    )
}

export default PlayVsBot;