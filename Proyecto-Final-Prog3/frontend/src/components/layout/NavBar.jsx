import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../assets/icons/joystick.png'
import { useState} from "react";


export const NavBar = () => {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
        navigate(`/search?query=${encodeURIComponent(search)}`);
        setSearch('');
        }
    };
   
    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link><img className="navbar__logo" src={logo} alt="logo"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to='/library' className="nav-link">Biblioteca</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categorias
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li><NavLink to='/search?genre=action' className="dropdown-item">Accion</NavLink></li>
                        <li><NavLink to='/search?genre=shooter' className="dropdown-item">Disparos</NavLink></li>
                        <li><NavLink to='/search?genre=puzzle' className="dropdown-item">Rompecabezas</NavLink></li>
                        <li><NavLink to='/search?genre=role-playing-games-rpg'className="dropdown-item">RPG</NavLink></li>
                        <li><NavLink to='/search?genre=adventure' className="dropdown-item">Aventuras</NavLink></li>
                        <li><NavLink to='/search?genre=sports' className="dropdown-item">Deportes</NavLink></li>
                        <li><NavLink to='/search?genre=indie' className="dropdown-item">Indie</NavLink></li>
                        <li><NavLink to='/search?genre=strategy' className="dropdown-item">Estrategia</NavLink></li>
                    </ul>
                    </li>
                </ul>
                <form onSubmit={handleSubmit} className="d-flex" role="search">
                    <input onChange={handleInputChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    </>
)};
