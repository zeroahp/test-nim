import { useEffect } from "react";
import NimInfoUser from "../../components/InfoUser/index"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function InfoUser(){

    const navigate = useNavigate();
    const gameMode = useSelector((state) => state.NimGame.gameMode);   

    useEffect(() => {
        if(!(gameMode)){
            navigate('/');
        }
    }, [gameMode])

    return ( 
        <>
           {gameMode && <NimInfoUser />}
        </>
    )
    
}

export default InfoUser;