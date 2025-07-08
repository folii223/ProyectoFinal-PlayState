import { useSearchParams, NavLink } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

export const GetResultsComponent = () => {
  
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const genre = searchParams.get("genre");
    const { games, loading } = useSearch(query, genre);


    const handleSaveGame = async (game) => {
        const res = await fetch('http://localhost:3001/api/games' , {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: game.id,
                title: game.name,
                image: game.background_image,
                genres: game.genres.map(g => g.name).join(','),
                hoursplayed: game.playtime
            })
        })

        const data = await res.json();
        alert(data.message);
    }

    return (
        <div className="game__container">
        <h1 className="game__title">{query ? `Resultados para ${query}` : genre? `Resultados para ${genre}` : 'Busqueda'}</h1>
        {loading ? (
            <p>Cargando datos...</p>
        ) : games.length > 0 ? (
            <ul className="game">
            {games.map((game) => (
                <li className="game__li">
                <NavLink to={`/info/${game.id}`}>
                    <div className="game__info">
                    <img key={game.id} className="game__img" src={game.background_image} alt={game.name} />
                    <h4 className="game__name">{game.name}</h4>
                    </div>
                </NavLink>
                <div className="action__container">
                    <button onClick={() => handleSaveGame(game)} className="btn"><i className="fa-solid fa-bookmark"></i></button>
                </div>
                </li>
            ))}
            </ul>
        ) : (
            <p>No se encontraron resultados.</p>
        )}
        </div>
    );
};
