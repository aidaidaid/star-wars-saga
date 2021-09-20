import React, { useEffect, useState } from "react";
import '../../characters/characterCards/index.css';
import {Link} from "react-router-dom";

const StarshipCards = ({ charactersInfo, match, location }) => {
    let [starshipInfo, setStarshipInfo] = useState([]);
    let [starshipCharacters, setStarshipCharacters] = useState([]);
    let [starshipCharactersUrl, setStarshipCharactersUrl] = useState([]);
    let [starshipFilms, setStarshipFilms] = useState([]);
    let [starshipFilmsUrl, setStarshipFilmsUrl] = useState([]);

    let count = match?.params?.starshipId;
    console.log(count)
    const getStarshipInfo = async () => {
        let starshipInfo = await fetch(`https://swapi.dev/api/starships/` + `${count}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        console.log('af',starshipInfo)
        if (starshipInfo.detail == 'Not found') {
            count = parseInt(count) + 1;
            getStarshipInfo();
            // let starshipInfo = await fetch(`https://swapi.dev/api/starships/` + `${match?.params?.starshipId}` + `/?format=json`)
            // .then((data) => data.json()).catch((e) => console.error(e))
        }
        console.log('afff',starshipInfo)
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
        
        <div className='characterInfo'>
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
            <p>Pilots: <span>{starshipCharacters?.map((item, index)=>{
                if (index == starshipCharacters.length-1) {
                return <span key={index} className='character'>
                    <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item}</Link></span>
                } else {
                    return <span key={index} className='character'>
                        <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item+','}</Link></span>
                }
            })
            }</span></p>
            <p>Films: <span>{starshipFilms?.map((item, index)=>{
                if (index == starshipFilms.length-1) {
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

export default StarshipCards