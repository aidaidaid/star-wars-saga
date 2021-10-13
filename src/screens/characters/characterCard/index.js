import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
import { selectDetailInfo, selectLinksFilms, selectLinksPlanets, selectLinksSpecies, selectLinksStarships, selectLinksVehicles } from '../../../redux/selectors';
import { setCharacterFilmsSaga, setCharacterHomeworldSaga, setCharacterInfo, setCharacterSpeciesSaga, setCharacterStarshipsSaga, setCharacterVehiclesSaga } from "../../../saga/characters/actions";
import { insertData } from "../../../services";

const CharacterCards = ({match}) => {
    
    const dispatch = useDispatch();
    const characterInfo = useSelector(selectDetailInfo);
    const characterFilms = useSelector(selectLinksFilms);
    const characterSpecies = useSelector(selectLinksSpecies);
    const characterHomeworld = useSelector(selectLinksPlanets);
    const characterVehicles = useSelector(selectLinksVehicles);
    const characterStarships = useSelector(selectLinksStarships);
    
    useEffect(() => {
        dispatch(setCharacterInfo(match?.params?.charId));
    }, []);

    useEffect(() => {
        dispatch(setCharacterFilmsSaga(characterInfo.films));
        dispatch(setCharacterSpeciesSaga(characterInfo.species));
        dispatch(setCharacterVehiclesSaga(characterInfo.vehicles));
        dispatch(setCharacterStarshipsSaga(characterInfo.starships));
        dispatch(setCharacterHomeworldSaga(characterInfo.homeworld));
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
            <p>Homeworld: {insertData(characterHomeworld)}</p>
            <p>Films: <span>{insertData(characterFilms)}</span></p>
            <p>Species: {insertData(characterSpecies)}</p>
            <p>Vehicles: <span>{insertData(characterVehicles)}</span></p>
            <p>Starships: <span>{insertData(characterStarships)}</span></p>
        </div>
    )
}

export default CharacterCards