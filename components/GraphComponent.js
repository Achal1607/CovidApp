import React, { Component } from 'react'
import { LineChart, Grid, Path, YAxis } from 'react-native-svg-charts'
import { connect } from 'react-redux'
import { GraphStats } from '../redux/ActionCreators'
import { Loading } from './LoadingComponent'
import { ScrollView, View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import History from './History'

class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.graphStats()
        this.setState({ isLoading: false })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.graph.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            let dataConfirmed = this.props.graph.graphData.map(item => (parseInt(item.totalconfirmed)))
            let dataRecovered = this.props.graph.graphData.map(item => (parseInt(item.totalrecovered)))
            let dataDeaths = this.props.graph.graphData.map(item => (parseInt(item.totaldeceased)))
            let dataActive = this.props.graph.graphData.map(item => (parseInt(item.totalconfirmed) - parseInt(item.totalrecovered) - parseInt(item.totaldeceased)))
            const Shadow = ({ line }) => (
                <Path
                    key={'shadow'}
                    y={2}
                    d={line}
                    fill={'none'}
                    strokeWidth={4}
                    stroke={'rgba(134, 65, 244, 0.2)'}
                />
            )
            return (
                <ScrollView style={{ backgroundColor: '#352f44' }}>
                    <Animatable.View animation='fadeInRight' duration={1500}>
                        <View style={{ backgroundColor: '#2a2438', borderRadius: 10, opacity: 0.8, marginTop: 20 }}>
                            <Text style={{ color: '#5f85db', textAlign: 'center', fontSize: 20 }}>Confirm Cases</Text>
                            <View style={{ height: 200, flexDirection: 'row' }}>
                                <YAxis
                                    data={dataConfirmed}
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 12,
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => `${value / 1000}k`}
                                />
                                <LineChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={dataConfirmed}
                                    svg={{ stroke: '#5f85db', strokeWidth: 3 }}
                                    contentInset={{ top: 20, bottom: 20 }}
                                >
                                    <Grid />
                                    <Shadow />
                                </LineChart>
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View animation='fadeInLeft' duration={1500}>
                        <View style={{ backgroundColor: '#2a2438', borderRadius: 10, opacity: 0.8, marginTop: 20 }}>
                            <Text style={{ color: '#e4e4e4', textAlign: 'center', fontSize: 20 }}>Active Cases</Text>
                            <View style={{ height: 200, flexDirection: 'row' }}>
                                <YAxis
                                    data={dataActive}
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 12,
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => `${value / 1000}k`}
                                />
                                <LineChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={dataActive}
                                    svg={{ stroke: '#e4e4e4', strokeWidth: 3 }}
                                    contentInset={{ top: 20, bottom: 20 }}
                                >
                                    <Grid />
                                    <Shadow />
                                </LineChart>
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View animation='fadeInRight' duration={1500}>
                        <View style={{ backgroundColor: '#2a2438', borderRadius: 10, opacity: 0.8, marginTop: 20 }}>
                            <Text style={{ color: 'orange', textAlign: 'center', fontSize: 20 }}>Recovered Cases</Text>
                            <View style={{ height: 200, flexDirection: 'row' }}>
                                <YAxis
                                    data={dataRecovered}
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 12,
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => `${value / 1000}k`}
                                />
                                <LineChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={dataRecovered}
                                    svg={{ stroke: 'orange', strokeWidth: 3 }}
                                    contentInset={{ top: 20, bottom: 20 }}
                                >
                                    <Grid />
                                    <Shadow />
                                </LineChart>
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View animation='fadeInLeft' duration={1500}>
                        <View style={{ backgroundColor: '#2a2438', borderRadius: 10, opacity: 0.8, marginTop: 20 }}>
                            <Text style={{ color: '#219897', textAlign: 'center', fontSize: 20 }}>Deaths</Text>
                            <View style={{ height: 200, flexDirection: 'row' }}>
                                <YAxis
                                    data={dataDeaths}
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 12,
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => `${value / 1000}k`}
                                />
                                <LineChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={dataDeaths}
                                    svg={{ stroke: '#219897', strokeWidth: 3 }}
                                    contentInset={{ top: 20, bottom: 20 }}
                                >
                                    <Grid />
                                    <Shadow />
                                </LineChart>
                            </View>
                        </View>
                        <History data={this.props.graph.graphData} />
                    </Animatable.View>
                </ScrollView>
            )
        }
    }
}

const MapStateToProps = (state) => ({
    graph: state.GraphData
})

const MapDispatchToProps = dispatch => ({
    graphStats: () => dispatch(GraphStats())
})

export default connect(MapStateToProps, MapDispatchToProps)(Graph)