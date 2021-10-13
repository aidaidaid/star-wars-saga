import { takeEvery, call, put, spawn } from "redux-saga/effects";
import { setList, setInfoData, setLinksFilms, setLinksCharacters } from "../../redux/actions";
import { types } from "./actionTypes";

const getVehicles = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getVehicles", e));
    return response;    
};

function* vehiclesWorker (action) {
    const result = yield call(getVehicles, `https://swapi.dev/api/vehicles/?page=${action.payload}&format=json`);
    yield put(setList(result));
};

export function* vehiclesWatcher () {
    yield takeEvery(types.SET_VEHICLES, vehiclesWorker);
};

const getVehicleInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getVehicleInfo", e));
    return response;    
};

const getVehicleLinks = async(links) => {
    return Promise.all(links?.map(async(item) => {
        const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
        return "title" in obj ? obj.title : obj.name;
    }))
}

function* vehicleInfoWorker (action) { 
    const result = yield call(getVehicleInfo, `https://swapi.dev/api/vehicles/` + `${action.payload}` + `/?format=json`);
    yield put(setInfoData(result));
    yield spawn(vehicleLinksWatcher)
};

function* vehicleFilmsWorker(action) {
    const films = yield call(getVehicleLinks, action.payload);
    yield put(setLinksFilms(films));
}

function* vehiclePilotsWorker(action) {
    const pilots = yield call(getVehicleLinks, action.payload);
    yield put(setLinksCharacters(pilots));
}

export function* vehicleInfoWatcher () {
    yield takeEvery(types.SET_VEHICLE_INFO, vehicleInfoWorker);
};

export function* vehicleLinksWatcher () {
    yield takeEvery(types.SET_VEHICLE_FILMS_SAGA, vehicleFilmsWorker);
    yield takeEvery(types.SET_VEHICLE_PILOTS_SAGA, vehiclePilotsWorker);
};