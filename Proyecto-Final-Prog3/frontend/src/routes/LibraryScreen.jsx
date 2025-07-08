import {NavBar} from '../components/layout/NavBar'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const LibraryScreen = () => {
  
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const handleClick = (id) => {
      navigate(`/info/${id}`);
      };

  useEffect(() =>{
    const fetchLibrary = async () => {

    
    try{
      const res = await fetch ('http://localhost:3001/api/games')
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
        
        

        <NavBar />
      <div className="gamecontainer">
        <h1>Biblioteca</h1>
        {loading ? (
          <p>Cargando biblioteca...</p>
        ) : games.length > 0 ? (
          <ul className="game">
            {games.map((game) => (
              <li key={game.id} className="game__li">
                <div className="game__info">
                  <img
                    className="game__img"
                    src={game.image}
                    alt={game.title}
                  />
                  <h4 className="game__name">{game.title}</h4>
                </div>
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


