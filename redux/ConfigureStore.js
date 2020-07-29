import { createStore, applyMiddleware, combineReducers } from "redux"
import Reducer from "./Reducer"
import logger from "redux-logger"
import thunk from "redux-thunk"
import District from "./District"
import GraphData from './GraphData'
import World from './World'



export const ConfigureStore = () => {
    const store = createStore(combineReducers({ Reducer, District, GraphData, World }), applyMiddleware(logger, thunk))
    return store
}