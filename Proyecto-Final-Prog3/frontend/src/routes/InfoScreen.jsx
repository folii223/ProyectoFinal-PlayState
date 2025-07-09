import {useGamesID} from '../hooks/useGamesID'
import { NavBar } from '../components/layout/NavBar';

export const InfoScreen = () => {


    const {gameID} = useGamesID()

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
                            <form action="">
                                <h4 className='state__title'>Estado del juego</h4>
                                <div className='state'>
                                    <div className='pending__cb'>
                                        <span>Pendiente</span>
                                        <input type="checkbox" name="pendiente" id="pendiente"  defaultChecked/>
                                    </div>
                                    <div className='initiated__cb'>
                                        <span>Iniciado</span>
                                        <input type="checkbox" name="iniciado" id="iniciado"/>
                                    </div>
                                    <div className='complete__cb'>
                                        <span>Completado</span>
                                        <input type="checkbox" name="completado" id="completado"/>
                                    </div>
                                </div>
                                <div className='hours_played'>
                                    <h4>Registrar horas:</h4>
                                    <input type="text" placeholder='00:00' />
                                    <button type="submit">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                    
            } 
        </>
    )
}
