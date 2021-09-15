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
            </nav>
            <input className='header_input' placeholder="Search"
            // onChange={(e) => setSearchInput(e.target.value)}
            />
        </header>
    )
}

export default Header