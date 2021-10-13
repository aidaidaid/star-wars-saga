import { takeEvery, call, put, spawn } from "redux-saga/effects";
import { setList, setInfoData, setLinksFilms, setLinksSpecies, setLinksVehicles, setLinksStarships, setLinksPlanets } from "../../redux/actions";
import { types } from "./actionTypes";

const getCharacters = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getCharacters", e));
    return response;    
};

function* charactersWorker (action) {
    const result = yield call(getCharacters, `https://swapi.dev/api/people/?page=${action.payload}&format=json`);
    yield put(setList(result));
};

export function* charactersWatcher () {
    yield takeEvery(types.SET_CHARACTERS, charactersWorker);
};

const getCharacterInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getCharacterInfo", e));
    return response;    
};

const getCharacterLinks = async(links) => {
    if (Array.isArray(links)) {
        return Promise.all(links?.map(async(item) => {
            const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
            return "title" in obj ? obj.title : obj.name;
        }))
    } else {
        const obj = await fetch(`${links}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));
        return obj.name;
    }
}

function* characterInfoWorker (action) {
    const result = yield call(getCharacterInfo, `https://swapi.dev/api/people/` + `${action.payload}` + `/?format=json`);
    yield put(setInfoData(result));
    yield spawn(characterLinksWatcher)
};

function* characterFilmsWorker(action) {
    const films = yield call(getCharacterLinks, action.payload);
    yield put(setLinksFilms(films));
}

function* characterSpeciesWorker(action) {
    const species = yield call(getCharacterLinks, action.payload);
    yield put(setLinksSpecies(species));
}

function* characterVehiclesWorker(action) {
    const vehicles = yield call(getCharacterLinks, action.payload);
    yield put(setLinksVehicles(vehicles));
}

function* characterStarshipsWorker(action) {
    const starships = yield call(getCharacterLinks, action.payload);
    yield put(setLinksStarships(starships));
}

function* characterHomeworldWorker(action) {
    const homeworld = yield call(getCharacterLinks, action.payload);
    yield put(setLinksPlanets([homeworld]));
}

export function* characterInfoWatcher () {
    yield takeEvery(types.SET_CHARACTER_INFO, characterInfoWorker);
};

export function* characterLinksWatcher () {
    yield takeEvery(types.SET_CHARACTER_FILMS_SAGA, characterFilmsWorker);
    yield takeEvery(types.SET_CHARACTER_SPECIES_SAGA, characterSpeciesWorker);
    yield takeEvery(types.SET_CHARACTER_VEHICLES_SAGA, characterVehiclesWorker);
    yield takeEvery(types.SET_CHARACTER_STARSHIPS_SAGA, characterStarshipsWorker);
    yield takeEvery(types.SET_CHARACTER_HOMEWORLD_SAGA, characterHomeworldWorker);
};