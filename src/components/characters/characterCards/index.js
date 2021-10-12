// import React, { useEffect, useState } from "react";
// // import './index.css';
// import '../../../index.css';


// import { insertData } from "../../../services";

// const CharacterCards = ({match}) => {
//     let [characterInfo, setCharacterInfo] = useState([]);
//     let [charHomeworld, setCharHomeworld] = useState('');
//     let [charSpecies, setCharSpecies] = useState('');
//     let [characterFilms, setCharacterFilms] = useState([]);
//     let [characterFilmssUrl, setCharacterFilmssUrl] = useState([]);
//     let [characterVehicles, setCharacterVehicles] = useState([]);
//     let [characterVehiclesUrl, setCharacterVehiclesUrl] = useState([]);
//     let [characterStarships, setCharacterStarships] = useState([]);
//     let [characterStarshipsUrl, setCharacterStarshipsUrl] = useState([]);

//     const getCharacterInfo = async () => {
//         let characterInfo = await fetch(`https://swapi.dev/api/people/` + `${match?.params?.charId}` + `/?format=json`).then((data) => data.json()).catch((e) => console.error(e))
//         setCharacterInfo(characterInfo);
//         setCharacterFilmssUrl(characterInfo?.films);
//         setCharacterVehiclesUrl(characterInfo?.vehicles);
//         setCharacterStarshipsUrl(characterInfo?.starships);
//     }

//     const getHomeworld = async () => {
//         let homeworld = await fetch(`${characterInfo.homeworld}` + `/?format=json`).then((data) => data.json()).catch((e) => console.log(e));
//         setCharHomeworld(homeworld?.name);
//     }

//     const getSpecies = async () => {
//         let species = await fetch(`${characterInfo.species}` + `/?format=json`).then((data) => data.json()).catch((e) => console.log(e));
//         setCharSpecies(species?.name);
//     }

//     const getFilms = async() => {
//         characterFilmssUrl?.forEach(async(item, index) => {
//             let film = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
//             setCharacterFilms(prevState => ([...prevState, film?.title]));
//         })
//     }

//     const getVehicles = async() => {
//         characterVehiclesUrl?.forEach(async(item) => {
//             let vehicles = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
//             setCharacterVehicles(prevState => ([...prevState, vehicles?.name]));
//         })
//     }

//     const getStarships = async() => {
//         characterStarshipsUrl?.forEach(async(item) => {
//             let starships = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
//             setCharacterStarships(prevState => ([...prevState, starships?.name]));
//         })
//     }

//     useEffect(() => {
//         getCharacterInfo();
//     }, [])

//     useEffect(() => {
//         getHomeworld();
//         getSpecies();
//     }, [characterInfo])

//     useEffect(() => {
//         if (characterFilmssUrl?.length) {
//             getFilms();
//         }     
//     }, [characterFilmssUrl]);

//     useEffect(()=>{
//         if (characterVehiclesUrl?.length) {
//             getVehicles()
//         }
//     },[characterVehiclesUrl])

//     useEffect(()=>{
//         if (characterStarshipsUrl?.length) {
//             getStarships()
//         }
//     },[characterStarshipsUrl])

//     return (
//         <div className='info'>
//             <p>Name: {characterInfo.name}</p>
//             <p>Height: {characterInfo.height}</p>
//             <p>Mass: {characterInfo.mass}</p>
//             <p>Hair color: {characterInfo.hair_color}</p>
//             <p>Skin color: {characterInfo.skin_color}</p>
//             <p>Eye color: {characterInfo.eye_color}</p>
//             <p>Birth year: {characterInfo.birth_year}</p>
//             <p>Gender: {characterInfo.gender}</p>
//             <p>Homeworld: {charHomeworld}</p>
//             <p>Films: <span>{insertData(characterFilms)}</span></p>
//             <p>Species: {charSpecies}</p>
//             <p>Vehicles: <span>{insertData(characterVehicles)}</span></p>
//             <p>Starships: <span>{insertData(characterStarships)}</span></p>
//         </div>
//     )
// }

// export default CharacterCards