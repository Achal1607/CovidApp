import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loading } from './LoadingComponent'
import Table from './TableComponent'
import { ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'

export class State extends Component {
    constructor(props) {
        super(props)
    }

    doSort = (states) => {
        const totalRows = states.splice(0, 1)
        states.sort((value1, value2) => {
            const confirm1 = parseInt(value1.confirmed)
            const confirm2 = parseInt(value2.confirmed)
            return confirm1 < confirm2
                ? 1
                : confirm2 === confirm1 && value1['state'] > value2['state']
                    ? 1
                    : -1
        })
        states.unshift(totalRows[0])
    }

    render() {
        if (this.props.states) {
            this.doSort(this.props.states)
            return (
                <ScrollView style={{ backgroundColor: '#352f44' }}>
                    <Animatable.View animation='fadeInRightBig' duration={1000}>
                        <Table states={this.props.states} />
                    </Animatable.View>
                </ScrollView>
            )
        }
        else {
            return (
                <Loading />
            )
        }
    }
}


const mapStateToProps = (state) => ({
    states: state.Reducer.statewise
})

export default connect(mapStateToProps)(State)
