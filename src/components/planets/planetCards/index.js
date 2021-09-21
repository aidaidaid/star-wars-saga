import React, { useEffect, useState } from "react";
import '../../../index.css';

const PlanetCards = ({ charactersInfo, match, location }) => {
    const [planetInfo, setPlanetInfo] = useState([]);
    const [planetResidents, setPlanetResidents] = useState([]);
    const [planetResidentsUrl, setPlanetResidentsUrl] = useState([]);
    const [planetFilms, setPlanetFilms] = useState([]);
    const [planetFilmssUrl, setPlanetFilmssUrl] = useState([]);

    const getPlanetInfo = async () => {
        const planetInfo = await fetch(`https://swapi.dev/api/planets/` + `${match?.params?.planetId}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        setPlanetInfo(planetInfo);
        setPlanetResidentsUrl(planetInfo?.residents);
        setPlanetFilmssUrl(planetInfo?.films);
    }

    const getResidents = async () => {
        planetResidentsUrl?.forEach(async(item, index) => {
            const resident = await fetch(`${item}` + `?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            console.log('333', resident)
            setPlanetResidents(prevState => ([...prevState, resident?.name]));   
    })
    }

    const getFilms = async() => {
        planetFilmssUrl?.forEach(async(item, index) => {
            const film = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            console.log('444', film)
            setPlanetFilms(prevState => ([...prevState, film?.title]));
        })
    }

    useEffect(() => {
        getPlanetInfo();
    }, [])

    useEffect(() => {
        if (planetResidentsUrl?.length) {
            getResidents();
            console.log('222')
        }     
    }, [planetResidentsUrl]);

    useEffect(() => {
        if (planetFilmssUrl?.length) {
            getFilms();
            console.log('555')
        }     
    }, [planetFilmssUrl]);

    return ( 
        
        <div className='info'>
            <p>Name: {planetInfo.name}</p>
            <p>Rotation period: {planetInfo.rotation_period}</p>
            <p>Orbital period: {planetInfo.orbital_period}</p>
            <p>Diameter: {planetInfo.diameter}</p>
            <p>Climate: {planetInfo.climate}</p>
            <p>Gravity: {planetInfo.gravity}</p>
            <p>Terrain: {planetInfo.terrain}</p>
            <p>Surface water: {planetInfo.surface_water}</p>
            <p>Population: {planetInfo.population}</p>
            <p>Residents: <span>{planetResidents?.map((item, index)=>{
                if (index == planetResidents.length-1) {
                    return <span key={index} className='character'>{item}</span>
                } else {
                    return <span key={index} className='character'>{item+', '}</span>
                }
            })
            }</span></p>
            <p>Films: <span>{planetFilms?.map((item, index)=>{
                if (index == planetFilms.length-1) {
                    return <span key={index} className='character'>{item}</span>
                } else {
                    return <span key={index} className='character'>{item+', '}</span>
                }
            })
            }</span></p>
        </div>
    )
}

export default PlanetCards