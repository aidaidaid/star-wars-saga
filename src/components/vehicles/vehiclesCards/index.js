import React, { useEffect, useState } from "react";
import '../../../index.css';
import { insertData } from "../../../services";

const VehicleCards = ({match}) => {
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [vehicleCharacters, setVehicleCharacters] = useState([]);
    const [vehicleCharactersUrl, setVehicleCharactersUrl] = useState([]);
    const [vehicleFilms, setVehicleFilms] = useState([]);
    const [vehicleFilmsUrl, setVehicleFilmsUrl] = useState([]);

    const getSpecieInfo = async () => {
        const vehicleInfo = await fetch(`https://swapi.dev/api/vehicles/` + `${match?.params?.vehicleId}` + `/?format=json`)
        .then((data) => data.json()).catch((e) => console.error(e))
        setVehicleInfo(vehicleInfo);
        setVehicleCharactersUrl(vehicleInfo?.pilots);
        setVehicleFilmsUrl(vehicleInfo?.films);
    }

    const getCharacters = async () => {
        vehicleCharactersUrl?.forEach(async(item) => {
            const character = await fetch(`${item}` + `?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setVehicleCharacters(prevState => ([...prevState, character?.name]));    
    })
    }

    const getFilms = async() => {
        vehicleFilmsUrl?.forEach(async(item) => {
            const film = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
            setVehicleFilms(prevState => ([...prevState, film?.title]));
        })
    }

    useEffect(() => {
        getSpecieInfo();
    }, [])

    useEffect(() => {
        if (vehicleCharactersUrl?.length) {
            getCharacters();
        }     
    }, [vehicleCharactersUrl]);

    useEffect(() => {
        if (vehicleFilmsUrl?.length) {
            getFilms();
        }     
    }, [vehicleFilmsUrl]);
    

    return ( 
        
        <div className='info'>
            <p>Name: {vehicleInfo.name}</p>
            <p>Model: {vehicleInfo.model}</p>
            <p>Manufacturer: {vehicleInfo.manufacturer}</p>
            <p>Average height: {vehicleInfo.average_height}</p>
            <p>Cost in credits: {vehicleInfo.cost_in_credits}</p>
            <p>Length: {vehicleInfo.length}</p>
            <p>Max atmosphering speed: {vehicleInfo.max_atmosphering_speed}</p>
            <p>Crew: {vehicleInfo.crew}</p>
            <p>Passengers: {vehicleInfo.passengers}</p>
            <p>Cargo capacity: {vehicleInfo.cargo_capacity}</p>
            <p>Consumables: {vehicleInfo.consumables}</p>
            <p>Vehicle class: {vehicleInfo.vehicle_class}</p>
            <p>Pilots: <span>{insertData(vehicleCharacters)}</span></p>
            <p>Films: <span>{insertData(vehicleFilms)}</span></p>
        </div>
    )
}

export default VehicleCards