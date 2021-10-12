import { types } from "./actionTypes";

const initialState = {
    data: [],
    filmsArr: [],
    speciesArr: [],
    vehiclesArr: [],
};

function characterInfo (state = initialState, action) {
    switch(action.type) {
        case types.SET_CHARACTER_INFO_DATA:
            return{
                ...state,
                data: action.payload,
                // films: action.payload.films,
            }
        case types.SET_CHARACTER_FILMS:
            return{
                ...state,
                filmsArr: action.payload,
            }
        case types.SET_CHARACTER_SPECIES:
            return{
                ...state,
                speciesArr: action.payload,
            }
        case types.SET_CHARACTER_VEHICLES:
            return{
                ...state,
                vehiclesArr: action.payload,
            }
        default:
            return state;
    };
};

export default characterInfo;