import { types } from "./actionTypes";

const initialState = {
    data: [],
};

function characters (state = initialState, action) {
    switch(action.type) {
        case types.SET_CHARACTERS_DATA:
            return{
                ...state,
                // data: [...state.data, ...action.payload]
                data: action.payload,
            }
        //-
        // case types.SET_CHARACTER_INFO_DATA:
        //     return{
        //         ...state,
        //         // data: [...state.data, ...action.payload]
        //         data: action.payload,

        //     }
        //-
        default:
            return state;
    };
};

export default characters;