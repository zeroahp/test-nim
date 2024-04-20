import Layout from '../components/Layout/index.js'
import Home from '../pages/Home'  
import TwoPlayer from '../pages/TwoPlayer'  
import PlayVsBot from '../pages/PlayVsBot'  
import History from '../pages/History'  
import Instruction from '../pages/Instruction'  
import Info from '../pages/InfoUser'  
import GameMode from '../pages/GameMode'  
import SaveGame from '../pages/SaveGame'  
import { Navigate } from 'react-router-dom'

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "info-user",
        element: <Info />,
      },
      {
        path: "two-player",
        element: <TwoPlayer />,
      },
      {
        path: "game-mode",
        element: <GameMode />,
      },
      {
        path: "saved-game",
        element: <SaveGame />,
      },
      
      
      {
        path: "playvsbot",
        element: <PlayVsBot />
      },
      {
        path: "instruction",
        element: <Instruction />
      },
      {
        path: "history",
        element: <History />
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
]