import * as ActionType from './ActionTypes'
import { baseUrl, baseUrl1 } from '../baseUrl'

export const Stats = () => {
    return async (dispatch) => {
        dispatch(loadingStats());
        const response = await fetch(baseUrl + '/data.json')
        const data = await response.json()
        const stats = data.cases_time_series[data.cases_time_series.length - 1]
        const sample = data.tested[data.tested.length - 1]
        stats.totalsamplestested = sample.totalsamplestested
        stats.samplereportedtoday = sample.samplereportedtoday
        stats.timestamp = sample.updatetimestamp
        stats.statewise = data.statewise
        dispatch(fetchStats(stats))
    }
}

export const fetchStats = (stats) => ({
    type: ActionType.FETCH_STATS,
    payload: stats
})

export const loadingStats = () => ({
    type: ActionType.LOADING_STATS
})

export const errStats = (err) => ({
    type: ActionType.ERROR_STATS,
    payload: err
})

//District Stats

export const DistrictStats = (stateCode) => {
    return async (dispatch) => {
        dispatch(loadingDistrict());
        const response = await fetch(baseUrl + '/v2/state_district_wise.json')
        const data = await response.json()
        const district = data.filter(item => item.statecode == stateCode)
        dispatch(fetchDistrict(district))
    }
}

export const fetchDistrict = (stats) => ({
    type: ActionType.FETCH_DISTRICT,
    payload: stats
})

export const loadingDistrict = (stats) => ({
    type: ActionType.LOADING_DISTRICT,
})


// Graph Data

export const GraphStats = () => {
    return async (dispatch) => {
        dispatch(loadingData());
        const response = await fetch(baseUrl + '/data.json')
        const data = await response.json()
        const graphData = data.cases_time_series
        dispatch(fetchData(graphData))
    }
}

export const fetchData = (stats) => ({
    type: ActionType.FETCH_DATA,
    payload: stats
})


export const loadingData = () => ({
    type: ActionType.LOADING_DATA
})


//World Data

export const WorldStats = () => {
    let stats = []
    return async dispatch => {
        dispatch(loadingWorld())
        const response = await fetch(baseUrl1 + '/countries?sort=cases')
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
            stats.push({ info: data[i].countryInfo, country: data[i].country, cases: data[i].cases, recovered: data[i].recovered })
        }
        dispatch(fetchWorld(stats))
    }

}

export const loadingWorld = () => ({
    type: ActionType.LOADING_WORLD
})

export const fetchWorld = (stats) => ({
    type: ActionType.FETCH_WORLD,
    payload: stats
})