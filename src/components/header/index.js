import React from "react";
import {NavLink} from 'react-router-dom'
import '../header/index.css';

const Header = () => {

    return (
        <header>
            <nav>
                <NavLink exact to='/' activeClassName='active'>Home</NavLink>
                <NavLink to='/characters' activeClassName='active'>Characters</NavLink>
                <NavLink to='/planets' activeClassName='active'>Planets</NavLink>
                <NavLink to='/films' activeClassName='active'>Films</NavLink>
                <NavLink to='/species' activeClassName='active'>Species</NavLink>
                <NavLink to='/vehicles' activeClassName='active'>Vehicles</NavLink>
                <NavLink to='/starships' activeClassName='active'>Starships</NavLink>
            </nav>
        </header>
    )
}

export default Header