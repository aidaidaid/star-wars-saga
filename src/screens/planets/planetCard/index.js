import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
import { selectDetailInfo, selectLinksFilms, selectLinksResidents } from '../../../redux/selectors';
import { setPlanetFilmsSaga, setPlanetInfo, setPlanetResidentsSaga } from "../../../saga/planets/actions";
import { insertData } from "../../../services";

const PlanetCards = ({match}) => {

    const dispatch = useDispatch();
    const planetInfo = useSelector(selectDetailInfo);
    const planetFilms = useSelector(selectLinksFilms);
    const planetResidents = useSelector(selectLinksResidents);
    
    useEffect(() => {
        dispatch(setPlanetInfo(match?.params?.planetId));
    }, []);

    useEffect(() => {
        dispatch(setPlanetFilmsSaga(planetInfo.films));
        dispatch(setPlanetResidentsSaga(planetInfo.residents));
    }, [planetInfo]);

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
            <p>Residents: <span>{insertData(planetResidents)}</span></p>
            <p>Films: <span>{insertData(planetFilms)}</span></p>
        </div>
    )
}

export default PlanetCards