import {useGamesID} from '../hooks/useGamesID'
import { NavBar } from '../components/layout/NavBar';
import { useEffect, useState } from 'react';

export const InfoScreen = () => {


    const {gameID} = useGamesID()
    const [state, setState] = useState(()=>{
        return localStorage.getItem("Seleccionado") || "Pendiente";
    });

    const handleSubmit = async(e)=> {
        e.preventDefault();
        await updateState(gameID.id);
    }

    const inputChange = async (e) => {
        const value = e.target.value;
        setState(value);
        localStorage.setItem("Seleccionado",value);
    }

    const updateState = async (id) => {
        const res = await fetch(`http://localhost:3001/api/games/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                state: state
            })
        })
        const data = await res.json();
        console.log("Estado modificado correctamente", data);
    }

    useEffect(() => {
        console.log("gameID cargado:", gameID);
        if(gameID && gameID.state){
            setState(gameID.state)
        }
    }, [gameID]);
    


    return (
        <>

            <NavBar></NavBar>
            {
                <div className='info__container'>
                    <div className='info__principal'>
                        <h1 className='info__title'>{gameID.name}</h1>
                        
                        <img className='info__img' src={`${gameID.background_image}`} alt={`${gameID.name}`} /> 
                        <div className='info__descrip__container'>
                            <p className='info__descrip'>{gameID.description_raw}</p>
                            <div className='info__adicional'>
                                <span className='info__released'><strong>📆</strong> {gameID.released}</span>
                                <span className='info__genre'><strong>⚡</strong> {gameID.genres?.map((g) => g.name).join(', ')}</span>
                                <span><strong>⭐</strong>{gameID.rating}</span>
                            </div>
                        </div>
                    </div>
                    
                    
                    {gameID.platforms?.[0] && (
                        <>
                            <h4 className='platform__title'>Disponible en:</h4> 
                                <ul className='platform'>
                                    <li>{gameID.platforms.some( p=> ["PC", "macOS"].includes(p.platform.name)) && <i className="fa-solid fa-desktop"></i>}</li>
                                    <li>{gameID.platforms.some(p => ["PlayStation 5", "PlayStation 4", "PlayStation 3"].includes(p.platform.name)) && <i className="fa-brands fa-playstation"></i>}</li>
                                    <li>{gameID.platforms.some(p => ["Xbox Series S/X", "Xbox One" , "Xbox 360"].includes(p.platform.name)) && <i className="fa-brands fa-xbox"></i>}</li>
                                    <li>{gameID.platforms.some(p => ["Nintendo Switch"].includes(p.platform.name) && <i className="fa-solid fa-toggle-off"></i>)}</li>
                                </ul>   
                        </>
                        
                    ) 
                    }
                
                        <div className='register__container'>
                        
                        <div className='comment__container'>
                            <form className='comment' action="#">
                                <h4 className='comment__title'>Calificar</h4>
                                <textarea className='comment__text' name="comment" id="comment" placeholder='¿Que te parecio este juego?'></textarea>
                                <div className='comment__btn'>
                                    <button className='btn__submit'><i className="fa-solid fa-paper-plane"></i></button>
                                    <button className='btn__edit'><i className="fa-solid fa-pen"></i></button>
                                </div>
                            </form>
                        </div>

                        <div className='state__container'>
                            <form onSubmit={handleSubmit} method='PUT'>
                                <h4 className='state__title'>Estado del juego</h4>
                                <div className='state'>
                                
                                    <div className='select__state'>
                                        <input className='input__state' type="radio" name="option" id="pending" value={'Pendiente'} onChange={inputChange} checked={state === "Pendiente"}/>
                                        <label className='lbl__input' htmlFor="pending">Pendiente</label>
                                    </div>
                                    <div className='select__state'>    
                                        <input className='input__state' type="radio" name="option" id="initiated" value={'Iniciado'} onChange={inputChange} checked={state === "Iniciado"}/>
                                        <label className='lbl__input' htmlFor="initiated">Iniciado</label>
                                    </div>  
                                    <div className='select__state'> 
                                        <input className='input__state' type="radio" name="option" id="completed" value={'Completado'} onChange={inputChange} checked={state === "Completado"} />
                                        <label className='lbl__input' htmlFor="completed">Completado</label>
                                    </div> 
                                </div>
                                <div className='hours__register'>
                                    <h4>Registrar horas:</h4>
                                    <input className='input__hour' type="text" placeholder='00:00' />
                                </div> 
                                <button className='submit__state' type="submit">Registrar</button>
                            </form>
                        </div>
                    </div>
                    
                    
                </div>
                    
            } 
        </>
    )
}
