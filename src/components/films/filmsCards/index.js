import React, { useEffect, useState } from "react";
import '../../characters/characterCards/index.css';
import {Link} from "react-router-dom";

const FilmCards = ({ charactersInfo, match, location }) => {
    const [filmInfo, setFilmInfo] = useState([]);
    const [filmCharacters, setFilmCharacters] = useState([]);
    const [filmCharactersUrl, setFilmCharactersUrl] = useState([]);
    const [filmPlanets, setFilmPlanets] = useState([]);
    const [filmPlanetsUrl, setFilmPlanetsUrl] = useState([]);
    const [filmVehicles, setFilmVehicles] = useState([]);
    const [filmVehiclesUrl, setFilmVehiclesUrl] = useState([]);
    const [filmStarships, setFilmStarships] = useState([]);
    const [filmStarshipsUrl, setFilmStarshipsUrl] = useState([]);


    const getFilmInfo = async () => {
        const filmInfo = await fetch(`https://swapi.dev/api/films/` + `${match?.params?.filmId}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        setFilmInfo(filmInfo);
        setFilmCharactersUrl(filmInfo?.characters);
        setFilmPlanetsUrl(filmInfo?.planets);
        setFilmVehiclesUrl(filmInfo?.vehicles);
        setFilmStarshipsUrl(filmInfo?.starships);
    }

    const getCharacters = async () => {
        filmCharactersUrl?.forEach(async(item) => {
            const character = await fetch(`${item}` + `?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setFilmCharacters(prevState => ([...prevState, character?.name]));    
    })
    }

    const getPlanets = async() => {
        filmPlanetsUrl?.forEach(async(item) => {
            const planet = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setFilmPlanets(prevState => ([...prevState, planet?.name]));
        })
    }

    const getVehicles = async() => {
        filmVehiclesUrl?.forEach(async(item) => {
            const vehicles = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setFilmVehicles(prevState => ([...prevState, vehicles?.name]));
        })
    }

    const getStarships = async() => {
        filmStarshipsUrl?.forEach(async(item) => {
            const starships = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setFilmStarships(prevState => ([...prevState, starships?.name]));
        })
    }

    useEffect(() => {
        getFilmInfo();
    }, [])

    useEffect(() => {
        if (filmCharactersUrl?.length) {
            getCharacters();
        }     
    }, [filmCharactersUrl]);

    useEffect(() => {
        if (filmPlanetsUrl?.length) {
            getPlanets();
        }     
    }, [filmPlanetsUrl]);
    
    useEffect(()=>{
        if (filmVehiclesUrl?.length) {
            getVehicles()
        }
    },[filmVehiclesUrl])

    useEffect(()=>{
        if (filmStarshipsUrl?.length) {
            getStarships()
        }
    },[filmStarshipsUrl])

    return ( 
        
        <div className='characterInfo'>
            <p>Title: {filmInfo.title}</p>
            <p>Episode: {filmInfo.episode_id}</p>
            <p>Opening crawl: {filmInfo.opening_crawl}</p>
            <p>Director: {filmInfo.director}</p>
            <p>Producer: {filmInfo.producer}</p>
            <p>Release date: {filmInfo.release_date}</p>
            <p>Characters: <span>{filmCharacters?.map((item, index)=>{
                if (index == filmCharacters.length-1) {
                return <span key={index} className='character'>
                    <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item}</Link></span>
                } else {
                    return <span key={index} className='character'>
                        <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item+','}</Link></span>
                }
            })
            }</span></p>
            <p>Planets: <span>{filmPlanets?.map((item, index)=>{
                if (index == filmPlanets.length-1) {
                return <span key={index} className='character'>
                    <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item}</Link></span>
                } else {
                    return <span key={index} className='character'>
                        <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item+','}</Link></span>
                }
            })
            }</span></p>
            <p>Vehicles: <span>{filmVehicles?.map((item, index)=>{
                if (index == filmVehicles.length-1) {
                return <span key={index} className='character'>{item}</span>
                } else {
                    return <span key={index} className='character'>{item+', '}</span>
                }
            })
            }</span></p>
            <p>Starships: <span>{filmStarships?.map((item, index)=>{
                if (index == filmStarships.length-1) {
                return <span key={index} className='character'>{item}</span>
                } else {
                    return <span key={index} className='character'>{item+', '}</span>
                }
            })
            }</span></p>
        </div>
    )
}

export default FilmCards