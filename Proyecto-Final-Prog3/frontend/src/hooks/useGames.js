import { useState, useEffect } from "react";

export const useGames = () => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_KEY = '23f40d29a50a413f81b29e506ab0e968'

    const fetchApi = async () => {
        try {
            const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
            const data = await res.json();
            console.log(data); //En consola aparecen varios atributos, colocar el que dice results para que te traiga los juegos
            setGames(data.results);//trae 20 juegos
            setLoading(true);

        } catch (error) {
            console.log('Error al traer los juegos',error);
            setGames([]);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
      fetchApi()
    }, [])


    return {games, loading};
}
