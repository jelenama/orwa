import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import {AuthContext} from '../context/AuthContext';
import './navbar.css'

const Navbar = (props) =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
                
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <Link to="/sign-in">
                    <li >
                        Login
                    </li>
                </Link>    
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <Link to="/events">
                    <li >
                        EVENTS
                    </li>
                </Link> 
                {
                    user.role === "admin" ? 
                    <Link to="/admin">
                        <li >
                            Admin
                        </li>
                    </Link> : null
                }  
                <Link to="/">
                
                <button type="button" 
                        
                        onClick={onClickLogoutHandler}>Logout</button>
            </Link>
                
            </>
        )
    }
    return(
        <div className="topnav">
            <Link to="/">
                
                <div className="ime">JUDGEAPP</div>
            </Link>
            <div >
                <ul>
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;