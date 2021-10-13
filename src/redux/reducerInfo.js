import { types } from "./actionTypes";

const initialState = {
    list: [],
    data: [],
    filmsArr: [],
    speciesArr: [],
    vehiclesArr: [],
    residentsArr: [],
    charactersArr: [],
    planetsArr: [],
    starshipsArr: [],
};

function detailInfo (state = initialState, action) {
    switch(action.type) {
        case types.SET_LIST:
            return{
                ...state,
                list: action.payload,
            }
        case types.SET_INFO_DATA:
            return{
                ...state,
                data: action.payload,
                filmsArr: [],
                speciesArr: [],
                vehiclesArr: [],
                residentsArr: [],
                charactersArr: [],
                planetsArr: [],
                starshipsArr: [],
            }
        case types.SET_LINKS_FILMS:
            return{
                ...state,
                filmsArr: action.payload,
            }
        case types.SET_LINKS_SPECIES:
            return{
                ...state,
                speciesArr: action.payload,
            }
        case types.SET_LINKS_VEHICLES:
            return{
                ...state,
                vehiclesArr: action.payload,
            }
        case types.SET_LINKS_RESIDENTS:
            return{
                ...state,
                residentsArr: action.payload,
            }
        case types.SET_LINKS_CHARACTERS:
            return{
                ...state,
                charactersArr: action.payload,
            }
        case types.SET_LINKS_PLANETS:
            return{
                ...state,
                planetsArr: action.payload,
            }
        case types.SET_LINKS_STARSHIPS:
            return{
                ...state,
                starshipsArr: action.payload,
            }
        default:
            return state;
    };
};

export default detailInfo;