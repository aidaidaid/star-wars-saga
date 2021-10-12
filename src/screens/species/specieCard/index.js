import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
import { selectDetailInfo, selectLinksCharacters, selectLinksFilms, selectLinksPlanets } from '../../../redux/selectors';
import { setSpecieFilmsSaga, setSpecieHomeworldSaga, setSpecieInfo, setSpeciePeopleSaga } from "../../../saga/species/actions";
import { insertData } from "../../../services";

const SpecieCards = ({match}) => {

    const dispatch = useDispatch();
    const specieInfo = useSelector(selectDetailInfo);
    const specieFilms = useSelector(selectLinksFilms);
    const specieCharacters = useSelector(selectLinksCharacters);
    const specieHomeworld = useSelector(selectLinksPlanets);
    
    useEffect(() => {
        dispatch(setSpecieInfo(match?.params?.specieId));
    }, []);

    useEffect(() => {
        dispatch(setSpecieFilmsSaga(specieInfo.films));
        dispatch(setSpeciePeopleSaga(specieInfo.people));
        dispatch(setSpecieHomeworldSaga(specieInfo.homeworld));
    }, [specieInfo]);

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
            <p>Homeworld: {insertData(specieHomeworld)}</p>
            <p>Language: {specieInfo.language}</p>
            <p>People: <span>{insertData(specieCharacters)}</span></p>
            <p>Films: <span>{insertData(specieFilms)}</span></p>
        </div>
    )
}

export default SpecieCards