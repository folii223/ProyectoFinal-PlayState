import {useGamesID} from '../hooks/useGamesID'
import { useEffect, useState } from 'react';

export const InfoScreen = () => {

    const {gameID} = useGamesID()
    const [state, setState] = useState("");
    const [save, setSave] = useState(false);
    const [hours, setHours] = useState(0);
    const [comment, setComment] = useState("");
    const [isEditingComment, setIsEditingComment] = useState(false);


    const handleSubmit = async(e)=> {
        e.preventDefault();
        await updateState(gameID.id);
    }

    const inputChange = async (e) => {
        const value = e.target.value;
        setState(value);
        
        if (value === "Pendiente") {
            setHours(0);
        }else if (value === "Completado"){
            setHours(gameID.playtime);
        }
    
    }

    //Actualizar el estado
    const updateState = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/api/games/${id}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    state: state,
                    hoursplayed: hours
                })
            })
            const data = await res.json();
            console.log("Estado modificado correctamente", data);
            alert(data.message)
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            alert("Error al actualizar el estado");
        }  
    }

    const inputHoursChange = (e) => {
        if (state === "Iniciado"){
            const valueHours = parseInt(e.target.value) || 0;
            setHours(valueHours)
        }
    }

    

    const handleCommentSubmit = async(e) => {
        e.preventDefault();
        if(comment.trim()) {
            await saveComment(gameID.id);
        }
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleEditComment = () => {
        setIsEditingComment(true);
    }

    //Guardar el comentario
    const saveComment = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/api/games/${id}/comment`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    comment: comment
                })
            })
            const data = await res.json();
            console.log("Comentario guardado correctamente", data);
            alert(data.message);
            setIsEditingComment(false); // Cambiar a modo solo lectura
        } catch (error) {
            console.error("Error al guardar comentario:", error);
            alert("Error al guardar el comentario");
        }
    }

    //Use effect para comentarios y registro de estado/horas
    useEffect(() => {
        if(gameID && gameID.state){
            setState(gameID.state)
        }
        
        if(gameID && gameID.comment && gameID.comment.trim() !== ""){
            setComment(gameID.comment)
            setIsEditingComment(false); // Si ya hay comentario, mostrar en modo solo lectura
        } else {
            setIsEditingComment(true); // Si no hay comentario, mostrar en modo edición
        }

        const ckeckGameSaved = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/games/${gameID.id}`)
                if(res.ok){
                    await res.json();
                    setSave(true);
                }
                else {
                    setSave(false)
                }
            }
            catch (error){
                console.log("Error al hacer la consulta a la base de datos", error);
                setSave(false);
            }
        }
        if(gameID.id){
            ckeckGameSaved();
        }

    }, [gameID]);
    
    return (
        <>
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
                    {save && (
                        <div className='register__container'>
                        
                            <div className='comment__container'>
                                <h4 className='comment__title'>Calificar</h4>
                                
                                {isEditingComment ? (
                                    // Modo edición: mostrar textarea y formulario
                                    <form className='comment' onSubmit={handleCommentSubmit}>
                                        <textarea 
                                            className='comment__text' 
                                            name="comment" 
                                            id="comment" 
                                            placeholder='¿Que te parecio este juego?'
                                            value={comment}
                                            onChange={handleCommentChange}
                                        ></textarea>
                                        <div className='comment__btn'>
                                            <button className='btn__submit' type="submit"><i className="fa-solid fa-paper-plane"></i></button>
                                        </div>
                                    </form>
                                ) : (
                                    // Modo solo lectura: mostrar texto fijo y botón de editar
                                    <>
                                        <div className='comment__display'>
                                            <p className='comment__text--readonly'>{comment || "No hay comentario"}</p>
                                        </div>
                                        <div className='comment__btn'>
                                            <button className='btn__edit' type="button" onClick={handleEditComment}><i className="fa-solid fa-pen"></i></button>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className='state__container'>
                                <form className='form__state' onSubmit={handleSubmit} method='PUT'>
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
                                        <input className='input__hour' type="text" placeholder='00:00' value={hours} onChange={inputHoursChange}/>
                                    </div> 
                                    <button className='submit__state' type="submit">Registrar</button>
                                </form>
                            </div>
                        </div>
                    )}
                    
                </div>
                    
            } 
        </>
    )
}
