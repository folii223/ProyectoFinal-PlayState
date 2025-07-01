import { useSearchParams, useNavigate, NavLink } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

export const GetResultsComponent = () => {
  
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const genre = searchParams.get("genre");
    const { games, loading } = useSearch(query, genre);
    const navigate = useNavigate();

    const handleClick = (id) => navigate(`/info/${id}`);

    return (
        <div className="game__container">
        <h1 className="game__title">{query ? `Resultados para ${query}` : genre? `Resultados para ${genre}` : 'Busqueda'}</h1>
        {loading ? (
            <p>Cargando datos...</p>
        ) : games.length > 0 ? (
            <ul className="game">
            {games.map((game) => (
                <li className="game__li" key={game.id} onClick={() => handleClick(game.id)}>
                <NavLink to={`/info/${game.id}`}>
                    <div className="game__info">
                    <img className="game__img" src={game.background_image} alt={game.name} />
                    <h4 className="game__name">{game.name}</h4>
                    </div>
                </NavLink>
                <div className="action__container">
                    <button className="btn"><i className="fa-solid fa-star"></i></button>
                    <button className="btn"><i className="fa-regular fa-bookmark"></i></button>
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
