import { takeEvery, call, put, spawn } from "redux-saga/effects";
import { setList, setInfoData, setLinksPlanets, setLinksCharacters, setLinksStarships, setLinksVehicles, setLinksSpecies } from "../../redux/actions";
import { types } from "./actionTypes";

const getFilms = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getFilms", e));
    return response;    
};

function* filmsWorker (action) {
    const result = yield call(getFilms, `https://swapi.dev/api/films/?page=${action.payload}&format=json`);
    yield put(setList(result));
};

export function* filmsWatcher () {
    yield takeEvery(types.SET_FILMS, filmsWorker);
};

const getFilmInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getFilmInfo", e));
    return response;    
};

const getFilmLinks = async(links) => {
    return Promise.all(links?.map(async(item) => {
        const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
        return "title" in obj ? obj.title : obj.name;
    }))
}

function* filmInfoWorker (action) { 
    const result = yield call(getFilmInfo, `https://swapi.dev/api/films/` + `${action.payload}` + `/?format=json`);
    yield put(setInfoData(result));
    yield spawn(filmLinksWatcher)
};

function* filmCharactersWorker(action) {
    const characters = yield call(getFilmLinks, action.payload);
    yield put(setLinksCharacters(characters));
}

function* filmPlanetsWorker(action) {
    const planets = yield call(getFilmLinks, action.payload);
    yield put(setLinksPlanets(planets));
}

function* filmStarshipsWorker(action) {
    const starships = yield call(getFilmLinks, action.payload);
    yield put(setLinksStarships(starships));
}

function* filmVehiclesWorker(action) {
    const vehicles = yield call(getFilmLinks, action.payload);
    yield put(setLinksVehicles(vehicles));
}

function* filmSpeciesWorker(action) {
    const species = yield call(getFilmLinks, action.payload);
    yield put(setLinksSpecies(species));
}

export function* filmInfoWatcher () {
    yield takeEvery(types.SET_FILM_INFO, filmInfoWorker);
};

export function* filmLinksWatcher () {
    yield takeEvery(types.SET_FILM_CHARACTERS_SAGA, filmCharactersWorker);
    yield takeEvery(types.SET_FILM_PLANETS_SAGA, filmPlanetsWorker);
    yield takeEvery(types.SET_FILM_STARSHIPS_SAGA, filmStarshipsWorker);
    yield takeEvery(types.SET_FILM_VEHICLES_SAGA, filmVehiclesWorker);
    yield takeEvery(types.SET_FILM_VEHICLES_SAGA, filmSpeciesWorker);
};