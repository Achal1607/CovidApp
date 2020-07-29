import * as ActionType from './ActionTypes'

const initState = [{
    world: null,
    isLoading: true,
    err: null
}
]

const World = (state = initState, action) => {
    switch (action.type) {
        case ActionType.LOADING_WORLD:
            return { ...state, isLoading: true }
        case ActionType.FETCH_WORLD:
            return { world: [...action.payload], isLoading: false, err: null }
        default:
            return state
    }
}

export default World