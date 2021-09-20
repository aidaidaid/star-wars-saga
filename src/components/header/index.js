import React from "react";
import {Link} from 'react-router-dom'
import '../header/index.css';
// import logo from '../../assets/darth-vader.svg'

const Header = () => {

    return (
        <header>
            {/* <img src={logo} className='logo' alt='logo'></img> */}
 
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/characters'>Characters</Link>
                <Link to='/planets'>Planets</Link>
                <Link to='/films'>Films</Link>
                <Link to='/species'>Species</Link>
                <Link to='/vehicles'>Vehicles</Link>
                <Link to='/starships'>Starships</Link>
            </nav>
            {/* <input className='header_input' placeholder="Search"
            // onChange={(e) => setSearchInput(e.target.value)}
            /> */}
        </header>
    )
}

export default Header