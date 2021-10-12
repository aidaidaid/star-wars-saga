import { types } from "./actionTypes";

const initialState = {
    data: [],
};

function planets (state = initialState, action) {
    switch(action.type) {
        case types.SET_PLANETS_DATA:
            return{
                ...state,
                data: action.payload,
            }
        default:
            return state;
    };
};

export default planets;