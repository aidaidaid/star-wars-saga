import { takeEvery, call, put, spawn } from "redux-saga/effects";
import { setList, setInfoData, setLinksFilms, setLinksCharacters, setLinksPlanets } from "../../redux/actions";
import { types } from "./actionTypes";

const getSpecies = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getSpecies", e));
    return response;    
};

function* speciesWorker (action) {
    const result = yield call(getSpecies, `https://swapi.dev/api/species/?page=${action.payload}&format=json`);
    yield put(setList(result));
};

export function* speciesWatcher () {
    yield takeEvery(types.SET_SPECIES, speciesWorker);
};

const getSpecieInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getSpecieInfo", e));
    return response;    
};

const getSpecieLinks = async(links) => {
    return Promise.all(links?.map(async(item) => {
        const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
        return "title" in obj ? obj.title : obj.name;
    }))
}

function* specieInfoWorker (action) { 
    const result = yield call(getSpecieInfo, `https://swapi.dev/api/species/` + `${action.payload}` + `/?format=json`);
    yield put(setInfoData(result));
    yield spawn(specieLinksWatcher)
};

function* specieFilmsWorker(action) {
    const films = yield call(getSpecieLinks, action.payload);
    yield put(setLinksFilms(films));
}

function* speciePeopleWorker(action) {
    const people = yield call(getSpecieLinks, action.payload);
    yield put(setLinksCharacters(people));
}

function* specieHomeworldWorker(action) {
    const homeworld = yield call(getSpecieLinks, action.payload);
    yield put(setLinksPlanets(homeworld));
}

export function* specieInfoWatcher () {
    yield takeEvery(types.SET_SPECIE_INFO, specieInfoWorker);
};

export function* specieLinksWatcher () {
    yield takeEvery(types.SET_SPECIE_FILMS_SAGA, specieFilmsWorker);
    yield takeEvery(types.SET_SPECIE_PEOPLE_SAGA, speciePeopleWorker);
    yield takeEvery(types.SET_SPECIE_HOMEWORLD_SAGA, specieHomeworldWorker);
};