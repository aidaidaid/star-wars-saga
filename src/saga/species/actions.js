import { types } from "./actionTypes";

export const setSpecies = (payload) => ({
    type: types.SET_SPECIES,
    payload,
});

export const setSpecieInfo = (payload) => ({
    type: types.SET_SPECIE_INFO,
    payload,
});

export const setSpecieFilmsSaga = (payload) => ({
    type: types.SET_SPECIE_FILMS_SAGA,
    payload,
});

export const setSpeciePeopleSaga = (payload) => ({
    type: types.SET_SPECIE_PEOPLE_SAGA,
    payload,
});

export const setSpecieHomeworldSaga = (payload) => ({
    type: types.SET_SPECIE_HOMEWORLD_SAGA,
    payload,
});