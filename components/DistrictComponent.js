import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'
import { withNavigation } from '@react-navigation/compat'
import DistrictTable from './DistrictTable'
import { Loading } from './LoadingComponent'
import { DistrictStats } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable'
import { formatNumber } from '../utils/functions'

export class DistrictComponent extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.fetchDistrict(this.props.route.params.stateCode)
    }

    doSort = (district) => {
        district.sort((value1, value2) => {
            const confirm1 = parseInt(value1.confirmed)
            const confirm2 = parseInt(value2.confirmed)
            return confirm1 < confirm2
                ? 1
                : confirm2 === confirm1 && value1['district'] > value2['district']
                    ? 1
                    : -1
        })
    }

    render() {
        const stateCode = this.props.route.params.stateCode
        if (this.props.district[0].isLoading) {
            return (
                <Loading />
            )
        }
        else {
            this.doSort(this.props.district[0].districtData)
            return (
                <ScrollView style={{ backgroundColor: '#352f44' }}>
                    <Animatable.View animation='fadeInLeft' duration={1000}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#29c7ac', fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>{this.props.route.params.name}</Text>
                            <Text style={{ color: '#29c7ac', fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Total Cases: {formatNumber(this.props.cases.confirmed)}</Text>
                            <Text style={{ color: '#29c7ac', fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Recovery Rate: {(100 * parseInt(this.props.cases.recovered) / parseInt(this.props.cases.confirmed)).toFixed(2)}%</Text>
                        </View>
                    </Animatable.View>
                    <Animatable.View animation='fadeInRightBig' duration={1000}>
                        <DistrictTable />
                    </Animatable.View>
                </ScrollView >
            )
        }
    }
}

const mapStateToProps = (state, OwnProps) => ({
    district: state.District,
    cases: state.Reducer.statewise.filter(item => item.statecode === OwnProps.route.params.stateCode)[0]
})

const mapDispatchToProps = (dispatch) => ({
    fetchDistrict: (stateCode) => dispatch(DistrictStats(stateCode))
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DistrictComponent))
