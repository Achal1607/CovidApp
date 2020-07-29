import * as ActionType from './ActionTypes'

const initState = [{
    graphData:null,
    isLoading: true,
    err: null
}
]

const GraphData = (state = initState, action) => {
    switch (action.type) {
        case ActionType.LOADING_DATA:
            return { ...state, isLoading: true }
        case ActionType.FETCH_DATA:
            return {graphData:[...action.payload], isLoading: false, err: null }
        default:
            return state
    }
}

export default GraphData