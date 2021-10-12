import { types } from "./actionTypes";

export const setVehicles = (payload) => ({
    type: types.SET_VEHICLES,
    payload,
});

export const setVehicleInfo = (payload) => ({
    type: types.SET_VEHICLE_INFO,
    payload,
});

export const setVehicleFilmsSaga = (payload) => ({
    type: types.SET_VEHICLE_FILMS_SAGA,
    payload,
});

export const setVehiclePilotsSaga = (payload) => ({
    type: types.SET_VEHICLE_PILOTS_SAGA,
    payload,
});