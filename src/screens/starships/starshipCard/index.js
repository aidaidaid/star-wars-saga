import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
import { selectDetailInfo, selectLinksCharacters, selectLinksFilms } from '../../../redux/selectors';
import { setStarshipFilmsSaga, setStarshipInfo, setStarshipPilotsSaga } from "../../../saga/starships/actions";
import { insertData } from "../../../services";

const StarshipCards = ({match}) => {

    const dispatch = useDispatch();
    const starshipInfo = useSelector(selectDetailInfo);
    const starshipFilms = useSelector(selectLinksFilms);
    const starshipPilots = useSelector(selectLinksCharacters);
    
    useEffect(() => {
        dispatch(setStarshipInfo(match?.params?.starshipId));
    }, []);

    useEffect(() => {
        dispatch(setStarshipFilmsSaga(starshipInfo.films));
        dispatch(setStarshipPilotsSaga(starshipInfo.pilots));
    }, [starshipInfo]);

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
            <p>Pilots: <span>{insertData(starshipPilots)}</span></p>
            <p>Films: <span>{insertData(starshipFilms)}</span></p>
        </div>
    )
}

export default StarshipCards