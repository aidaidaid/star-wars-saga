import { takeEvery, call, put, spawn } from "redux-saga/effects";
import { setList, setInfoData, setLinksFilms, setLinksCharacters } from "../../redux/actions";
import { types } from "./actionTypes";

const getStarships = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getStarships", e));
    return response;    
};

function* starshipsWorker (action) {
    const result = yield call(getStarships, `https://swapi.dev/api/starships/?page=${action.payload}&format=json`);
    yield put(setList(result));
};

export function* starshipsWatcher () {
    yield takeEvery(types.SET_STARSHIPS, starshipsWorker);
};

const getStarshipInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getStarshipInfo", e));
    return response;    
};

const getStarshipLinks = async(links) => {
    return Promise.all(links?.map(async(item) => {
        const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
        return "title" in obj ? obj.title : obj.name;
    }))
}

function* starshipInfoWorker (action) { 
    const result = yield call(getStarshipInfo, `https://swapi.dev/api/starships/` + `${action.payload}` + `/?format=json`);
    yield put(setInfoData(result));
    yield spawn(starshipLinksWatcher)
};

function* starshipFilmsWorker(action) {
    const films = yield call(getStarshipLinks, action.payload);
    yield put(setLinksFilms(films));
}

function* starshipPilotsWorker(action) {
    const pilots = yield call(getStarshipLinks, action.payload);
    yield put(setLinksCharacters(pilots));
}

export function* starshipInfoWatcher () {
    yield takeEvery(types.SET_STARSHIP_INFO, starshipInfoWorker);
};

export function* starshipLinksWatcher () {
    yield takeEvery(types.SET_STARSHIP_FILMS_SAGA, starshipFilmsWorker);
    yield takeEvery(types.SET_STARSHIP_PILOTS_SAGA, starshipPilotsWorker);
};