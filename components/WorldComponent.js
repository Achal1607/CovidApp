import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WorldStats } from '../redux/ActionCreators'
import { Loading } from './LoadingComponent'
import { View, Text, ScrollView } from 'react-native'
import { Image, ListItem } from 'react-native-elements'
import { formatNumber } from '../utils/functions'
import Search from './SearchComponent'
import { withNavigation } from '@react-navigation/compat'
import * as Animatable from 'react-native-animatable'

export class World extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.WorldStats()
        this.setState({ isLoading: false })
    }
    render() {
        if (this.state.isLoading) {
            console.log("here")
            return (
                <Loading />
            )
        }
        else if (this.props.stats.isLoading) {
            console.log("1here")
            return (
                <Loading />
            )
        }
        else {
            const { navigate } = this.props.navigation
            const RenderList = (props) => (
                <View style={{ padding: 5, marginLeft: 5, flexDirection: 'row', flex: 1, backgroundColor: '#2a2438', marginTop: 5, borderRadius: 10 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <Image source={{ uri: props.country.info.flag }} style={{ height: 50, width: 50 }} />
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', marginLeft: 10, color: 'whitesmoke', fontWeight: 'bold' }} onPress={() => navigate('Country', { name: props.country.country.toUpperCase() })} >{props.country.country}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
                        <Text style={{ color: '#A9A9A9', fontWeight: 'bold' }}>
                            {parseInt(props.country.recovered) !== 0 ?
                                ((100 * parseInt(props.country.recovered)) / parseInt(props.country.cases)).toFixed(2) + '%'
                                : 'N/A'}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'orange', fontWeight: 'bold' }}>{formatNumber(parseInt(props.country.cases))}</Text>
                    </View>
                </View>
            )
            const itemList = this.props.stats.world.map(item => <RenderList key={item.country} country={item} />)
            return (
                <ScrollView style={{ backgroundColor: '#352f44' }}>
                    <Animatable.View animation='fadeInLeftBig' duration={1000}>
                        <Search country={this.props.stats.world} />
                        <View style={{ marginLeft: 5, padding: 5, flexDirection: 'row', flex: 1, backgroundColor: '#2a2438', marginTop: 5, borderRadius: 10 }}>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', marginLeft: 10, color: '#b0a565', fontWeight: 'bold' }}>Country</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1.5 }}>
                                <Text style={{ color: '#14ffec', fontWeight: 'bold' }}>Recovery Rate</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1.3 }}>
                                <Text style={{ color: '#f6c90e', fontWeight: 'bold' }}>Total Cases</Text>
                            </View>
                        </View>
                        {itemList}
                    </Animatable.View>
                </ScrollView>
            )
        }
    }
}

const mapStateToProps = state => ({
    stats: state.World
})

const mapDispatchToProps = dispatch => ({

    WorldStats: () => dispatch(WorldStats())
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(World))
