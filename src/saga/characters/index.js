import { takeEvery, call, put, select, spawn, take } from "redux-saga/effects";
// import { setCharactersData, setCharacterInfoData, setCharacterFilms, setCharacterSpecies, setCharacterVehicles } from "../../redux/characters/actions";
import { setCharactersData } from "../../redux/characters/actions";
import { setList, setInfoData, setLinksFilms, setLinksSpecies, setLinksVehicles } from "../../redux/actions";
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


///////////////ИНФО
const getCharacterInfo = async(url) => {
    const response = await fetch(url).then(res => res.json()).catch(e => console.warn("getCharacterInfo", e));
    return response;    
};

const getCharacterLinks = async(links) => { //линки фильмов
    return Promise.all(links?.map(async(item) => {
        const obj = await fetch(`${item}`+`?format=json`).then((data) => data.json()).catch((e) => console.log(e));  
        console.log("title" in obj ? obj.title : obj.name, links, 'aaaaaaaaaaaa')
        return "title" in obj ? obj.title : obj.name;
    }))
}

function* characterInfoWorker (action) { // общая инфа
    const result = yield call(getCharacterInfo, `https://swapi.dev/api/people/` + `${action.payload}` + `/?format=json`);
    console.log(result, 'RESULT')
    // yield put(setCharacterInfoData(result));
    yield put(setInfoData(result));
    yield spawn(characterLinksWatcher) //???
};

function* characterFilmsWorker(action) { //массив из ссылок
    const films = yield call(getCharacterLinks, action.payload);
    // yield put(setCharacterFilms(films));
    yield put(setLinksFilms(films));
}

function* characterSpeciesWorker(action) {
    const species = yield call(getCharacterLinks, action.payload);
    // yield put(setCharacterSpecies(species));
    yield put(setLinksSpecies(species));
}

function* characterVehiclesWorker(action) {
    const vehicles = yield call(getCharacterLinks, action.payload);
    // yield put(setCharacterVehicles(vehicles));
    yield put(setLinksVehicles(vehicles));
}

export function* characterInfoWatcher () {
    yield takeEvery(types.SET_CHARACTER_INFO, characterInfoWorker);
};

export function* characterLinksWatcher () { //дата из линков
    yield takeEvery(types.SET_CHARACTER_FILMS_SAGA, characterFilmsWorker);
    yield takeEvery(types.SET_CHARACTER_SPECIES_SAGA, characterSpeciesWorker);
    yield takeEvery(types.SET_CHARACTER_VEHICLES_SAGA, characterVehiclesWorker);
    // yield takeEvery(types.SET_CHARACTER_STARSHIPS, characterStarshipsWorker);
    // yield takeEvery(types.SET_CHARACTER_HOMEWORLD, characterHomeworldWorker);
};