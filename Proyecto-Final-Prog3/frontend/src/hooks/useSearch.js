import { useEffect, useState } from 'react'

export const useSearch = (query, genre) => {
  
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_KEY = '23f40d29a50a413f81b29e506ab0e968';

    useEffect(() => {
        const fetchSearch = async () => {
        
            //Si no existe en la busqueda...
            if (!query && !genre) return;
            setLoading(true);

            try {
                let URLbase = `https://api.rawg.io/api/games?key=${API_KEY}`
                if(query) URLbase += `&search=${encodeURIComponent(query)}`;
                if(genre) URLbase += `&genres=${encodeURIComponent(genre)}`;

                const res = await fetch(URLbase);
                const data = await res.json();
                setGames(data.results);
            }
            catch (error) {
                console.error ("Error al buscar", error);
                setGames([]);
            }
            finally {
                setLoading(false)
            }
        };

        //Por cada busqueda el useEffect vuelve a lanzar el query
        fetchSearch();
        }, [query, genre]);

        return {games, loading};
};



