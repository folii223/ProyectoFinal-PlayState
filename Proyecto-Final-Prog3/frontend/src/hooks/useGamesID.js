import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const useGamesID = () => {

    const {id} = useParams();
    const [gameID, setGameID] = useState([]);
    const API_KEY = '23f40d29a50a413f81b29e506ab0e968'

    useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        setGameID(data);
      } catch (error) {
        console.log('Error al traer la info del juego', error);
        setGameID([]);
      }
    };

    fetchApi();
  }, [id]);

    return {gameID};
}