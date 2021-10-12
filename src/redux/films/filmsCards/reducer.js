import { types } from "./actionTypes";

const initialState = {
    data: [],
};

function filmInfo (state = initialState, action) {
    switch(action.type) {
        case types.SET_CHARACTER_INFO_DATA:
            return{
                ...state,
                // data: [...state.data, ...action.payload]
                data: action.payload,

            }
        default:
            return state;
    };
};

export default filmInfo;