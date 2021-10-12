import { types } from "./actionTypes";

export const setFilmsData = (payload) => ({
    type: types.SET_FILMS_DATA,
    payload,
});