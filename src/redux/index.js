import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "../saga";
import detailInfo from './reducerInfo'

const reducer = combineReducers({
    detailInfo,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);