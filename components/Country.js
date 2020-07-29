import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { baseUrl1 } from '../baseUrl'
import { Image, Card, Button } from 'react-native-elements'
import { Loading } from './LoadingComponent'
import { formatNumber } from '../utils/functions'
import RepresentCountry from './RepresentCountry'
import * as Animatable from 'react-native-animatable'

export class Country extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            today: null,
            yesterday: null,
            isToday: true
        }
    }

    async componentDidMount() {
        const response = await fetch(baseUrl1 + '/countries/' + this.props.route.params.name)
        const data = await response.json()
        this.setState({ isLoading: false, today: data })
        const response1 = await fetch(baseUrl1 + '/countries/' + this.props.route.params.name + '?yesterday=true')
        const data1 = await response1.json()
        this.setState({ yesterday: data1 })
    }

    render() {
        const name = this.props.route.params.name
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <ScrollView style={styles.container}>
                    <Animatable.View animation='fadeInDown' duration={1000}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{name.toUpperCase()}</Text>
                            <Image source={{ uri: this.state.today.countryInfo.flag }} style={{ marginTop: 20, width: 100, height: 75, borderRadius: 10 }} />
                        </View>
                        <Button onPress={() => this.setState(prevstate => ({ isToday: !prevstate.isToday }))} title={this.state.isToday ? 'Yesterday' : 'Today'} raised buttonStyle={{ backgroundColor: '#404b69' }} titleStyle={{ color: '#eeeeee' }}
                            containerStyle={{ marginTop: 25, borderRadius: 10, width: 100, height: 40, alignSelf: 'center', justifyContent: 'center' }} />
                        {this.state.isToday ?
                            <RepresentCountry today={this.state.today} />
                            : <RepresentCountry today={this.state.yesterday} />
                        }
                        <View style={{ marginLeft: 30, marginTop: 20, flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ color: '#29c7ac', fontWeight: 'bold', fontSize: 20 }}>Country Info:</Text>
                            <Text style={{ color: '#acdbdf', fontWeight: 'bold', fontSize: 15 }}>Continent: {this.state.today.continent}</Text>
                            <Text style={{ color: '#acdbdf', fontWeight: 'bold', fontSize: 15 }}>Population: {formatNumber(this.state.today.population / 1000000) + ' Million'}</Text>
                            <Text style={{ color: '#acdbdf', fontWeight: 'bold', fontSize: 15 }}>Latitude: {this.state.today.countryInfo.lat} &#176;</Text>
                            <Text style={{ color: '#acdbdf', fontWeight: 'bold', fontSize: 15 }}>Longitude: {this.state.today.countryInfo.long} &#176;</Text>
                        </View>
                    </Animatable.View>
                </ScrollView>
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
    }
})

export default Country
