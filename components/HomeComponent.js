import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Stats } from '../redux/ActionCreators'
import { connect } from 'react-redux'
import { Card, Button, Icon } from 'react-native-elements'
import Pie from './PieChartComponent'
import * as Animatable from 'react-native-animatable'
import { formatNumber } from '../utils/functions'
import { Loading } from './LoadingComponent'

export class Home extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.Stats()
    }
    render() {
        if (this.props.stats.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.stats.err) {
            return (
                <View style={styles.container}>
                    <Text>Error:{this.props.stats.err}</Text>
                </View>
            )
        }
        else if (this.props.stats.statewise !== undefined) {
            const totalactive = this.props.stats.totalconfirmed - this.props.stats.totaldeceased - this.props.stats.totalrecovered
            return (
                <ScrollView style={styles.container}>
                    <Animatable.View animation='fadeInDown' duration={1000}>
                        <View style={styles.piechart}>
                            <Pie totalactive={totalactive} />
                        </View>
                    </Animatable.View>
                    <Animatable.View animation='fadeInUp' duration={1000}>
                        <View style={styles.row}>
                            <Card raised title='Confirmed' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                                <Text style={styles.text}>{formatNumber(parseInt(this.props.stats.totalconfirmed) + parseInt(this.props.stats.statewise[0].deltaconfirmed))}</Text>
                                <Text style={styles.small}>
                                    {isNaN(this.props.stats.statewise[0].deltaconfirmed)
                                        ? ''
                                        : this.props.stats.statewise[0].deltaconfirmed > 0
                                            ? '+' + formatNumber(this.props.stats.statewise[0].deltaconfirmed)
                                            : '+0'}</Text>
                            </Card>
                            <Card raised title='Recovered' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                                <Text style={styles.text}>{formatNumber(parseInt(this.props.stats.totalrecovered) + parseInt(this.props.stats.statewise[0].deltarecovered))}</Text>
                                <Text style={styles.small}>
                                    {isNaN(this.props.stats.statewise[0].deltarecovered)
                                        ? ''
                                        : this.props.stats.statewise[0].deltarecovered > 0
                                            ? '+' + formatNumber(this.props.stats.statewise[0].deltarecovered)
                                            : '+0'}
                                </Text>
                            </Card>
                        </View>
                        <View style={styles.row}>
                            <Card raised title='Active' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                                <Text style={styles.text}>{formatNumber(totalactive)}
                                </Text>
                            </Card>
                            <Card raised title='Deceased' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                                <Text style={styles.text}>{formatNumber(parseInt(this.props.stats.totaldeceased) + parseInt(this.props.stats.statewise[0].deltadeaths))}</Text>
                                <Text style={styles.small}>
                                    {isNaN(this.props.stats.statewise[0].deltadeaths)
                                        ? ''
                                        : this.props.stats.statewise[0].deltadeaths > 0
                                            ? '+' + formatNumber(this.props.stats.statewise[0].deltadeaths)
                                            : '+0'}
                                </Text>
                            </Card>
                        </View>
                        <View style={styles.row}>
                            <Card raised title='Sample Tested' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line} >
                                <Text style={styles.text}>{formatNumber(parseInt(this.props.stats.totalsamplestested) + parseInt(this.props.stats.samplereportedtoday))}</Text>
                                <Text style={styles.small}>
                                    {isNaN(this.props.stats.samplereportedtoday)
                                        ? ''
                                        : this.props.stats.samplereportedtoday > 0
                                            ? '+' + formatNumber(this.props.stats.samplereportedtoday)
                                            : '+0'}
                                </Text>
                            </Card>
                            <Card raised title='Last Updated' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line} >
                                <Text style={styles.text}>{this.props.stats.statewise[0].lastupdatedtime}</Text>
                            </Card>
                        </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#352f44',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: '#00fff5'
    },
    title: {
        color: 'orange',
        fontSize: 24
    },
    box: {
        flex: 1,
        backgroundColor: '#2a2438',
        borderRadius: 10
    },
    small: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray'
    },
    line: {
        backgroundColor: 'gray'
    },
    piechart: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#2a2438',
        padding: 20,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 10
    }
})

const mapStateToProps = (state) => ({
    stats: state.Reducer
})

const mapDispatchToProps = (dispatch) => ({
    Stats: () => dispatch(Stats())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
