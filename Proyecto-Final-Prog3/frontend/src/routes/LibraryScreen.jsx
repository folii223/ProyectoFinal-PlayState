import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const LibraryScreen = () => {
  
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleDeleteGame = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/games/${id}`, {
        method: 'DELETE',
        });
      if (res.ok) {
      setGames(games.filter(game => game.id !== id));
      console.log('Juego eliminado correctamente');
      }
      else {
      console.error("Error al eliminar el juego")
      }
    }
    catch(error) {
      console.error("Error al eliminar juego", error);
    }
  };

  useEffect(() =>{
    const fetchLibrary = async () => {
    try{
      const res = await fetch ('http://localhost:3001/api/games');
      const data = await res.json();
      setGames(data.games)
      console.log(data)
    }catch(error){
      console.log('Error al cargar', error);
      console.error('Error al cargar la biblioteca',error);
    }finally{
      setLoading(false);
    }
  };
  fetchLibrary();
  },[]);

  return (
    <>
      <div className="library__container">
        <h1 className='library__title'>Biblioteca</h1>
        <div className='lineCut'></div>
        {loading ? (
          <p>Cargando biblioteca...</p>
        ) : games.length > 0 ? (
          <ul className="game">
            {games.map((game) => (
              <li key={game.id} className="game__li">
                <NavLink to={`/info/${game.id}`}>
                  <div className="game__info">
                    <img 
                      className="game__img"
                      src={game.image}
                      alt={game.title}
                    />
                    <h4 className="game__name">{game.title}</h4>
                  </div>
                </NavLink>
                <div className="action__container">
                    <input className='input__state--disabled' type="text" value={game.state} disabled />
                    <input className='input__hours--disabled' type="text" value={`${game.hoursplayed} hs`} disabled />
                </div>
                <button onClick={() => handleDeleteGame(game.id)} className="delete__btn"><i className="fa-solid fa-trash"></i></button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tenés juegos guardados en la biblioteca.</p>
        )}
      </div>
    </>
  )
}


