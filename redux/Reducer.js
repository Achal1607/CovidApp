import * as ActionType from './ActionTypes'

const initState = [{
    dailyconfirmed: 0,
    dailydeceased: 0,
    dailyrecovered: 0,
    date: "",
    totalconfirmed: 0,
    totaldeceased: 0,
    totalrecovered: 0,
    totalsamplestested: 0,
    samplereportedtoday: 0,
    timestamp: 0,
    statewise: [1],
    isLoading: true,
    err: null
}
]

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.LOADING_STATS:
            return { ...state, isLoading: true }
        case ActionType.FETCH_STATS:
            return { ...action.payload, isLoading: false, err: null }
        case ActionType.ERROR_STATS:
            return { ...state, ...action.payload, isLoading: false }
        default:
            return state
    }
}

export default Reducer