import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavBarElements'

const NavBar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  }

  const unauthenticatedNavBar = () => {
    return (
      <>
        <NavLink to="/">
          <li className="nav-item nav-link">
            Home
          </li>
        </NavLink>
        <NavLink to="/login">
          <li className="nav-item nav-link">
            Login
          </li>
        </NavLink>
        <NavLink to="/register">
          <li className="nav-item nav-link">
            Register
          </li>
        </NavLink>
      </>
    )
  }

  const authenticatedNavBar = () => {
    return (
      <>
        <NavLink to="/">
          <li className="nav-item nav-link">
            Home
          </li>
        </NavLink>
        <NavLink to="/todos">
          <li className="nav-item nav-link">
            Todos
          </li>
        </NavLink>
        {
          user.role === "admin" ?
            <NavLink to="/admin">
              <li className="nav-item nav-link">
                Admin
              </li>
            </NavLink> : null
        }
        <button type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}>Logout</button>
      </>
    )
  }

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={require('../../images/hcs.PNG')} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/events" >
            Events page
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/sign-in'>SIGN IN</NavBtnLink>
        </NavBtn>
      </Nav>

    </>
  )
}

export default NavBar