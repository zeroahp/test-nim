import { useEffect } from "react";
import NimGameMode from "../../components/GameMode/index";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function GameMode(){
    const version = useSelector((state) => state.NimGame.version);
    const navigate = useNavigate();
    useEffect(() => {
        if(!(version)){
            navigate('/');
        }
    }, [version])
    return ( 
        <>
            {(version)  && <NimGameMode />}
        </>
    )
}

export default GameMode;