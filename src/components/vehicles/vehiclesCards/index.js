import React, { useEffect, useState } from "react";
import '../../characters/characterCards/index.css';
import {Link} from "react-router-dom";

const VehicleCards = ({ charactersInfo, match, location }) => {
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [vehicleCharacters, setVehicleCharacters] = useState([]);
    const [vehicleCharactersUrl, setVehicleCharactersUrl] = useState([]);
    const [vehicleFilms, setVehicleFilms] = useState([]);
    const [vehicleFilmsUrl, setVehicleFilmsUrl] = useState([]);


    const getSpecieInfo = async () => {
        const vehicleInfo = await fetch(`https://swapi.dev/api/vehicles/` + `${match?.params?.vehicleId}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        setVehicleInfo(vehicleInfo);
        setVehicleCharactersUrl(vehicleInfo?.pilots);
        setVehicleFilmsUrl(vehicleInfo?.films);
    }

    const getCharacters = async () => {
        vehicleCharactersUrl?.forEach(async(item) => {
            const character = await fetch(`${item}` + `?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setVehicleCharacters(prevState => ([...prevState, character?.name]));    
    })
    }

    const getFilms = async() => {
        vehicleFilmsUrl?.forEach(async(item) => {
            const film = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setVehicleFilms(prevState => ([...prevState, film?.title]));
        })
    }

    useEffect(() => {
        getSpecieInfo();
    }, [])

    useEffect(() => {
        if (vehicleCharactersUrl?.length) {
            getCharacters();
        }     
    }, [vehicleCharactersUrl]);

    useEffect(() => {
        if (vehicleFilmsUrl?.length) {
            getFilms();
        }     
    }, [vehicleFilmsUrl]);
    

    return ( 
        
        <div className='characterInfo'>
            <p>Name: {vehicleInfo.name}</p>
            <p>Model: {vehicleInfo.model}</p>
            <p>Manufacturer: {vehicleInfo.manufacturer}</p>
            <p>Average height: {vehicleInfo.average_height}</p>
            <p>Cost in credits: {vehicleInfo.cost_in_credits}</p>
            <p>Length: {vehicleInfo.length}</p>
            <p>Max atmosphering speed: {vehicleInfo.max_atmosphering_speed}</p>
            <p>Crew: {vehicleInfo.crew}</p>
            <p>Passengers: {vehicleInfo.passengers}</p>
            <p>Cargo capacity: {vehicleInfo.cargo_capacity}</p>
            <p>Consumables: {vehicleInfo.consumables}</p>
            <p>Vehicle class: {vehicleInfo.vehicle_class}</p>
            <p>Pilots: <span>{vehicleCharacters?.map((item, index)=>{
                if (index == vehicleCharacters.length-1) {
                return <span key={index} className='character'>
                    <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item}</Link></span>
                } else {
                    return <span key={index} className='character'>
                        <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item+','}</Link></span>
                }
            })
            }</span></p>
            <p>Films: <span>{vehicleFilms?.map((item, index)=>{
                if (index == vehicleFilms.length-1) {
                return <span key={index} className='character'>
                    <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item}</Link></span>
                } else {
                    return <span key={index} className='character'>
                        <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item+','}</Link></span>
                }
            })
            }</span></p>
        </div>
    )
}

export default VehicleCards