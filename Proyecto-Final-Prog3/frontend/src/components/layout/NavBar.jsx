import { Link, NavLink } from "react-router-dom"
import logo from '../../assets/icons/joystick.png'

export const NavBar = () => {
  return (
    <>
        <div className="navbar__container">
            <Link><img className="navbar__logo" src={logo} alt="logo"/></Link>
            <ul className="navbar__list">
                <li className='navbar__item'>
                    <NavLink to='/' className='nav-link'>Inicio</NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink to='/library' className='nav-link'>Biblioteca</NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink to='/login' className='nav-link'>Iniciar Sesion</NavLink>
                </li>
                <li className='navbar__item'>
                    <NavLink to='/register' className='nav-link'>Registrarse</NavLink>
                </li>
            </ul>
        </div>
    </>
  )
}
