import { NavLink, useNavigate } from "react-router-dom";
import { useGames } from "../../hooks/useGames"

export const GetGamesComponent = () => {

    const {games, loading} = useGames();
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/info/${id}`);
    };

    return (
        <>
        <div className="game__container">
            <h1 className="game__title">LISTA DE VIDEOJUEGOS</h1>
            {loading ? (
                <p>Cargando datos...</p>
            ) : games.length > 0 ? (
                <ul className="game">
                    {games.map((game) =>(
                        <> 
                        
                            <li className="game__li"> 
                                <NavLink to={`/info/${game.id}`}>
                                    <div className="game__info"> 
                                    <img  key={game.id} onClick={() => handleClick(game.id)} className="game__img" src={`${game.background_image}`}  alt={`${game.name}`} />
                                        <h4 className="game__name">{game.name}</h4>
                                    </div>
                                </NavLink>
                                    <div className="action__container">
                                        <button className="btn"  alt='Añadir a favoritos'><i className="fa-solid fa-star"></i></button>
                                        <button className="btn"  alt='Añadir a la biblioteca'><i className="fa-regular fa-bookmark"></i></button>
                                    </div>
                            </li>
                        
                        </>
                        
                    ))}
                </ul>
                ):(
                <p>No se encontraron resultados</p>
            )}
        </div>
            
        </>
    )
    
}
