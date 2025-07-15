import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export const useGamesID = () => {

    const {id} = useParams();
    const [gameID, setGameID] = useState([]);
    const [localGameData, setLocalGameData] = useState(null);
    const API_KEY = '23f40d29a50a413f81b29e506ab0e968'

    useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = await res.json();
        setGameID(data);
      } catch (error) {
        console.log('Error al traer la info del juego', error);
        setGameID([]);
      }
    };

    const fetchLocalGame = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/games/${id}`);
        if (res.ok) {
          const data = await res.json();
          setLocalGameData(data.games);
        }
      } catch (error) {
        console.log('Error al traer datos locales del juego', error);
      }
    };

    fetchApi();
    fetchLocalGame();
  }, [id]);

    // Combinar datos de la API externa con datos locales usando useMemo
    const gameWithLocalData = useMemo(() => ({
        ...gameID,
        comment: localGameData?.comment || "",
        state: localGameData?.state || "Pendiente",

    }), [gameID, localGameData]);

    return {gameID: gameWithLocalData};
}