import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
import { selectDetailInfo, selectLinksCharacters, selectLinksPlanets, selectLinksSpecies, selectLinksStarships, selectLinksVehicles } from '../../../redux/selectors';
import { setFilmInfo, setFilmCharactersSaga, setFilmPlanetsSaga, setFilmSpeciesSaga, setFilmStarshipsSaga, setFilmVehiclesSaga } from "../../../saga/films/actions";
import { insertData } from "../../../services";

const FilmCards = ({match}) => {

    const dispatch = useDispatch();
    const filmInfo = useSelector(selectDetailInfo);
    const filmCharacters = useSelector(selectLinksCharacters);
    const filmPlanets = useSelector(selectLinksPlanets);
    const filmStarships = useSelector(selectLinksStarships);
    const filmVehicles = useSelector(selectLinksVehicles);
    const filmSpecies = useSelector(selectLinksSpecies);
    
    useEffect(() => {
        dispatch(setFilmInfo(match?.params?.filmId));
    }, []);

    useEffect(() => {
        dispatch(setFilmCharactersSaga(filmInfo.characters));
        dispatch(setFilmPlanetsSaga(filmInfo.planets));
        dispatch(setFilmStarshipsSaga(filmInfo.starships));
        dispatch(setFilmVehiclesSaga(filmInfo.vehicles));
        dispatch(setFilmSpeciesSaga(filmInfo.species));
    }, [filmInfo]);

    return (
        <div className='info'>
            <p>Title: {filmInfo.title}</p>
            <p>Episode: {filmInfo.episode_id}</p>
            <p>Opening crawl: {filmInfo.opening_crawl}</p>
            <p>Director: {filmInfo.director}</p>
            <p>Producer: {filmInfo.producer}</p>
            <p>Release date: {filmInfo.release_date}</p>
            <p>Characters: <span>{insertData(filmCharacters)}</span></p>
            <p>Planets: <span>{insertData(filmPlanets)}</span></p>
            <p>Vehicles: <span>{insertData(filmVehicles)}</span></p>
            <p>Starships: <span>{insertData(filmStarships)}</span></p>
            <p>Species: <span>{insertData(filmSpecies)}</span></p>
        </div>
    )
}

export default FilmCards