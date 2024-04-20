import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const requireInforMiddleware = () => (nextState, replace) => {
    const player1 = useSelector((state) => state.NimGame.player1);
    const player2 = useSelector((state) => state.NimGame.player2);

    if(!(player1 && player2)){
        replace('/info-user');
    } else return nextState;
};