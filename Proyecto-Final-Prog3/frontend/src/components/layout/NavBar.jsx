import { Link, NavLink } from "react-router-dom"
import logo from '../../assets/icons/joystick.png'

export const NavBar = () => {
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
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categorias
                    </a>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" href="#">Action</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">Shooter</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">Puzzle</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">RPG</NavLink></li>
                        <li><NavLink className="dropdown-item" href="#">Adventure</NavLink></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/login" className="nav-link" >Iniciar Sesion</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/register" className="nav-link" >Registrarse</NavLink>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    </>
)};
