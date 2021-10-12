import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../../index.css';
import { selectDetailInfo, selectLinksCharacters, selectLinksFilms } from '../../../redux/selectors';
import { setVehicleFilmsSaga, setVehicleInfo, setVehiclePilotsSaga } from "../../../saga/vehicles/actions";
import { insertData } from "../../../services";

const VehicleCards = ({match}) => {

    const dispatch = useDispatch();
    const vehicleInfo = useSelector(selectDetailInfo);
    const vehicleFilms = useSelector(selectLinksFilms);
    const vehiclePilots = useSelector(selectLinksCharacters);
    
    useEffect(() => {
        dispatch(setVehicleInfo(match?.params?.vehicleId));
    }, []);

    useEffect(() => {
        dispatch(setVehicleFilmsSaga(vehicleInfo.films));
        dispatch(setVehiclePilotsSaga(vehicleInfo.pilots));
    }, [vehicleInfo]);

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
            <p>Pilots: <span>{insertData(vehiclePilots)}</span></p>
            <p>Films: <span>{insertData(vehicleFilms)}</span></p>
        </div>
    )
}

export default VehicleCards