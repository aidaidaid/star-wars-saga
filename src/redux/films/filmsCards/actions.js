import { types } from "./actionTypes";

export const setFilmInfoData = (payload) => ({
    type: types.SET_FILM_INFO_DATA,
    payload,
});