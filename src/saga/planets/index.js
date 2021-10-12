import { takeEvery, call, put, select, spawn, take } from "redux-saga/effects";
import { setPlanetFilms, setPlanetInfoData, setPlanetsData, setPlanetsResidents } from "../../redux/planets/actions";
import { types } from "./actionTypes";

const getPlanets = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getCharacters", e));
    return response;    
};

function* planetsWorker (action) {
    const result = yield call(getPlanets, `https://swapi.dev/api/planets/?page=${action.payload}&format=json`);
    yield put(setPlanetsData(result));
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
    debugger;    
    const result = yield call(getPlanetInfo, `https://swapi.dev/api/planets/` + `${action.payload}` + `/?format=json`);
    yield put(setPlanetInfoData(result));
    yield spawn(characterLinksWatcher)
};

function* planetFilmsWorker(action) {
    const films = yield call(getPlanetLinks, action.payload);
    yield put(setPlanetFilms(films));
}

function* planetResidentsWorker(action) {
    const residents = yield call(getPlanetLinks, action.payload);
    yield put(setPlanetsResidents(residents));
}

export function* planetInfoWatcher () {
    // debugger;
    yield takeEvery(types.SET_PLANET_INFO, planetInfoWorker);
};

export function* characterLinksWatcher () {
    yield takeEvery(types.SET_PLANET_FILMS_SAGA, planetFilmsWorker);
    yield takeEvery(types.SET_PLANET_RESIDENTS_SAGA, planetResidentsWorker);
};