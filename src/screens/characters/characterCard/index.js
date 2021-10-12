import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
// import { selectCharacterFilms, selectCharacterSpecies, selectCharacterInfo, selectCharacterVehicles } from "../../../redux/characters/selectors";
import { selectDetailInfo, selectLinksFilms, selectLinksSpecies, selectLinksVehicles } from '../../../redux/selectors';
import { setCharacterFilmsSaga, setCharacterInfo, setCharacterInfoLinks, setCharacterSpecies, setCharacterSpeciesSaga, setCharacterVehiclesSaga } from "../../../saga/characters/actions";

import { insertData } from "../../../services";

const CharacterCards = ({match}) => {
    const dispatch = useDispatch();
    const characterInfo = useSelector(selectDetailInfo);
    const characterFilms = useSelector(selectLinksFilms);
    const characterSpecies = useSelector(selectLinksSpecies);
    const characterVehicles = useSelector(selectLinksVehicles);
    
    useEffect(() => {
        dispatch(setCharacterInfo(match?.params?.charId));
    }, []);

    useEffect(() => {
        dispatch(setCharacterFilmsSaga(characterInfo.films));
        dispatch(setCharacterSpeciesSaga(characterInfo.species));
        dispatch(setCharacterVehiclesSaga(characterInfo.vehicles));
    }, [characterInfo]);

    return (
        <div className='info'>
            <p>Name: {characterInfo.name}</p>
            <p>Height: {characterInfo.height}</p>
            <p>Mass: {characterInfo.mass}</p>
            <p>Hair color: {characterInfo.hair_color}</p>
            <p>Skin color: {characterInfo.skin_color}</p>
            <p>Eye color: {characterInfo.eye_color}</p>
            <p>Birth year: {characterInfo.birth_year}</p>
            <p>Gender: {characterInfo.gender}</p>
            {/*<p>Homeworld: {charHomeworld}</p>*/
            <><p>Films: <span>{insertData(characterFilms)}</span></p>
            <p>Species: {insertData(characterSpecies)}</p>
            <p>Vehicles: <span>{insertData(characterVehicles)}</span></p></>
            /*<p>Starships: <span>{insertData(characterStarships)}</span></p>*/}
        </div>
    )
}

export default CharacterCards