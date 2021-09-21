import React, { useEffect, useState } from "react";
import '../../../index.css';
import { insertData } from "../../../services";

const StarshipCards = ({ charactersInfo, match, location }) => {
    let [starshipInfo, setStarshipInfo] = useState([]);
    let [starshipCharacters, setStarshipCharacters] = useState([]);
    let [starshipCharactersUrl, setStarshipCharactersUrl] = useState([]);
    let [starshipFilms, setStarshipFilms] = useState([]);
    let [starshipFilmsUrl, setStarshipFilmsUrl] = useState([]);

    const getStarshipInfo = async () => {
        const starshipInfo = await fetch(`https://swapi.dev/api/starships/` + `${match?.params?.starshipId}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        setStarshipInfo(starshipInfo);
        setStarshipCharactersUrl(starshipInfo?.pilots);
        setStarshipFilmsUrl(starshipInfo?.films);
    }

    const getCharacters = async () => {
        starshipCharactersUrl?.forEach(async(item) => {
            let character = await fetch(`${item}` + `?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setStarshipCharacters(prevState => ([...prevState, character?.name]));    
    })
    }

    const getFilms = async() => {
        starshipFilmsUrl?.forEach(async(item) => {
            let film = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setStarshipFilms(prevState => ([...prevState, film?.title]));
        })
    }

    useEffect(() => {
        getStarshipInfo();
    }, [])

    useEffect(() => {
        if (starshipCharactersUrl?.length) {
            getCharacters();
        }     
    }, [starshipCharactersUrl]);

    useEffect(() => {
        if (starshipFilmsUrl?.length) {
            getFilms();
        }     
    }, [starshipFilmsUrl]);
    

    return ( 
        
        <div className='info'>
            <p>Name: {starshipInfo.name}</p>
            <p>Model: {starshipInfo.model}</p>
            <p>Manufacturer: {starshipInfo.manufacturer}</p>
            <p>Cost in credits: {starshipInfo.cost_in_credits}</p>
            <p>Length: {starshipInfo.length}</p>
            <p>Max atmosphering speed: {starshipInfo.max_atmosphering_speed}</p>
            <p>Crew: {starshipInfo.crew}</p>
            <p>Passengers: {starshipInfo.passengers}</p>
            <p>Cargo capacity: {starshipInfo.cargo_capacity}</p>
            <p>Consumables: {starshipInfo.consumables}</p>
            <p>Hyperdrive rating: {starshipInfo.hyperdrive_rating}</p>
            <p>MGLT: {starshipInfo.MGLT}</p>
            <p>Starship class: {starshipInfo.starship_class}</p>
            <p>Pilots: <span>{insertData(starshipCharacters)}</span></p>
            <p>Films: <span>{insertData(starshipFilms)}</span></p>
        </div>
    )
}

export default StarshipCards