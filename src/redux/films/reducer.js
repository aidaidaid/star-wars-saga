import { types } from "./actionTypes";

const initialState = {
    data: [],
};

function films (state = initialState, action) {
    switch(action.type) {
        case types.SET_CHARACTERS_DATA:
            return{
                ...state,
                // data: [...state.data, ...action.payload]
                data: action.payload,

            }
        default:
            return state;
    };
};

export default films;