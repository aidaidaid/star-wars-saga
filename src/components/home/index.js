import React from "react";
import '../../index.css';
import mainPhoto from '../../assets/main-photo.png';

const Home = () => {

    return (
        <section className='container'>
            <img className='mainPhoto' src={mainPhoto} alt='star wars' />
        </section>      
    )
}

export default Home