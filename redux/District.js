import * as ActionType from './ActionTypes'

const initState = [{
    state: null,
    statecode: null,
    districtData: null,
    isLoading: true,
    err: null
}
]

const District = (state = initState, action) => {
    switch (action.type) {
        case ActionType.LOADING_DISTRICT:
            return { ...state, isLoading: true }
        case ActionType.FETCH_DISTRICT:
            return { ...action.payload, isLoading: false, err: null }
        default:
            return state
    }
}

export default District