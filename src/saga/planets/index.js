import { takeEvery, call, put, spawn } from "redux-saga/effects";
import { setList, setInfoData, setLinksFilms, setLinksResidents } from "../../redux/actions";
import { types } from "./actionTypes";

const getPlanets = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getCharacters", e));
    return response;    
};

function* planetsWorker (action) {
    const result = yield call(getPlanets, `https://swapi.dev/api/planets/?page=${action.payload}&format=json`);
    yield put(setList(result));
};

export function* planetsWatcher () {
    yield takeEvery(types.SET_PLANETS, planetsWorker);
};

const getPlanetInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getPlanetInfo", e));
    return response;    
};

const getPlanetLinks = async(links) => {
    return Promise.all(links?.map(async(item) => {
        const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
        return "title" in obj ? obj.title : obj.name;
    }))
}

function* planetInfoWorker (action) { 
    const result = yield call(getPlanetInfo, `https://swapi.dev/api/planets/` + `${action.payload}` + `/?format=json`);
    yield put(setInfoData(result));
    yield spawn(planetLinksWatcher)
};

function* planetFilmsWorker(action) {
    const films = yield call(getPlanetLinks, action.payload);
    yield put(setLinksFilms(films));
}

function* planetResidentsWorker(action) {
    const residents = yield call(getPlanetLinks, action.payload);
    yield put(setLinksResidents(residents));
}

export function* planetInfoWatcher () {
    yield takeEvery(types.SET_PLANET_INFO, planetInfoWorker);
};

export function* planetLinksWatcher () {
    yield takeEvery(types.SET_PLANET_FILMS_SAGA, planetFilmsWorker);
    yield takeEvery(types.SET_PLANET_RESIDENTS_SAGA, planetResidentsWorker);
};