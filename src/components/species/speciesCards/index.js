import React, { useEffect, useState } from "react";
import '../../../index.css';
import { insertData } from "../../../services";

const SpecieCards = ({match}) => {
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
        
        <div className='info'>
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
            <p>People: <span>{insertData(specieCharacters)}</span></p >
            <p>Films: <span>{insertData(specieFilms)}</span></p>
        </div>
    )
}

export default SpecieCards