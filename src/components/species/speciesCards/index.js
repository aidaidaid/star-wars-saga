import React, { useEffect, useState } from "react";
import '../../characters/characterCards/index.css';
import {Link} from "react-router-dom";

const SpecieCards = ({ charactersInfo, match, location }) => {
    const [specieInfo, setSpecieInfo] = useState([]);
    const [specieCharacters, setSpecieCharacters] = useState([]);
    const [specieCharactersUrl, setSpecieCharactersUrl] = useState([]);
    const [specieFilms, setSpecieFilms] = useState([]);
    const [specieFilmsUrl, setSpecieFilmsUrl] = useState([]);


    const getSpecieInfo = async () => {
        const specieInfo = await fetch(`https://swapi.dev/api/species/` + `${match?.params?.specieId}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        setSpecieInfo(specieInfo);
        setSpecieCharactersUrl(specieInfo?.people);
        setSpecieFilmsUrl(specieInfo?.films);
    }

    const getCharacters = async () => {
        specieCharactersUrl?.forEach(async(item) => {
            const character = await fetch(`${item}` + `?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setSpecieCharacters(prevState => ([...prevState, character?.name]));    
    })
    }

    const getFilms = async() => {
        specieFilmsUrl?.forEach(async(item) => {
            const film = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setSpecieFilms(prevState => ([...prevState, film?.title]));
        })
    }

    useEffect(() => {
        getSpecieInfo();
    }, [])

    useEffect(() => {
        if (specieCharactersUrl?.length) {
            getCharacters();
        }     
    }, [specieCharactersUrl]);

    useEffect(() => {
        if (specieFilmsUrl?.length) {
            getFilms();
        }     
    }, [specieFilmsUrl]);
    

    return ( 
        
        <div className='characterInfo'>
            <p>Name: {specieInfo.name}</p>
            <p>Classification: {specieInfo.classification}</p>
            <p>Designation: {specieInfo.designation}</p>
            <p>Average height: {specieInfo.average_height}</p>
            <p>Skin colors: {specieInfo.skin_colors}</p>
            <p>Hair colors: {specieInfo.hair_colors}</p>
            <p>Eye colors: {specieInfo.eye_colors}</p>
            <p>Average lifespan: {specieInfo.average_lifespan}</p>
            <p>homeworld: {specieInfo.hair_colors}</p>
            <p>Language: {specieInfo.language}</p>
            <p>People: <span>{specieCharacters?.map((item, index)=>{
                if (index == specieCharacters.length-1) {
                return <span key={index} className='character'>
                    <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item}</Link></span>
                } else {
                    return <span key={index} className='character'>
                        <Link className='characterName characterNameInline' to={`/characters/`+`${index}`}>{item+','}</Link></span>
                }
            })
            }</span></p>
            <p>Films: <span>{specieFilms?.map((item, index)=>{
                if (index == specieFilms.length-1) {
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

export default SpecieCards