import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "../saga";
import characters from "./characters/reducer";
import characterInfo from "./characters/reducerInfo";
import planets from './planets/reducer';
import planetInfo from './planets/reducerInfo';

const reducer = combineReducers({
    characters,
    characterInfo,
    planets,
    planetInfo,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);