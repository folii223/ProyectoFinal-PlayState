import {useGamesID} from '../../hooks/useGamesID'
import { NavBar } from '../layout/NavBar';

export const InfoScreen = () => {


    const {gameID} = useGamesID()

    return (
        <>

            <NavBar></NavBar>
            {
                <div className='info__container'>
                    <div className='info__principal'>
                        <h1 className='info__title'>{gameID.name}</h1>
                        <p className='info__descrip'>{gameID.description_raw}</p>
                        <img className='info__img' src={`${gameID.background_image}`} alt={`${gameID.name}`} /> 
                    </div>
                    <div className='info__adicional'>
                            <span className='info__released'><strong>Fecha de lanzamiento:</strong> {gameID.released}</span>
                            <span className='info__genre'><strong>Género:</strong> {gameID.genres?.map((g) => g.name).join(', ')}</span>
                            <span><strong>Rating: </strong>{gameID.rating}</span>
                            <div className='info__rating'>
                                <button className='btn'><i className="fa-regular fa-thumbs-up"></i></button>
                                <button className='btn'><i className="fa-regular fa-thumbs-down"></i></button>
                                <button className='btn'><i className="fa-solid fa-star"></i></button>
                                <button className='btn'><i className="fa-regular fa-bookmark"></i></button>
                            </div>
                    </div>
                    
                    {gameID.platforms?.[0] && (
                        <>
                            <h4 className='req__title'>Requisitos</h4>
                            <div className='req'>     
                                <span><strong>Plataforma:</strong> {gameID.platforms[0].platform.name}</span>
                                <p className='req__min'>{gameID.platforms[0].requirements.minimum}</p>
                                <p className='req__rec'>{gameID.platforms[0].requirements.recommended}</p>   
                            </div>
                        </>
                        
                    ) 
                    }
                </div>
            } 
        </>
    )
}
